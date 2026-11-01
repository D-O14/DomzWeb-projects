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
    { anchor: "Contact us", path: "#/contact" },
  ]
};

const categories = [
  { id: "grains", name: "Grains and Staples" },
  { id: "bulk", name: "Bulk and Wholesale Supply" },
  { id: "fruits", name: "Fruits", img: "../../Assets/Images/3d-fruits.png", featured: true, className: "fruits" },
  { id: "poultry", name: "Poultry", img: "../../Assets/Images/3d-chicken.png", featured: true, className: "poultry" },
  { id: "livestock", name: "Livestock", img: "../../Assets/Images/3d-goat.png", featured: true, className: "livestock" },
  { id: "frozen", name: "Frozen Foods", img: "../../Assets/Images/3d-frozen-meat.png", featured: true, className: "frozen" },
  { id: "produce", name: "Fresh Produce", img: "../../Assets/Images/3d-produce-box.png", featured: true, className: "fresh" },
  { id: "tubers", name: "Tubers and Roots", img: "../../Assets/Images/3d-tubers_roots.png", featured: true, className: "t_r" },
];

const products = [
  {
    id: "goat", name: "Live Goat", category: "livestock", emoji: "🐐", featured: true, price: 85000, min: 1,
    desc: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
    note: "Sourced after you order. Collection or delivery is arranged with you."
  },
  {
    id: "broiler", name: "Live Broiler Chicken", category: "poultry", emoji: "🐓", featured: true, price: 8500, min: 1,
    max: 50, desc: "Sample listing for live broilers. Size and weight may vary by animal.", note: "Weight varies by bird."
  },
  {
    id: "local-chicken", name: "Live Local Chicken", category: "poultry", emoji: "🐔", price: 12000, min: 1,
    desc: "Sample listing for live local birds.", note: "Weight varies by bird."
  },
  {
    id: "frozen-whole", name: "Frozen Whole Chicken", category: "frozen", emoji: "🍗", price: 6500, min: 1,
    desc: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business."
  },
  {
    id: "frozen-portions", name: "Frozen Chicken Portions", category: "frozen", emoji: "🍖", price: 6000, min: 1,
    desc: "Sample portions.", note: "Shown as unavailable in this demo."
  },
  {
    id: "tomatoes", name: "Tomatoes", category: "produce", emoji: "🍅", featured: true, price: 35000, min: 1,
    desc: "Sample freshly harvested tomatoes sold in bunches per basket.", note: "Basket sizes vary. Seasonal supply."
  },
  {
    id: "pepper", name: "Pepper", category: "produce", emoji: "🌶️", price: 3000, min: 1, desc: "Sample pepper sold by the kilogram.",
    note: "Seasonal supply."
  },
  {
    id: "onions", name: "Onions", category: "produce", emoji: "🧅", price: 2200, min: 1,
    max: 25, desc: "Sample onions sold by the kilogram.", note: ""
  },
  {
    id: "rice", name: "Rice", category: "grains", emoji: "🍚", price: 4000, unit: "kg", min: 1,
    max: 50, desc: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
  },
  { id: "beans", name: "Beans", category: "grains", emoji: "🫘", price: 3500, min: 1, desc: "Sample beans sold by the kilogram.", note: "" },
  { id: "maize", name: "Maize", category: "grains", emoji: "🌽", price: 1800, min: 5, desc: "Sample maize.", note: "Minimum order 5 kg." },
  { id: "garri", name: "Garri", category: "grains", emoji: "🥣", price: 2000, min: 1, desc: "Sample garri sold by the kilogram.", note: "" },
  { id: "yam", name: "Yam", category: "tubers", emoji: "🍠", price: 4500, min: 1, desc: "Sample yam sold per tuber.", note: "Tuber sizes vary." },
  { id: "cassava", name: "Cassava", category: "tubers", emoji: "🥔", price: 1500, min: 2, desc: "Sample cassava.", note: "Minimum order 2 kg." },
  { id: "plantain", name: "Plantain", category: "fruits", emoji: "🍌", price: 3000, min: 1, desc: "Sample plantain sold per bunch.", note: "Bunch sizes vary." },
  { id: "bulk-rice", name: "Rice, Bulk Sack", category: "bulk", emoji: "🌾", price: 190000, min: 1, desc: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business." },
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
  add: (el) => addToCart(el.dataset.id, product(el.dataset.id).min),
  "add-pdp": (el) => addToCart(el.dataset.id, pq()),
  buy: (el) => { addToCart(el.dataset.id, pq()); location.hash = "#/checkout"; },
  pq: (el) => { const min = parseInt($("pq").dataset.min, 10); $("pq").textContent = Math.max(min, pq() + parseInt(el.dataset.d, 10)); },
  inc: (el) => setQty(el.dataset.id, 1),
  dec: (el) => setQty(el.dataset.id, -1),
  del: (el) => removeFromCart(el.dataset.id),
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

const cart_key = "harvesthub-v2-cart";

// status: in | out | order (sourced or prepared after ordering)
// tiers: quantity-based prices, set per product. image: path or URL (emoji shows if empty)

/* ---------- State & Variables ---------- */

let cart = read(cart_key, []);
let timer;
let isOpen;

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

function stock(p) {
  const map = { in: ["in", "Available"], out: ["out", "Currently unavailable"], order: ["order", "Made to order"] };
  return `<span class="st st--${ map[p.status][0] }">${ map[p.status][1] }</span>`;
};

function media(p) {
  return p.image ? `<img src="${ p.image }" alt="${ p.name }" loading="lazy" />` :
    `<span role="img" aria-label="${ p.name }">${ p.emoji }</span>`;
};

// Best matching quantity tier, or the base price.

function unitPrice(p, quantity) {
  const tier = (p.tiers || []).filter((t) => quantity >= t.quantity).sort((a, b) => b.quantity - a.quantity)[0];
  return tier ? tier.price : p.price;
};

function lines() {
  return cart.map((c) => {
    const p = product(c.id);
    if (!p) return null;
    const price = unitPrice(product, c.quantity);
    return { p, qty: c.quantity, price, total: price * c.quantity };
  }).filter(Boolean);
};

// Functions that allow cart operations

function addToCart(id, quantity) {
  const product = product(id);
  const entry = cart.find((cart) => cart.id === id);
  const next = (entry ? entry.quantity : 0) + quantity;
  if (next < product.min) {
    return toast(`Minimum order for ${ product.name } is ${ product.min } ${ product.unit }.`);
  };
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
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  const next = entry.quantity + delta;
  if (next < product(id).min) cart = cart.filter((c) => c.id !== id);
  else entry.quantity = next;
  save(cart_key, cart);
  drawCart();
  if (route().page === "checkout") render();
};

/* ---------- Order Messages ---------- */

function feeFor(fulfilment, zoneId) {
  if (fulfilment === "Collection") return 0;
  const zone = config.zones.find((z) => z.id === zoneId);
  return zone ? zone.fee : null;
}

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
}

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
      <label for="searchbar" class="search-field">
        <span class="icon plant-icon" data-icon="${ navdata.logo }"></span>
        <input type="search" name="searched_item" placeholder="Search the market..." class="searchbar" id="searchbar">
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
  const field = parseHTML(`<label for="${ input.id }" class="${ input.labelClass ? input.labelClass : "" }">
        ${ input.label ? input.label : "" }
        <span class="icon ${ input.iconClass ? input.iconClass : "" }" data-icon="${ input?.icon }"></span>
        <input ${ input.value ? input.value : "" } type="${ input.type }" placeholder="${ input?.placeholder }" id="${ input?.id }" 
        ${ input.name ? `name="${ input.name }"` : "" } class="${ input?.className }"  ${ input.required ? "required" : "" } >
        ${ input?.required ? `<p class="error" id="error-${ input?.id }" aria-live="polite"></p>` : "" }
    </label>`);

  if (input.events) {
    const events = input?.events;
    field.addEventListener("blur", (event) => { events?.blurred(event) });
    field.addEventListener("focus", (event) => { events?.focused(event) });
    field.addEventListener("input", (event) => { events?.update(event) });
    field.addEventListener("keydown", (event) => { events?.keydown(event) });
  };

  return field;
};

function searchControl(params) {
  const selectedCategory = params.get("category");
  const wrapper = parseHTML(`<div class="search-filter">
      <div class="filter">
          <button class="filter-btn" data-action="filter" aria-label="activate filter menu">
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
      <li class="filter-option">
          <button class="filter-btn ${option.id === selectedId ? "is-selected" : ""}" data-value="${option.id }" 
          aria-pressed="${ isSelected }">${ option.name }</button>
        </li>`}).join("") }
    </ul>
  </menu>`
};

function sortMenu(options, selectedSortId) {
  return `<menu class="sort-box">
        <label for="sortOpts" class="picker">
            <span class="selected-opt" id="selected">
              ${options.find(option => option.id === selectedSortId)?.label || "Sort By:"}
            </span>
            <span class="icon chevron-icon" data-icon="arrowDown"></span>
        </label>
        <ul class="sort-options" id="sortOpts">
        ${ options.map(option => {
          return `<li class="sort-option">
              <button class="sort-btn" type="button" data-sort="${option.id }"
              aria-pressed="${ option.id === selectedSortId}">
                ${ option.label }
              </button>
            </li>`}).join("") }
        </ul>
    </menu>`
};

function productCard(product) {
  return `
  <article class="product-card">
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
            <p class="product-desc">${ product.desc }</p>
            <menu class="card-actions">
                <button class="cart-btn" data-action="add" aria-label="Add to Cart" data-product-id="${ product.id }">
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
  $("drawer").classList.toggle("on", on);
  $("scrim").classList.toggle("on", on);
};

function drawCart() {
  const ls = lines();
  //$("cartCount").textContent = ls.reduce((n, l) => n + l.quantity, 0);

  $("dBody").innerHTML = ls.length
    ? ls.map((l) => `
        <div class="item">
          <strong>${ l.p.name }</strong><span>${ naira(l.total) }</span>
          <small>${ naira(l.price) } per ${ l.p.unit }</small><span></span>
          <div class="quantity"><button data-action="dec" data-id="${ l.p.id }" aria-label="Decrease">−</button><span>${ l.quantity }</span><button data-action="inc" data-id="${ l.p.id }" aria-label="Increase">+</button></div>
          <button class="lnk" data-action="del" data-id="${ l.p.id }">Remove</button>
        </div>`).join("")
    : `<div class="empty">Your cart is empty.</div>`;

  $("dFoot").innerHTML = ls.length
    ? `<div class="ln ln--t"><span>Subtotal</span><span>${ naira(subtotal()) }</span></div><p><small>Delivery is added at checkout.</small></p><a class="btn btn--forest" style="display:block;text-align:center" href="#/checkout" data-action="close">Checkout</a>`
    : "";
};

function field({ id, label, type = "text", className = "" }) {
  return `<div class="field ${ className }">
    <label for="${ id }">${ label }</label>
    <input id="${ id }" type="${ type }" />
    <span class="error" id="error-${ id }"></span>
  </div>`;
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
          <a href="#/shop?category=${ category.id }" class="category-img ${ category.className }"> 
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
      ${ products.filter((p) => p.featured).map((p) => productCard(p)).join("") }
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
  app.innerHTML = `
    <section class="section wrapper">
      <h1>
        Shop
        <span class="icon store-icon" data-icon="store"></span>
      </h1>
      <div class="shop-controls">
        ${ sortMenu(order) }
        <label class="price-filter">
          <span class="icon naira-icon">₦</span>
          <input id="priceFilter" class="price-filter-input" type="number" min="0" placeholder="Max price (₦)" aria-label="Maximum price" />
        </label>
      </div>
      <div class="product-grid" id="results"></div>
    </section>`;

  app.querySelector(".shop-controls").prepend(searchControl(params));
  query(".searchbar").addEventListener("input", drawResults);
  query(".picker").addEventListener("click", () => {
    const sortBox = query(".sort-box");
    const sortOpts = query(".sort-options");
    sortBox.classList.toggle("open");
    sortOpts.style.height = sortOpts.scrollHeight + "px";
  });
  query(".filter-btn").addEventListener("click", () => { query(".filter-box").classList.toggle("open") });
  drawResults();
};

function checkout() {
  const ls = lines();
  if (!ls.length) return `<section class="section wrapper empty"><h1>Your cart is empty</h1><a class="btn" href="#/shop">Browse products</a></section>`;

  const zones = config.zones.map((z) => `<option value="${ z.id }">${ z.name } (${ naira(z.fee) })</option>`).join("");
  const sub = subtotal();

  return `
    <section class="section wrapper">
      <h1>Checkout</h1>
      <div class="co">
        <form id="coForm" novalidate>
          <div class="two">
            ${ field("name", "Full name", "text", "full") }
            ${ field("phone", "Phone number", "tel") }
            ${ field("email", "Email (optional)", "email") }
            <div class="fld"><label for="ful">Fulfilment</label><select id="ful"><option>Delivery</option>${ config.collectionEnabled ? "<option>Collection</option>" : "" }</select></div>
            <div class="fld"><label for="zone">Delivery area</label><select id="zone">${ zones }</select></div>
            ${ field("city", "City or town") }
            ${ field("state", "State") }
            ${ field("address", "Delivery address", "text", "full") }
            <div class="fld full"><label for="notes">Notes (optional)</label><textarea id="notes" rows="3"></textarea></div>
          </div>
          <div class="note">Sending on WhatsApp or email submits an order request only. HarvestHub confirms stock, final price, payment and delivery with you. Online payment arrives with the backend stage.</div>
          <div class="row">
            <button type="button" class="btn btn--wa" data-action="send-wa">Send order on WhatsApp</button>
            <button type="button" class="btn btn--forest" data-action="send-mail">Send order by email</button>
          </div>
        </form>
        <aside class="box">
          <h3>Order summary</h3>
          ${ ls.map((l) => `<div class="ln"><span>${ l.p.name } (${ l.quantity } ${ l.p.unit })</span><span>${ naira(l.total) }</span></div>`).join("") }
          <div class="ln"><span>Subtotal</span><span>${ naira(sub) }</span></div>
          <div class="ln ln--t"><span>Delivery fee and total</span><span>shown in your message</span></div>
        </aside>
      </div>
    </section>`;
};

function pdp(id) {
  const p = product(id);
  if (!p) return `<section class="section wrapper empty"><h1>Product not found</h1><a class="btn" href="#/shop">Back to shop</a></section>`;

  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 4);
  const tiers = p.tiers ? `<ul class="tiers">${ p.tiers.map((t) => `<li>${ t.quantity }+ ${ p.unit }: ${ naira(t.price) } per ${ p.unit }</li>`).join("") }</ul>` : "";
  const ask = waLink(`Hello HarvestHub, I have a question about: ${ p.name }`);

  return `
    <section class="section wrapper">
      <div class="pdp">
        <div class="pdp__img">${ media(p) }</div>
        <div>
          <h1>${ p.name }</h1>
          <div class="price">${ naira(p.price) } <small>per ${ p.unit }</small></div>
          ${ tiers }${ stock(p) }
          <p>${ p.desc }</p>
          <p>Minimum order: ${ p.min } ${ p.unit }</p>
          <div class="quantity"><button data-action="pq" data-d="-1" aria-label="Decrease">−</button><span id="pq" data-min="${ p.min }">${ p.min }</span><button data-action="pq" data-d="1" aria-label="Increase">+</button></div>
          <div class="row">
            <button class="btn btn--forest" data-action="add-pdp" data-id="${ p.id }" ${ p.status === "out" ? "disabled" : "" }>Add to cart</button>
            <button class="btn" data-action="buy" data-id="${ p.id }" ${ p.status === "out" ? "disabled" : "" }>Buy now</button>
            <a class="btn btn--wa" href="${ ask }" target="_blank" rel="noopener">Ask on WhatsApp</a>
          </div>
          ${ p.note ? `<div class="note">${ p.note }</div>` : "" }
        </div>
      </div>
    </section>
    ${ related.length ? `<section class="section wrapper"><h2>More in this section</h2><div class="grid">${ related.map(card).join("") }</div></section>` : "" }`;
};

function drawResults() {
  const query = $("searchbar").value.trim().toLowerCase();
  const maxPrice = parseFloat($("priceFilter").value);
  //const category = $("fCategory").value;
  //const onlyIn = $("filterIn").checked;
  const sort = $("selected").textContent;

  const list = products.filter((product) => {
    if (query && !(product.name + " " + product.desc).toLowerCase().includes(query)) return false;
    //if (category && p.category !== category) return false;
    if (!isNaN(maxPrice) && product.price > maxPrice) return false;
    return true;
  });

  $("results").innerHTML = list.sort(order[sort]).map(productCard).join("") || `<div class="empty">Nothing matches. Try clearing a filter.</div>`;
};

function info(title) {
  return `<section class="sec wrapper"><h1>${ title }</h1><p>Replace with the business's own text: who HarvestHub is, privacy, terms, and the returns, refunds and cancellation policy.</p><p>${ config.phone }<br />${ config.email }<br />${ config.address }</p></section>`;
};

/* ---------- Routing and Events ---------- */

function router() {
  const [path, query] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  return { page: parts[0] || "home", id: parts[1], params: new URLSearchParams(query || "") };
};

function renderApp() {
  const { page, id, params } = router();
  const pages = { home, product: () => pdp(id), checkout, /*wholesale, delivery*/ about: () => info("About HarvestHub") };

  page === "shop" ? shop(params) : app.innerHTML = (pages[page] || home)();

  //$("nav").classList.remove("on");
  window.scrollTo(0, 0);
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
  $("wa").href = waLink("Hello HarvestHub, I would like to place an order.");
  $("footAddr").textContent = config.address;
  $("footCategorys").innerHTML = categories.slice(0, 6).map((c) => `<a href="#/shop?category=${ c.id }">${ c.name }</a>`).join("");
  $("footContact").innerHTML = `<a href="${ waLink("Hello HarvestHub") }" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${ config.email }">${ config.email }</a><span>${ config.phone }</span>`;
  //drawCart();
  renderApp();
  initializeIcons(document);
};

init();