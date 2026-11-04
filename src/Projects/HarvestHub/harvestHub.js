import { initializeIcons } from "@assets/Icons/icons";

/* HarvestHub v2 (front-end stage, demo data)
   Prices are whole naira. The backend stage will move products,
   zones and settings into the database and recalculate totals on the server. */

/* ---------- Data ---------- */

const config = {
  whatsapp: "+234 916 456 989 1",
  email: "harvesthub@gmail.com",
  phone: "+234 916 456 989 1",
  address: "No: 3, Razao-Belo, Osagie Ln, Benin City, Edo State",
  collectionEnabled: true,
  zones: [
    { id: "central", name: "Benin City: central areas", fee: 2500, minOrder: 5000, window: "Time confirmed after you order" },
    { id: "outer", name: "Benin City: outer areas", fee: 4500, minOrder: 10000, window: "Time confirmed after you order" },
  ],
};

const navdata = {
  brandName: "HarvestHub", logo: "harvestHub",
  links: [
    { anchor: "Home", path: "#/", className: "active" },
    { anchor: "Shop", path: "#/shop" },
    { anchor: "Wholesale", path: "#/wholesale" },
    { anchor: "Delivery", path: "#/delivery" },
    { anchor: "About", path: "#/about" },
    //{ anchor: "Contact us", path: "#/contact" },
  ]
};

const categories = [
  { id: "all", name: "All Sections" },
  { id: "grains", name: "Grains and Staples" },
  { id: "bulk", name: "Bulk and Wholesale Supply" },
  { id: "fruits", name: "Fruits", img: "../../Assets/Images/3d-fruits.png", featured: true, dataset: "fruits" },
  { id: "poultry", name: "Poultry", img: "../../Assets/Images/3d-chicken.png", featured: true, dataset: "poultry" },
  { id: "livestock", name: "Livestock", img: "../../Assets/Images/3d-goat.png", featured: true, dataset: "livestock" },
  { id: "frozen", name: "Frozen Foods", img: "../../Assets/Images/3d-frozen-meat.png", featured: true, dataset: "frozen" },
  { id: "produce", name: "Fresh Produce", img: "../../Assets/Images/3d-produce-box.png", featured: true, dataset: "produce" },
  { id: "tubers", name: "Tubers and Roots", img: "../../Assets/Images/3d-tubers_roots.png", featured: true, dataset: "tubers_roots" },
];

const products = [
  {
    id: "goat", name: "Live Goat", category: "livestock", emoji: "🐐", featured: true, price: 85000, unit: "animal", minQty: 1,
    description: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
    note: "Sourced after you order. Collection or delivery is arranged with you."
  },
  {
    id: "broiler", name: "Live Broiler Chicken", category: "poultry", emoji: "🐓", featured: true, price: 8500, unit: "bird", minQty: 1,
    tiers: [{ quantity: 50, price: 8000 }], description: "Sample listing for live broilers.", note: "Weight varies by bird."
  },
  {
    id: "local-chicken", name: "Live Local Chicken", category: "poultry", emoji: "🐔", price: 12000, unit: "bird", minQty: 1,
    description: "Sample listing for live local birds.", note: "Weight varies by bird."
  },
  {
    id: "frozen-whole", name: "Frozen Whole Chicken", category: "frozen", emoji: "🍗", featured: true, price: 6500, unit: "kg", minQty: 1,
    description: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business."
  },
  {
    id: "frozen-portions", name: "Frozen Chicken Portions", category: "frozen", emoji: "🍖", status: "out", price: 6000, unit: "kg", minQty: 1,
    description: "Sample portions.", note: "Shown as unavailable in this demo."
  },
  {
    id: "tomatoes", name: "Tomatoes", category: "produce", emoji: "🍅", featured: true, price: 35000, unit: "basket", minQty: 1,
    description: "Sample tomatoes sold by the basket.", note: "Basket sizes vary. Seasonal supply."
  },
  {
    id: "pepper", name: "Pepper", category: "produce", emoji: "🌶️", price: 3000, unit: "kg", minQty: 1,
    description: "Sample pepper sold by the kilogram.", note: "Seasonal supply."
  },
  {
    id: "onions", name: "Onions", category: "produce", emoji: "🧅", price: 2200, unit: "kg", minQty: 1,
    tiers: [{ quantity: 25, price: 2000 }], description: "Sample onions sold by the kilogram.", note: ""
  },
  {
    id: "rice", name: "Rice Bowl", category: "grains", emoji: "🍚", featured: true, price: 4000, unit: "kg", minQty: 1,
    tiers: [{ quantity: 50, price: 3700 }], description: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
  },
  {
    id: "beans", name: "Beans", category: "grains", emoji: "🫘", price: 3500, unit: "kg", minQty: 1,
    description: "Sample beans sold by the kilogram.", note: ""
  },
  {
    id: "maize", name: "Maize", category: "grains", emoji: "🌽", price: 1800, unit: "kg", minQty: 5,
    description: "Sample maize.", note: "MinQtyimum order 5 kg."
  },
  {
    id: "garri", name: "Garri", category: "grains", emoji: "🥣", price: 2000, unit: "kg", minQty: 1,
    description: "Sample garri sold by the kilogram.", note: ""
  },
  {
    id: "yam,", name: "Yam", category: "tubers", emoji: "🍠", featured: true, price: 4500, unit: "tuber", minQty: 1,
    description: "Sample yam sold per tuber.", note: "Tuber sizes vary."
  },
  {
    id: "cassava", name: "Cassava", category: "tubers", emoji: "🥔", price: 1500, unit: "kg", minQty: 2,
    description: "Sample cassava.", note: "MinQtyimum order 2 kg."
  },
  {
    id: "plantain", name: "Plantain", category: "fruits", emoji: "🍌", price: 3000, unit: "bunch", minQty: 1,
    description: "Sample plantain sold per bunch.", note: "Bunch sizes vary."
  },
  {
    id: "bulk-rice", name: "Rice, Bulk Sack", category: "bulk", emoji: "🌾", price: 190000, unit: "sack", minQty: 1,
    description: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business."
  },
];

const steps = [
  { step: "Make a Choice", howTo: "Add products and quantities to your cart.", illustr: "../../Assets/Illustrations/add-to-cart.svg", },
  { step: "Send your order", howTo: "Share it on WhatsApp or by email. This submits a request only.", illustr: "../../Assets/Illustrations/email-capture.svg", },
  { step: "We Confirm", howTo: "HarvestHub confirms stock, final price, payment and delivery or collection with you.", illustr: "../../Assets/Illustrations/confirmed.svg", }
];

const actions = {
  cart: () => panel(true),
  close: () => panel(false),
  menu: () => $("nav").classList.toggle("on"),
  addItem: (element) => {
    const p = product(element.dataset.productId);
    if (!p) toast("Product Not Found!");
    addToCart(element.dataset.productId, p.minQty)
  },
  "add-product-page": (element) => addToCart(element.dataset.productId, pq()),
  buy: (element) => { addToCart(element.dataset.id, pq()); location.hash = "#/checkout"; },
  pq: (element) => { const min = parseInt($("pq").dataset.min, 10); $("pq").textContent = Math.max(min, pq() + parseInt(element.dataset.d, 10)); },
  increase: (element) => setQty(element.dataset.id, 1),
  decrease: (element) => setQty(element.dataset.id, -1),
  removeItem: (element) => removeFromCart(element.dataset.id),
  "send-wa": () => sendOrder("wa"),
  "send-mail": () => sendOrder("mail"),
  "send-ws": sendEnquiry,
};

const order = [
  { id: "high", label: "Price: High to Low", sortBy: (a, b) => b.price - a.price }, // Sorting from highest to lowest,
  { id: "low", label: "Price: Low to High", sortBy: (a, b) => a.price - b.price }, // Sorting from lowest to highest,
  { id: "name", label: "Name: A-Z", sortBy: (a, b) => a.name.localeCompare(b.name) }, // Sorting by Alphabetical order,
  { id: "featured", label: "Featured", sortBy: (a, b) => Number(!!b.featured) - Number(!!a.featured) } // Sorting by featured products only
];

const cart_key = "your-harvesthub-cart";

// status: in | out | order (sourced or prepared after ordering)
// tiers: quantity-based prices, set per product. image: path or URL (emoji shows if empty)

/* ---------- State & Variables ---------- */

let cart = read(cart_key, []);
let selectedCategory = "all";
let selectedSort = "featured";
let timer;
let isOpen;
let empty;

// Events

window.addEventListener("hashchange", renderApp);

document.addEventListener("click", (e) => {
  const elem = e.target.closest("[data-action]");
  if (elem && actions[elem.dataset.action]) actions[elem.dataset.action](elem);
});

/*$("searchbar").addEventListener("submit", (e) => {
  e.preventDefault();
  location.hash = `#/shop?q=${ encodeURIComponent($("findInput").value.trim()) }`;
});*/

// Helper Function Expressions

const filled = (v) => v.length > 0;
const v = (id) => $(id).value.trim();
const pq = () => parseInt($("pq").textContent, 10);
const phoneOk = (v) => /^[0-9+\s-]{10,16}$/.test(v);
const naira = (num) => "₦" + num.toLocaleString("en-NG");
const product = (id) => products.find((p) => p.id === id);
const subtotal = () => lines().reduce((sum, l) => sum + l.total, 0);
const waLink = (text) => `https://wa.me/${ config.whatsapp }?text=${ encodeURIComponent(text) }`;

// Constants

const app = $("app");

// Functions to read and save from/in localstorage

function save(store, data) { localStorage.setItem(store, JSON.stringify(data)) };
function read(store, placeholder = []) { return JSON.parse(localStorage.getItem(store)) || placeholder };

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

function addEvent(element, count) {
  app.querySelector(element).addEventListener("input", () => {
    const matches = updateShop();
    displayCount(count, matches);
  });
};

function media(product) {
  return product.image ? `<img src="${ product.img }" alt="${ product.name }" loading="lazy" />` :
    `<span role="img" aria-label="${ product.name }">${ product.emoji }</span>`;
};

// Best matching quantity tier, or the base price.

function unitPrice(product, quantity) {
  const tiers = (product.tiers || [])
    .filter((tier) => quantity >= tier.quantity)
    .sort((a, b) => b.quantity - a.quantity)[0];

  return tiers ? tiers.price : product.price;
};

function lines() {
  return cart.map((cart) => {
    const p = product(cart.id);
    if (!p) null;
    const price = unitPrice(p, cart.quantity);
    return { p, qty: cart.quantity, price, total: price * cart.quantity };
  }).filter(Boolean);
};

// Functions that allow cart operations

function addToCart(id, quantity) {
  const p = product(id);
  const entry = cart.find((cart) => cart.id === id);
  const next = (entry ? entry.quantity : 0) + quantity;
  if (next < p.minQty) { return toast(`Minimum order for ${ p.name } is ${ p.minQty } ${ p.unit }.`) };
  entry ? entry.quantity = next : cart.push({ id, quantity: next })
  save(cart_key, cart);
  drawCart();
  toast("Added to cart");
};

function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  save(cart_key, cart);
  drawCart();
  if (route().page === "checkout") render();
};

function setQty(id, delta) {
  const entry = cart.find((cart) => cart.id === id);
  if (!entry) return;
  const next = entry.quantity + delta;
  if (next < product(id).min) cart = cart.filter((c) => c.id !== id);
  else entry.quantity = next;
  save(cart_key, cart);
  drawCart();
  if (router().page === "checkout") renderApp();
};

/* ---------- Order Messages ---------- */

/*function feeFor(fulfilment, zoneId) {
  if (fulfilment === "Collection") return 0;
  const zone = config.zones.find((zone) => zone.id === zoneId);
  return zone ? zone.fee : null;
};*/

function orderText(c, fee) {
  const rows = lines().map((l) => `- ${ l.p.name }: ${ l.quantity } ${ l.p.unit } @ ${ naira(l.price) } = ${ naira(l.total) }`);
  const sub = subtotal();
  return [
    "HARVESTHUB ORDER REQUEST", "",
    `Name: ${ c.name }`, `Phone: ${ c.phone }`, `Fulfilment: ${ c.fulfilment }`,
    `Address: ${ c.address || "N/A" }, ${ c.city } ${ c.state }`, "",
    "Items:", ...rows, "",
    `Subtotal: ${ naira(sub) }`, `Delivery: ${ naira(fee) }`, `Estimated total: ${ naira(sub + fee) }`,
    "Final prices, stock and delivery are confirmed by HarvestHub.", "",
    `Notes: ${ c.notes || "None" }`,
  ].join("\n");
};

/* ---------- Component Functions ---------- */

function navbar(navdata) {
  return `<nav class="header-nav">
    <div class="row">
      <a href="#/" class="logo">
        <span class="icon plant-icon" data-icon="${ navdata.logo }"></span>
        ${ navdata.brandName }
      </a>
      <ul class="navbar">
      ${ navdata.links.map(navlink => {
    return `
        <li class="${ navlink.className ? navlink.className : "" }">
          <a href="${ navlink.path }" class="nav-item">${ navlink.anchor }</a>
        </li>`
  }).join("") }
      </ul>
    </div>
    <div class="row">
      <label for="searchbar" class="search-field" id="searchField">
        <span class="icon plant-icon" data-icon="${ navdata.logo }"></span>
        <input type="search" name="searched_item" placeholder="Search the market..." class="searchbar">
      </label>
      <menu class="nav-menu">
        <button class="open-cart-btn" data-action="cart" aria-label="Open Cart">
          <span class="icon cart-icon" data-icon="shoppingCart"></span>
          <span class="cart-count" id="cartCount">0</span>
        </button>
      </menu>
    </div>
    <div class="nav-toggle" id="nav-toggle" part="toggle">
      <span class="icon bar-icon" data-icon="menubar"></span>
      <span class="icon close-icon" data-icon="close"></span>
    </div>
  </nav>`
};

function toast(msg) {
  const toast = $("toast");
  toast.textContent = msg;
  toast.classList.add("on");
  clearTimeout(timer);
  timer = setTimeout(() => toast.classList.remove("notify"), 2300);
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
  selectedCategory = params.get("category");
  const wrapper = parseHTML(`<div class="search-filter">
      <div class="filter">
          <button class="toggle-filter-btn" data-action="filter" aria-label="activate filter menu">
              <span class="icon filter-icon" data-icon="filter"></span>
          </button>
          ${ filterMenu(categories, selectedCategory) }
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

  wrapper.querySelector(".filter-box").addEventListener("click", event => {
    const button = event.target.closest("[data-value]");
    if (!button) return;
    selectedCategory = button.dataset.value;
    console.log(selectedCategory);
    console.log(button.ariaPressed);
    updateShop();
  });

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
          <span class="icon check-icon" data-icon="${ isSelected ? "check" : "" }"></span>
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
    return `<li class="sort-option">
              <button class="sort-btn" type="button" data-sort="${ option.id }"
              aria-pressed="${ isSelected }">
                ${ option.label }
              </button>
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
                ${ media(product) }
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
                <span class="product-price">${ naira(product.price) }</span>
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

function panel(on) {
  $("cart").classList.toggle("on", on);
  $("scrim").classList.toggle("on", on);
};

function cartItem(line) {
  const item = parseHTML(`<article class="cart-item">
<div class="item-header">
    <a class="item-display" href="#/product/${ line.p.id }">
      ${ media(line.p) }
    </a>
    <span class="item-category">${ line.p.category }</span>
</div>
<div class="item-body">
    <div class="item-specs">
        <h3 class="item-name">
        ${ line.p.name }
        <small class="item-unit">
            per ${ line.p.unit } (${ naira(line.price) })
        </small>
        </h3>
        <span class="item-price">
            ${ naira(line.price) }
        </span>
    </div>
    <menu class="item-actions">
        <div class="q-counter">
            <button class="q-count-btn" data-id="-1" data-action="decrease" aria-label="decrease quantity">
                <span class="icon minus-icon" data-icon="minus"></span>
            </button>
            <span class="q-count">${ line.qty }</span>
            <button class="q-count-btn" data-id="1" data-action="increase" aria-label="increase quantity">
                <span class="icon plus-icon" data-icon="plus"></span>
            </button>
        </div>
        <button class="remove-item-btn" data-action="removeItem" aria-label="remove item from cart">
            <span class="icon delete-icon" data-icon="delete"></span>
        </button>
    </menu>
</div>
</article>`);
  
  initializeIcons(item);
  return item;
};

function appCart() {
  return `
    <div class="cart-header">
        <h2>
            Your Cart
            <span id="inCartCount" class="in-cart-count"></span>
        </h2>
        <button data-action="close" aria-label="Close your cart">
            <span class="icon close-icon" data-icon="close"></span>
        </button>
    </div>
    <div class="cart-content" id="cartContent"></div>
    <div class="cart-footer" id="cartFooter">
        <menu class="cart-actions">
            <button class="co-btn">Checkout (${ naira(subtotal()) })</button>
        </menu>
    </div>`
};

function drawCart() {
  const ls = lines();
  const cartContent = $("cartContent");
  const count = ls.reduce((n, line) => n + line.qty, 0);

  $("cartCount").textContent = count;
  $("inCartCount").textContent = count;

  cartContent.innerHTML = ls.length
    ? ls.map((line) => { return cartItem(line) }) :
    parseHTML(`<div class="empty-cart">
        <figure class="empty-img">
          <img src="../../Assets/Illustrations/empty-cart.svg" alt="Empty Cart">
        </figure>
        <p>Your cart is empty.</p>
      </div>
    `);

  /*$("cartFooter").innerHTML = ls.length
    ? `
      <menu class="cart-actions">
        <button class="co-btn">Checkout (${ naira(subtotal()) })</button>
      </menu>
    `
    : "";*/
}

function counter(product) {
  return `<menu class="counter">
    <button data-action="pq" class="count-btn" data-id="-1" aria-label="Decrease quantity of ${product.name}">
      <span class="icon minus-icon" data-icon="minus"></span>
    </button>
    <span id="pq" class="count" data-min="${ product.minQty }">${ product.minQty }</span>
    <button data-action="pq" class="count-btn" data-id="1" aria-label="Increase quantity of ${product.name}">
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
        <img src="../../Assets/Images/3d-fruit-basket.png" alt="">
      </figure>
    </div>
  </section>

  <!-- Categories Section -->

  <section class="section wrapper">
    <div class="section-header">
      <h2 class="primary-header-text">Browse by Category</h2>
      <p class="secondary-header-text">
        <span class="icon clover-icon" data-icon="clover"></span>
        Explore variations of our farm-fresh resources.
      </p>
    </div>
    <div class="categories">
    ${ categories.filter(category => category.featured).map((category) => `
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
  </section>

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
      ${ products.filter((product) => product.featured)
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
      ${ steps.map(step => {
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

function shop(params) {
  //selectedCategory = params.get("category");
  selectedSort = params.get("sort") || "featured";
  app.innerHTML = `
    <section class="section wrapper">
      <h1>
        Shop
        <span class="icon store-icon" data-icon="store"></span>
      </h1>
      <div class="shop-controls">
        ${ sortMenu(order, selectedSort) }
        <label class="price-filter">
          <span class="icon naira-icon">₦</span>
          <input id="priceFilter" class="price-filter-input" type="number" min="0" placeholder="Max price (₦)" aria-label="Maximum price" />
        </label>
      </div>
      <span class="results-count">${ products.length } Items</span>
      <div class="product-grid results" id="results">
      ${ renderProducts(products) }
      </div>
    </section>`;

  $("searchField").classList.add("hidden");
  const resCount = app.querySelector(".results-count");
  app.querySelector(".shop-controls").prepend(searchControl(params));
  app.querySelector(".sort-options").addEventListener("click", (e) => {
    const button = e.target.closest("[data-sort]");
    if (!button) return;
    selectedSort = button.dataset.sort;
    updateShop();
  });
  app.querySelector(".picker").addEventListener("click", () => {
    const sortBox = query(".sort-box");
    const sortOpts = query(".sort-options");
    sortBox.classList.toggle("open");
    sortOpts.style.height = sortOpts.scrollHeight + "px";
  });
  app.querySelector(".toggle-filter-btn").addEventListener("click", () => { query(".filter-box").classList.toggle("open") });
  addEvent(".price-filter-input", resCount);
  addEvent(".searchbar", resCount);
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
            <small>Minimum order ${ naira(zone.minOrder) }. ${ zone.window }.</small>
          </span>
          <b>${ naira(zone.fee) }</b>
        </div>`).join("") }
      <!--<p class="note">
        Livestock and frozen goods may need special arrangements, which are explained on each product. Outside these areas, send a WhatsApp enquiry for a quotation.
      </p>-->
    </section>`;
}

function checkout() {
  const ls = lines();
  if (!ls.length) return`
  <section class="section wrapper empty">
    <h1>Your cart is empty</h1>
    <a class="btn" href="#/shop">Browse products</a>
  </section>`;

  const zones = config.zones.map((zone) => `
  <li>
    <button class="zone-select-btn">
    ${ zone.name } (${ naira(zone.fee) })
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
            <span>${ naira(l.total) }</span>
          </div>`).join("") }
          <div class="location">
            <span>Subtotal</span>
            <span>${ naira(sub) }</span>
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
    input({ id: "name", icon: "user", placeholder: "What's your full name", labelClass: "input-field full-length" }),
    input({ id: "phone", icon: "phone", placeholder: "Your phone number", type: "tel", labelClass: "input-field" }),
    input({ id: "email", icon: "mail", placeholder: "Your e-mail address (optional)", type: "email", labelClass: "input-field" })
  );
  coFields.querySelector(".textarea").before(
    input({ id: "address", icon: "location", iconClass: "location-icon",placeholder: "Where do we deliver to?", labelClass: "input-field" })
  );

  return coPage;
};

function info(title) {
  return `
  <section class="section wrapper">
    <h1>${ title }</h1>
    <p>Replace with the business's own text: who HarvestHub is, privacy, terms, and the returns, refunds and cancellation policy.</p>
    <p>${ config.phone }<br />${ config.email }<br />${ config.address }</p>
  </section>`;
};

function productPage(id) {
  const p = product(id);
  if (!p) return `
  <div class="empty-state">
  <figure class="empty-img">
    <img src="../../Assets/Illustrations/no-results.svg" alt="No Results Found"/>
  </figure>
    <h3 class="empty-heading">Product Not Found</h3>
    <a href="#/shop" class="back-to-shop-btn">
        Back to Shop
        <span class="icon attachment-icon" data-icon="attachment"></span>
    </a>
  </div>`;

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 5);
  const ask = waLink(`Hello HarvestHub, I have a question about: ${ p.name }`);

  return `
    <section class="section wrapper">
      <div class="product-page">
        <button class="add-to-wishlist-btn">
          <span class="icon wishlist-icon" data-icon="heart"></span>
        </button>
      
        <div class="product-page-img">${ media(p) }</div>
        <div class="pdp-content">
        <div class="pdp-heading">
          <h1 class="pdp-name">${ p.name }</h1>
          <p class="pdp-price">
            ${ naira(p.price) } 
            <small class="pdp-unit">per ${ p.unit }</small>
          </p>
        </div>
          <div class="pdp-desc">
            <h4 class="desc-heading">Description</h4>
            <p class="desc">${ p.description }</p>
        </div>
          <menu class="pdp-actions">
            <button class="btn btn-main" data-action="buy" data-id="${ p.id }">Buy now</button>
            <button class="btn add-to-cart-btn" data-action="add-product-page" data-id="${ p.id }" >
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

/* --------- Rendering Functions ----------- */

function renderApp() {
  const { page, id, params } = router();

  const pages = {
    home, product: () => productPage(id),
    checkout, wholesale, delivery, about: () => info("About HarvestHub")
  };

  const view = page === "shop"
    ? shop(params)
    : (pages[page] || home)();

  if (typeof view === "string") { app.innerHTML = view }
  else if (view instanceof Node) { app.replaceChildren(view) }
  else { throw new TypeError("A page must return an HTML string or a DOM node.") }

  //$("nav").classList.remove("on");
  window.scrollTo(0, 0);
  initializeIcons(document);
}

function renderProducts(products) {
  return products.map((product) => {
    return productCard(product);
  }).join("");
};

/* ---------- Routing and Events ---------- */

function router() {
  const [path, query] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  return { page: parts[0] || "home", id: parts[1], params: new URLSearchParams(query || "") };
};

function updateShop() {
  const category = selectedCategory === "all" ? "" : selectedCategory;
  const query = app.querySelector(".searchbar").value.trim().toLowerCase();
  const maxPrice = parseFloat($("priceFilter").value);
  const selectedSortOption = order.find(option => option.id === selectedSort);
  const sortBy = selectedSortOption?.sortBy
    || order.find(option => option.id === "featured").sortBy;

  const matches = products.filter((product) => {
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
        <img src="../../Assets/Illustrations/no-results.svg" alt="No Results Found" />
      </figure>
      <p class="empty-desc">No Matching Products. Try clearing a filter</p>
    </div>`);
    results.append(noRes);
    results.classList.add("empty")
  } else { results.classList.remove("empty") };

  return matches;
};

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

function sendOrder(channel) {
  const val = (id) => $(id).value.trim();
  const delivering = val("ful") === "Delivery";

  const ok = check([
    ["name", filled, "Enter your full name."],
    ["phone", phoneOk, "Enter a valid phone number."],
    ["city", filled, "Enter your city or town."],
    ["state", filled, "Enter your state."],
    ["address", (v) => !delivering || v.length > 0, "Enter a delivery address."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const fee = feeFor(val("ful"), val("zone"));
  const zone = config.zones.find((z) => z.id === val("zone"));
  if (delivering && subtotal() < zone.minOrder) return toast(`Minimum order for this area is ${ naira(zone.minOrder) }.`);

  const text = orderText({ name: val("name"), phone: val("phone"), fulfilment: val("ful"), address: val("address"), city: val("city"), state: val("state"), notes: val("notes") }, fee);

  if (channel === "wa") {
    window.open(waLink(text), "_blank", "noopener");
    toast("WhatsApp opened. Press send there to submit your request.");
  } else {
    locategoryion.href = `mailto:${ config.email }?subject=${ encodeURIComponent("HarvestHub order request") }&body=${ encodeURIComponent(text) }`;
    toast("Your email app should open. Press send to submit your request.");
  }
};

function sendEnquiry() {
  const ok = check([
    ["wb", filled, "Enter your business name."],
    ["wc", filled, "Enter a contact name."],
    ["wp", phoneOk, "Enter a valid phone number."],
    ["wl", filled, "Enter the delivery locategoryion."],
    ["wn", filled, "Tell us what you need."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const text = ["HARVESTHUB BULK ENQUIRY", "", `Business: ${ v("wb") }`, `Contact: ${ v("wc") }`, `Phone: ${ v("wp") }`, `Locategoryion: ${ v("wl") }`, `Needed by: ${ v("wd") || "Not stated" }`, "", `Request: ${ v("wn") }`].join("\n");
  window.open(waLink(text), "_blank", "noopener");
  toast("WhatsApp opened. Press send there to submit your enquiry.");
};

function init() {
  query(".app-header").innerHTML = navbar(navdata);
  query(".cart").innerHTML = appCart();
  $("wa").href = waLink("Hello HarvestHub, I would like to place an order.");
  $("footAddr").textContent = config.address;
  $("footCategorys").innerHTML = categories.slice(0, 6).map((c) => `<a href="#/shop?category=${ c.id }">${ c.name }</a>`).join("");
  $("footContact").innerHTML = `<a href="${ waLink("Hello HarvestHub") }" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${ config.email }">${ config.email }</a><span>${ config.phone }</span>`;
  drawCart();
  renderApp();
};

init();