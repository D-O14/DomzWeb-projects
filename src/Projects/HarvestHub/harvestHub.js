import { config } from "./modules/config.js";
import { helpers } from "./modules/utils.js";
import { read, save } from "./modules/database.js"
import { initializeIcons, removeIcon } from "./modules/icons.js";

/* HarvestHub v1 (front-end stage, demo data) */

/* ---------- Actions ---------- */

const actions = {
  openCart: () => panel(true),
  closeCart: () => panel(false),
  showMenu: () => $("nav").classList.toggle("on"),
  addItem: (element) => {
    const p = helpers.product(element.dataset.productId);
    if (!p) toast("Product Not Found!");
    addToCart(element.dataset.productId, p.minQty);
  },
  "add-product-page": (element) => { addToCart(element.dataset.productId, helpers.pq()) },
  buyItem: (element) => { addToCart(element.dataset.id, helpers.pq()); location.hash = "#/checkout"; },
  pq: (element) => {
    const min = parseInt($("pq").dataset.min, 10);
    $("pq").textContent = Math.max(min, helpers.pq() + parseInt(element.dataset.id, 10));
  },
  increase: (element) => { setQty(element.dataset.id, 1) },
  decrease: (element) => { setQty(element.dataset.id, -1) },
  removeItem: (element) => { removeFromCart(element.dataset.productId) },
  "send-wa": () => sendOrder("wa"),
  "send-mail": () => sendOrder("mail"),
  "send-ws": sendEnquiry,
};

/* ---------- State & Variables ---------- */

let cart = read(config.cart_key, []);
let selectedCategory = "all";
let selectedSort = "featured";
let timer;
let empty;

/* ---------- Events ---------- */

window.addEventListener("hashchange", renderApp);

document.addEventListener("click", (e) => {
  const element = e.target.closest("[data-action]");
  if (element && actions[element.dataset.action]) { actions[element.dataset.action](element) };
});

/* ---------- Constants ---------- */

const app = $("app");

// Functions to get a reference to HTML elements, and perform DOM operations

function create(element) { return document.createElement(element) };
function query(selector) { return document.querySelector(selector) };
function $(id) { return document.getElementById(id) };
function parseHTML(markup) {
  const template = create("template");
  template.innerHTML = markup.trim();
  return template.content.firstElementChild;
};

// Helpers

function displayCount(count, items) {
  switch (items.length) {
    case 0: count.textContent = "No Results Found";
      break;
    case 1: count.textContent = `${ items.length } item`;
      break;
    default: count.textContent = `${ items.length } Items`;
  };
};

function addEvent(element, count, urlType) {
  element.addEventListener("input", () => {
    const matches = updateShop();
    displayCount(count, matches);
    updateHashParam(urlType, element.value);
  });
};

function dropOpen(element, dropdown) {
  element.addEventListener("click", () => { dropdown.classList.toggle("open") });
};

function panel(on) {
  $("cart").classList.toggle("on", on);
  $("backdrop").classList.toggle("on", on);
};

function subtotal() { return lines().reduce((sum, l) => sum + l.total, 0) };

// Best matching quantity tier, or the base price.

function unitPrice(product, quantity) {
  const tiers = (product.tiers || [])
    .filter((tier) => quantity >= tier.quantity)
    .sort((a, b) => b.quantity - a.quantity)[0];

  return tiers ? tiers.price : product.price;
};

function lines() {
  return cart.map((cart) => {
    const p = helpers.product(cart.id);
    if (!p) null;
    const price = unitPrice(p, cart.quantity);
    return { p, qty: cart.quantity, price, total: price * cart.quantity };
  }).filter(Boolean);
};

// Functions that allow cart operations

function addToCart(id, quantity) {
  const p = helpers.product(id);
  const entry = cart.find((cart) => cart.id === id);
  const next = (entry ? entry.quantity : 0) + quantity;
  if (next < p.minQty) { return toast(`Minimum order for ${ p.name } is ${ p.minQty } ${ p.unit }.`) };
  entry ? entry.quantity = next : cart.push({ id, quantity: next });
  save(config.cart_key, cart);
  drawCart();
  toast("Added to cart!");
  initializeIcons(document);
};

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  save(config.cart_key, cart);
  drawCart();
  if (router().page === "checkout") { renderApp() };
  toast("Removed from cart!");
  initializeIcons(document);
};

function setQty(id, delta) {
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  const next = entry.quantity + delta;
  if (next < helpers.product(id).minQty) { cart = cart.filter((c) => c.id !== id) }
  else { entry.quantity = next };
  save(config.cart_key, cart);
  drawCart();
  if (router().page === "checkout") { renderApp() };
};

/* ---------- Order Messages ---------- */

function orderText(c, fee) {
  const rows = lines().map((l) => `- ${ l.p.name }: ${ l.quantity } ${ l.p.unit } @ ${ helpers.naira(l.price) } = ${ helpers.naira(l.total) }`);
  const sub = subtotal();
  return [
    "HARVESTHUB ORDER REQUEST", "",
    `Name: ${ c.name }`, `Phone: ${ c.phone }`, `Fulfilment: ${ c.fulfilment }`,
    `Address: ${ c.address || "N/A" }, ${ c.city } ${ c.state }`, "",
    "Items:", ...rows, "",
    `helpers.Subtotal: ${ helpers.naira(sub) }`, `Delivery: ${ helpers.naira(fee) }`, `Estimated total: ${ helpers.naira(sub + fee) }`,
    "Final prices, stock and delivery are confirmed by HarvestHub.", "",
    `Notes: ${ c.notes || "None" }`,
  ].join("\n");
};

/* ---------- Component Functions ---------- */

function navbar() {
  return `<nav class="header-nav">
    <div class="row">
      <a href="#/" class="logo">
        <span class="icon plant-icon" data-icon="${ config.logo }"></span>
        ${ config.brandName }
      </a>
      <ul class="navbar">
      ${ config.links.map(navlink => {
    return `
        <li class="${ navlink.className ? navlink.className : "" }">
          <a href="${ navlink.path }" class="nav-item">${ navlink.anchor }</a>
        </li>`
  }).join("") }
      </ul>
    </div>
    <div class="row">
      <label for="searchbar" class="search-field" id="searchField">
        <span class="icon plant-icon" data-icon="${ config.logo }"></span>
        <input type="search" name="searched_item" placeholder="Search the market..." class="searchbar">
      </label>
      <menu class="nav-menu">
        <button class="open-cart-btn" data-action="openCart" aria-label="Open Cart">
          <span class="icon cart-icon" data-icon="shoppingCart"></span>
          <span class="cart-count" id="cartCount"></span>
        </button>
      </menu>
    </div>
    <div class="nav-toggle" id="nav-toggle" part="toggle">
      <span class="icon bar-icon" data-icon="menubar"></span>
      <span class="icon close-icon" data-icon="close"></span>
    </div>
  </nav>`
};

function footer() {
  return `
  <div class="wrapper footer-grid">
  <div>
    <div>HarvestHub</div>
    <p id="footAddr">${ config.address }</p>
  </div>
  <div>
    <h4>Shop</h4>
    <div id="footCategorys">
      ${ config.categories.slice(0, 6).map((c) => {
    return `<a href="#/shop?category=${ c.id }">
          ${ c.name }
        </a>`}).join("") }
    </div>
  </div>
  <div>
    <h4>Help</h4>
    <a href="#/delivery">Delivery and collection</a><a href="#/wholesale">Bulk supply</a>
    <a href="#/about">Policies</a>
  </div>
  <div>
    <h4>Contact</h4>
    <div id="footContact">
      <a href="${ helpers.waLink("Hello HarvestHub") }" target="_blank" rel="noopener">
        WhatsApp
      </a>
      <a href="mailto:${ config.contact.email }">
        ${ config.contact.email }
      </a>
      <span>${ config.contact.phone }</span>
    </div>
  </div>
</div>`
};

function toast(msg) {
  const toast = $("toast");
  toast.textContent = msg;
  toast.classList.add("notify");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("notify"), 2000);
};

function input({ ...input }) {
  const field = parseHTML(`<label for="${ input.id }" ${ input.labelClass ? `class="${ input.labelClass }"` : "" }>
        ${ input.label ? input.label : "" }
        <span class="icon ${ input.iconClass ? input.iconClass : "" }" data-icon="${ input?.icon }"></span>
        <input value="${ input.value ?? "" }" type="${ input.type ?? "text" }" placeholder="${ input?.placeholder }" id="${ input?.id }" 
        ${ input.name ? `name="${ input.name }"` : "" } class="${ input.className ?? "input" }"  ${ input.required ? "required" : "" } >
        ${ input?.required ? `<p class="error" id="error-${ input?.id }" aria-live="polite"></p>` : "" }
    </label>`);


  const inputElement = field.querySelector("input");

  if (input.events) {
    const events = input?.events;
    inputElement.addEventListener("input", () => { events?.update() });
  };

  return field;
};

function searchControl(params) {
  selectedCategory = params.get("category") || "all";
  const wrapper = parseHTML(`<div class="search-filter">
      <div class="filter">
          <button class="toggle-filter-btn" data-action="filter" aria-label="activate filter menu">
              <span class="icon filter-icon" data-icon="filter"></span>
          </button>
          ${ filterMenu(config.categories, selectedCategory) }
      </div>
  </div>`);
  wrapper.prepend(input({
    id: "searchbar",
    type: "search",
    icon: "search",
    className: "searchbar",
    iconClass: "plant-icon",
    labelClass: "search-field",
    value: params.get("q") || "",
    placeholder: "Search The Market...",
    //events: { update: updateShop },
  }));

  return wrapper;
};

function filterMenu(options, selectedId) {
  return `
  <menu class="filter-box">
    <ul class="filter-options">
      ${ options.map(option => {
    const isSelected = option.id === selectedId;
    return `
      <li class="filter-option ${ isSelected ? "is-selected" : "" }">
          <button class="filter-btn" data-value="${ option.id }" 
          aria-pressed="${ isSelected }">${ option.name }</button>
          <span class="icon check-icon" data-icon="${ isSelected ? "tick" : "" }"></span>
        </li>`}).join("") }
    </ul>
  </menu>`
};

function sortMenu(options, selectedSortId) {
  return `<menu class="sort-box">
        <button type="button" class="picker">
            <span class="selected-opt" id="selected">
              ${ options.find(option => option.id === selectedSortId)?.label || "Sort By:" }
            </span>
            <span class="icon chevron-icon" data-icon="arrowDown"></span>
        </button>
        <ul class="sort-options" id="sortOpts">
        ${ options.map(option => {
    const isSelected = option.id === selectedSortId;
    return `<li class="sort-option ${ isSelected ? "is-selected" : "" }">
              <button class="sort-btn" type="button" data-sort="${ option.id }"
              aria-pressed="${ isSelected }">
                ${ option.label }
              </button>
              <span class="icon check-icon" data-icon="${ isSelected ? "tick" : "" }"></span>
            </li>`}).join("") }
        </ul>
    </menu>`;
};

function productCard(product) {
  return `
  <article class="product-card" data-product-id="${ product.id }">
        <div class="card-header">
            <span class="product-category">${ product.category }</span>
            <a class="product-img" href="#/product/${ product.id }">
                ${ helpers.media(product) }
            </a>
            <button class="wishlist-btn" aria-label="Add to wishlist">
                <span class="icon heart-icon" data-icon="heart"></span>
            </button>
        </div>
        <div class="card-content">
            <div class="product-specs">
                <h3 class="product-name">
                   <a href="#/product/${ product.id }">${ product.name }</a>
                </h3>
                <span class="product-price">${ helpers.naira(product.price) }</span>
            </div>
            <p class="product-desc">${ product.description }</p>
            <menu class="card-actions">
                <button class="cart-btn" data-product-id="${ product.id }" data-action="addItem" aria-label="Add to Cart">
                    <span class="icon cart-icon" data-icon="cartPlus"></span>
                </button>
                <a class="details-btn" href="#/product/${ product.id }">
                    View Details
                    <span class="icon details-icon" data-icon="attachment"></span>
                </a>
            </menu>
        </div>
    </article>`;
};

function cartItem(line) {
  return `<article class="cart-item">
<div class="item-header">
    <a class="item-display" href="#/product/${ line.p.id }">
      ${ helpers.media(line.p) }
    </a>
    <span class="item-category">${ line.p.category }</span>
</div>
<div class="item-body">
    <div class="item-specs">
        <h3 class="item-name">
        ${ line.p.name }
        <small class="item-unit">
            per ${ line.p.unit } (${ helpers.naira(line.price) })
        </small>
        </h3>
        <span class="item-price">
            ${ helpers.naira(line.p.price) }
        </span>
    </div>
    <menu class="item-actions">
        <div class="q-counter">
            <button class="q-count-btn" data-id="-1" data-action="pq" aria-label="decrease quantity">
                <span class="icon minus-icon" data-icon="minus"></span>
            </button>
            <span id="pq" data-min="${ line.p.minQty }" class="q-count">${ line.qty }</span>
            <button class="q-count-btn" data-id="1" data-action="pq" aria-label="increase quantity">
                <span class="icon plus-icon" data-icon="plus"></span>
            </button>
        </div>
        <button class="remove-item-btn" data-product-id="${ line.p.id }" data-action="removeItem" aria-label="remove item from cart">
            <span class="icon delete-icon" data-icon="delete"></span>
        </button>
    </menu>
</div>
</article>`;
};

function appCart() {
  return `
    <div class="cart-header">
        <h2>
            Your Cart
            <span id="inCartCount" class="in-cart-count"></span>
        </h2>
        <button data-action="closeCart" aria-label="Close your cart">
            <span class="icon close-icon" data-icon="close"></span>
        </button>
    </div>
    <div class="cart-content" id="cartContent"></div>
    <div class="cart-footer" id="cartFooter"></div>`
};

function drawCart() {
  const ls = lines();
  const count = ls.reduce((num, line) => num + line.qty, 0);

  $("cartCount").textContent = count;
  $("inCartCount").textContent = count;

  $("cartContent").innerHTML = ls.length
    ? ls.map((line) => cartItem(line)).join("") :
    `<div class="empty-cart">
        <figure class="empty-img">
          <img src="./assets/illustrations/empty-cart.svg" alt="Empty Cart">
        </figure>
        <p>Your cart is empty.</p>
      </div>
    `;

  $("cartFooter").innerHTML = ls.length
    ? `<menu class="cart-actions">
        <a href="#/checkout" class="co-btn">Checkout (${ helpers.naira(subtotal()) })</a>
    </menu>`: "";
}

function counter(product) {
  return `<menu class="counter">
    <button data-action="pq" class="count-btn" data-id="-1" aria-label="Decrease quantity of ${ product.name }">
      <span class="icon minus-icon" data-icon="minus"></span>
    </button>
    <span id="pq" class="count" data-min="${ product.minQty }">${ product.minQty }</span>
    <button data-action="pq" class="count-btn" data-id="1" aria-label="Increase quantity of ${ product.name }">
    <span class="icon plus-icon" data-icon="plus"></span>
    </button>
  </menu>`
};

/* ---------- Pages ---------- */

function home() {
  return `
  <!-- Hero Section -->
  <section class="hero">
    <div class="wrapper hero-container">
      <div>
        <h1 class="hero-title">The whole market, in one basket.</h1>
        <p class="hero-content">
          Livestock, poultry, frozen foods, produce and staples, organised in one catalogue. Order
          for your household, or request bulk supply for your business.
        </p>
        <menu class="hero-actions">
          <a class="btn btn-main" href="#/shop">
            Start shopping
            <span class="icon shopping-icon" data-icon="cartPlus"></span>
          </a>
          <a class="btn btn-secondary" href="#/wholesale">Bulk supply for business</a>
        </menu>
      </div>
      <figure class="hero-img">
        <img src="./assets/images/3d-fruit-basket.png" alt="">
      </figure>
    </div>
  </section>

  <!-- Categories Section 

  <section class="section wrapper">
    <div class="section-header">
      <h2 class="primary-header-text">Browse by Category</h2>
      <p class="secondary-header-text">
        <span class="icon clover-icon" data-icon="clover"></span>
        Explore variations of our farm-fresh resources.
      </p>
    </div>
    <div class="categories">
    ${ config.categories.filter(category => category.featured).map((category) => `
      <div class="category">
          <a href="#/shop?category=${ category.id }" class="category-img" data-category="${ category.dataset }"> 
              <img class="category-display-img" src="${ category.img }" alt="">
          </a>
          <span class="category-name">${ category.name }</span>
      </div>`).join("") }
      <button class="categories-fab" aria-label="slide to see more categories">
          <span class="icon chevron-icon" data-icon="arrowRight"></span>
      </button>
    </div>
  </section>-->

  <!-- Featured Products Section -->

  <section class="products">
    <div class="section-header">
      <h2 class="primary-header-text">Featured This Week</h2>
      <p class="secondary-header-text">
        <span class="icon clover-icon" data-icon="clover"></span>
        Take a look at some of our featured resources of the week.
      </p>
    </div>
    <div class="product-grid">
      ${ config.products.filter((product) => product.featured)
      .map((product) => productCard(product)).join("") }
    </div>
  </section>

  <!-- Steps Section -->

  <section class="section wrapper">
    <div class="section-header">
      <h2 class="primary-header-text">How ordering works</h2>
      <p class="secondary-header-text">
        <span class="icon clover-icon" data-icon="clover"></span>
        Learn and understand the process to get started.
      </p>
    </div>
    <div class="steps">
      ${ config.steps.map(step => {
        return `
        <div class="step">
          <h3>${ step.step }</h3>
          <p>${ step.howTo }</p>
          <figure class="step-img">
            <img src="${ step.illustr }" alt="">
          </figure>
        </div>`
      }).join("") }
    </div>
  </section>`
};

function about() {
  return `
  <section class="section wrapper">
    <h1>About HarvestHub</h1>
    <p>Replace with the business's own text: who HarvestHub is, privacy, terms, and the returns, refunds and cancellation policy.</p>
    <p>${ config.contact.phone }<br />${ config.contact.email }<br />${ config.address }</p>
  </section>`;
};

function shop(params) {
  selectedCategory = params.get("category") || "all";
  selectedSort = params.get("sort") || "featured";
  app.innerHTML = `
    <section class="section wrapper">
      <h1>
        Shop
        <span class="icon store-icon" data-icon="store"></span>
      </h1>
      <div class="shop-controls">
        ${ sortMenu(config.order, selectedSort) }
        <label class="price-filter">
          <span class="icon naira-icon">₦</span>
          <input id="priceFilter" class="price-filter-input" type="number" min="0" placeholder="Max price (₦)" aria-label="Maximum price" />
        </label>
      </div>
      <span class="results-count">${ config.products.length } Items</span>
      <div class="product-grid results" id="results">
      ${ renderProducts(config.products) }
      </div>
    </section>`;

  const resCount = app.querySelector(".results-count");
  app.querySelector(".shop-controls").prepend(searchControl(params));
  app.querySelector(".filter-box").addEventListener("click", (event) => {
    const button = event.target.closest("[data-value]");
    if (!button) return;
    selectedCategory = button.dataset.value;
    app.querySelectorAll(".filter-box [data-value]").forEach(item => {
      const icon = item.parentElement.querySelector(".check-icon");
      const isSelected = item.dataset.value === selectedCategory;
      item.setAttribute("aria-pressed", isSelected);
      item.parentElement.classList.toggle("is-selected", isSelected);
      if (icon.dataset.icon = isSelected) { icon.dataset.icon = "tick" }
      else { removeIcon(icon) };
    });
    updateShop();
  });
  app.querySelector(".sort-options").addEventListener("click", event => {
    const button = event.target.closest("[data-sort]");
    if (!button) return;
    selectedSort = button.dataset.sort;
    app.querySelectorAll(".sort-options [data-sort]").forEach(item => {
      const icon = item.parentElement.querySelector(".check-icon");
      const isSelected = item.dataset.sort === selectedSort;
      item.setAttribute("aria-pressed", isSelected);
      item.parentElement.classList.toggle("is-selected", isSelected);
      if (icon.dataset.icon = isSelected) { icon.dataset.icon = "tick" }
      else { removeIcon(icon) };
    });
    $("selected").textContent = config.order.find(option => option.id === selectedSort)?.label || "Sort By:";
    updateShop();
  });
  dropOpen(query(".picker"), query(".sort-box"));
  dropOpen(query(".toggle-filter-btn"), query(".filter-box"));
  addEvent(app.querySelector(".price-filter-input"), resCount, "pf");
  addEvent(app.querySelector(".searchbar"), resCount, "q")
  updateShop();
};

function wholesale() {
  const wsPage = parseHTML(`<section class="section wrapper">
      <h1>Bulk supply for businesses</h1>
      <!--<p class="note">
        For restaurants, caterers, retailers and hotels. Tell us what you need and we will reply with a quotation. 
        Quantity prices are agreed product by product.
      </p>-->
      <form id="wsForm" class="form" novalidate>
          <div class="form-container">
              <div class="textarea">
                  <textarea id="wn" rows="4" placeholder="Products you wish to purchase, and quantities. E.g. 200kg rice, 40 broilers"></textarea>
                  <span class="error" id="error-wn"></span>
              </div>
          </div>
          <button type="button" class="btn form-btn wa-btn" data-action="send-ws">
            Submit
            <span class="icon send-icon" data-icon="send"></span>
          </button>
          <!--<p class="note">Opening WhatsApp does not send the message until you press send. A quotation is not an order.</p>-->
      </form>
  </section>`);

  const fields = wsPage.querySelector(".form-container");
  if (!fields) throw new Error("Wholesale form is missing a form container");

  fields.prepend(
    input({ id: "wb", placeholder: "What's your business name?", icon: "store", labelClass: "input-field" }),
    input({ id: "wc", icon: "phone", placeholder: "How do we contact you?", labelClass: "input-field" }),
    input({ id: "wp", type: "tel", placeholder: "What do we use to contact you?", icon: "phone", labelClass: "input-field" }),
    input({ id: "wl", placeholder: "Where do we deliver to?", icon: "location", labelClass: "input-field" }),
    input({ id: "wd", type: "date", placeholder: "When do you need your order?", icon: "calendar", labelClass: "input-field" })
  );

  return wsPage;
};

function delivery() {
  return `
    <section class="section wrapper">
      <h1>Delivery and collection</h1>
      <p>Delivery areas and fees are set by the business and shown at checkout.</p>
      ${ config.zones.map((zone) =>
    `<div class="location">
          <span>${ zone.name }<br />
            <small>Minimum order ${ helpers.naira(zone.minOrder) }. ${ zone.window }.</small>
          </span>
          <b>${ helpers.naira(zone.fee) }</b>
        </div>`).join("") }
      <!--<p class="note">
        Livestock and frozen goods may need special arrangements, which are explained on each product. Outside these areas, send a WhatsApp enquiry for a quotation.
      </p>-->
    </section>`;
}

function checkout() {
  const ls = lines();
  if (!ls.length) return `
  <section class="section wrapper empty">
    <h1>Your cart is empty</h1>
    <a class="btn" href="#/shop">Browse products</a>
  </section>`;

  const zones = config.zones.map((zone) => `
  <li>
    <button class="zone-select-btn">
    ${ zone.name } (${ helpers.naira(zone.fee) })
    </button>
  </li>`).join("");
  const sub = subtotal();

  const coPage = parseHTML(`
    <section class="section wrapper">
      <h1>Checkout</h1>
      <div class="checkout">
        <form id="coForm" novalidate>
          <div class="form-container">
            <!--<div class="dropdown">
              <button type="button" class="picker">
                Delivery area
                <span class="icon chevron-icon" data-icon="arrowDown"></span>
              </button>
              <ul id="zone" class="drop-box">${ zones }</ul>
            </div>-->
            <div class="textarea full-length">
              <textarea id="notes" rows="3" placeholder="Any notes? (optional)"></textarea>
            </div>
          </div>
          <menu class="checkout-actions">
            <button type="button" class="btn btn-main" data-action="send-mail">
              Submit order
              <span class="icon email-icon" data-icon="email"></span>
            </button>
            <button type="button" class="btn wa-btn" data-action="send-wa">
              Submit order
              <span class="icon wa-icon" data-icon="whatsapp"></span>
            </button>
          </menu>
          <!--<p class="note">
            Sending on WhatsApp or email submits an order request only. HarvestHub confirms stock, final price, payment and delivery with you. Online payment arrives with the backend stage.
          </p>-->
        </form>
        <aside class="form">
          <h3>Order summary</h3>
          ${ ls.map((l) => `
          <div class="ln">
            <span>${ l.p.name } (${ l.qty } ${ l.p.unit })</span>
            <span>${ helpers.naira(l.total) }</span>
          </div>`).join("") }
          <div class="location">
            <span>Subtotal</span>
            <span>${ helpers.naira(sub) }</span>
          </div>
          <div class="location location-t">
            <span>Delivery fee and total</span>
            <span>shown in your message</span>
          </div>
        </aside>
      </div>
    </section>`);

  const coFields = coPage.querySelector(".form-container");
  if (!coFields) throw new Error("Checkout page must have fields!");

  coFields.prepend(
    input({ id: "name", icon: "user", placeholder: "What's your full name?", labelClass: "input-field full-length" }),
    input({ id: "phone", icon: "phone", placeholder: "Your phone number", type: "tel", labelClass: "input-field" }),
    input({ id: "email", icon: "mail", placeholder: "Your e-mail address (optional)", type: "email", labelClass: "input-field" })
  );
  coFields.querySelector(".textarea").before(
    input({ id: "address", icon: "location", iconClass: "location-icon", placeholder: "Where do we deliver to?", labelClass: "input-field" })
  );

  return coPage;
};

function productPage(id) {
  const p = helpers.product(id);
  if (!p) return `
  <div class="empty-state">
  <figure class="empty-img">
    <img src="./assets/illustrations/no-results.svg" alt="No Results Found"/>
  </figure>
    <h3 class="empty-heading">Product Not Found</h3>
    <a href="#/shop" class="back-to-shop-btn">
        Back to Shop
        <span class="icon attachment-icon" data-icon="attachment"></span>
    </a>
  </div>`;

  const related = config.products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 5);
  const ask = helpers.waLink(`Hello HarvestHub, I have a question about: ${ p.name }`);

  return `
    <section class="section wrapper">
      <div class="product-page">
        <button class="add-to-wishlist-btn">
          <span class="icon wishlist-icon" data-icon="heart"></span>
        </button>
      
        <div class="product-page-img">${ helpers.media(p) }</div>
        <div class="pdp-content">
        <div class="pdp-heading">
          <h1 class="pdp-name">${ p.name }</h1>
          <p class="pdp-price">
            ${ helpers.naira(p.price) } 
            <small class="pdp-unit">per ${ p.unit }</small>
          </p>
        </div>
          <div class="pdp-desc">
            <h4 class="desc-heading">Description</h4>
            <p class="desc">${ p.description }</p>
        </div>
          <menu class="pdp-actions">
            <button class="btn btn-main" data-action="buyItem" data-id="${ p.id }">Buy now</button>
            <button class="btn add-to-cart-btn" data-action="add-product-page" data-product-id="${ p.id }" >
            Add to cart
            <span class="icon cart-icon" data-icon="cartPlus"></span>
            </button>
            ${ counter(p) }
            <!--<a class="btn wa-btn enquire-btn" href="${ ask }" target="_blank" rel="noopener" aria-label="Enquire about ${ p.name }">
              <span class="icon wa-icon" data-icon="whatsapp"></span>
            </a>-->
          </menu>
          <!--${ p.note ? `<p class="note">${ p.note }</p>` : "" }-->
        </div>
      </div>
    </section>
    ${ related.length ?
      `<section class="others">
      <div class="section-header">
      <h2 class="primary-header-text">More Like This Product</h2>
      <p class="secondary-header-text">
        <span class="icon clover-icon" data-icon="clover"></span>
        Explore similar items you might also like
      </p>
      </div>
        <div class="product-grid">${ related.map(productCard).join("") }</div>
      </section>` : "" }`;
};

/* --------- Render & Update Functions ----------- */

function renderApp() {
  const { page, id, params } = router();

  const pages = {
    home, product: () => productPage(id),
    checkout, wholesale, delivery, about
  };

  if (page === "shop") { shop(params) }
  else {
    const view = (pages[page] || home)();
    if (typeof view === "string") { app.innerHTML = view }
    else if (view instanceof Node) { app.replaceChildren(view) }
    else { throw new TypeError(`Invalid page output for "${ page }": expected an HTML string or DOM Node, received ${ view }.`) };
  };

  //$("nav").classList.remove("on");
  window.scrollTo(0, 0);
  initializeIcons(document);

};

function renderProducts(products) {
  return products.map((product) => {
    return productCard(product);
  }).join("");
};

function updateShop() {
  /*const params = router().params;
  $("searchbar").value = params.get("q") || "";
  $("priceFilter").value = params.get("pf") || "";
  selectedCategory = params.get("category") || "all";
  selectedSort = params.get("sort") || "featured";*/
  const category = selectedCategory === "all" ? "" : selectedCategory;
  const query = app.querySelector(".searchbar").value.trim().toLowerCase();
  const maxPrice = parseFloat($("priceFilter").value);
  const selectedSortOption = config.order.find(option => option.id === selectedSort);
  const sortBy = selectedSortOption?.sortBy
    || order.find(option => option.id === "featured").sortBy;

  const matches = config.products.filter((product) => {
    if (query && !(product.name).toLowerCase().includes(query)) { return false };
    if (category && product.category !== category) { return false };
    if (!isNaN(maxPrice) && product.price > maxPrice) { return false };
    return true;
  });

  const matchingIds = new Set(matches.map(product => String(product.id)));
  const results = $("results");
  results.querySelectorAll(".product-card").forEach(card => {
    !matchingIds.has(card.dataset.productId) ? card.classList.add("hidden") :
      card.classList.remove("hidden");
  });

  matches.sort(sortBy).forEach(product => {
    const card = results.querySelector(`[data-product-id="${ product.id }"]`);
    if (card) { results.append(card) };
  });

  empty = matches.length === 0;

  if (empty) {
    const noRes = parseHTML(`<div class="empty-state">
      <figure class="empty-img">
        <img src="./assets/illustrations/no-results.svg" alt="No Results Found" />
      </figure>
      <p class="empty-desc">No Matching Products. Try clearing a filter</p>
    </div>`);
    //results.replaceChildren(noRes);
    results.classList.add("empty")
  } else { results.classList.remove("empty") };

  return matches;
};

function updateHashParam(name, value) {
  const hash = location.hash || "#/shop";
  const queryIndex = hash.indexOf("?");

  const route = queryIndex === -1 ? hash
    : hash.slice(0, queryIndex);

  const params = new URLSearchParams(queryIndex === -1 ? "" : hash.slice(queryIndex + 1));

  if (value.trim() === "") { params.delete(name) }
  else { params.set(name, value.trim()) }

  const query = params.toString();
  const newHash = `${ route }${ query ? `?${ query }` : "" }`;

  history.replaceState(history.state, "", `${ location.pathname }${ location.search }${ newHash }`);
};

/* ---------- Routing ---------- */

function router() {
  const [path, query] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  return { page: parts[0] || "home", id: parts[1], params: new URLSearchParams(query || "") };
};

/* ---------- Validation ---------- */

function check(rules) {
  let ok = true;
  rules.forEach(([id, valid, message]) => {
    const input = $(id);
    const bad = !valid(input.value.trim());
    $("e-" + id).textContent = bad ? message : "";
    input.classList.toggle("bad", bad);
    if (bad) ok = false;
  });
  return ok;
};

/* ---------- Messages ---------- */

function sendOrder(channel) {
  const val = (id) => $(id).value.trim();
  const delivering = val("ful") === "Delivery";

  const ok = check([
    ["name", helpers.filled, "Enter your full name."],
    ["phone", helpers.phoneOk, "Enter a valid phone number."],
    ["city", helpers.filled, "Enter your city or town."],
    ["state", helpers.filled, "Enter your state."],
    ["address", (v) => !delivering || v.length > 0, "Enter a delivery address."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const fee = feeFor(val("ful"), val("zone"));
  const zone = config.zones.find((z) => z.id === val("zone"));
  if (delivering && subtotal() < zone.minOrder) return toast(`Minimum order for this area is ${ helpers.naira(zone.minOrder) }.`);

  const text = orderText({ name: val("name"), phone: val("phone"), fulfillment: val("ful"), address: val("address"), city: val("city"), state: val("state"), notes: val("notes") }, fee);

  if (channel === "wa") {
    window.open(helpers.waLink(text), "_blank", "noopener");
    toast("WhatsApp opened. Press send there to submit your request.");
  } else {
    location.href = `mailto:${ config.contact.email }?subject=${ encodeURIComponent("HarvestHub order request") }&body=${ encodeURIComponent(text) }`;
    toast("Your email app should open. Press send to submit your request.");
  }
};

function sendEnquiry() {
  const ok = check([
    ["wb", helpers.filled, "Enter your business name."],
    ["wc", helpers.filled, "Enter a contact name."],
    ["wp", helpers.phoneOk, "Enter a valid phone number."],
    ["wl", helpers.filled, "Enter the delivery locategoryion."],
    ["wn", helpers.filled, "Tell us what you need."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const text = ["HARVESTHUB BULK ENQUIRY", "",
    `Business: ${ helpers.v("wb") }`,
    `Contact: ${ helpers.v("wc") }`,
    `Phone: ${ helpers.v("wp") }`,
    `Location: ${ helpers.v("wl") }`,
    `Needed by: ${ helpers.v("wd") || "Not stated" }`, "", `Request: ${ helpers.v("wn") }`].join("\n");
  window.open(helpers.waLink(text), "_blank", "noopener");
  toast("WhatsApp opened. Press send there to submit your enquiry.");
};

/* ---------- Initialization ---------- */

function init() {
  query(".cart").innerHTML = appCart();
  query(".footer").innerHTML = footer();
  query(".app-header").innerHTML = navbar();
  query(".wa-btn").href = helpers.waLink("Hello HarvestHub, I would like to place an order.");
  drawCart();
  renderApp();
};

init();