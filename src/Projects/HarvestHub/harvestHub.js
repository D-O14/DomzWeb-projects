import { initializeIcons } from "@assets/Icons/icons";

/* HarvestHub v2 (front-end stage, demo data)
   Prices are whole naira. The backend stage will move products,
   zones and settings into the database and recalculate totals on the server. */
/* ---------- config: replace with real details ---------- */

const config = {
  //announcement: "Retail and bulk supply for households and food businesses in Benin City."
  whatsapp: "+234 916 456 989 1",
  email: "harvesthub@egmail.com",
  phone: "+234 916 456 989 1",
  address: "No: 3, Razao-Belo, Osagie Ln, Benin City, Edo State",
  collectionEnabled: true,
  zones: [
    { id: "central", name: "Benin City: central areas", fee: 2500, minOrder: 5000, window: "Time confirmed after you order" },
    { id: "outer", name: "Benin City: outer areas", fee: 4500, minOrder: 10000, window: "Time confirmed after you order" },
  ],
};

/* ---------- DATA ---------- */

const categories = [
  { id: "livestock", name: "Livestock" },
  { id: "poultry", name: "Poultry" },
  { id: "frozen", name: "Frozen Foods" },
  { id: "produce", name: "Fresh Produce" },
  { id: "grains", name: "Grains and Staples" },
  { id: "tubers", name: "Tubers and Roots" },
  { id: "fruits", name: "Fruits" },
  { id: "bulk", name: "Bulk and Wholesale Supply" },
];

// status: in | out | order (sourced or prepared after ordering)
// tiers: quantity-based prices, set per product. image: path or URL (emoji shows if empty)

const products = [
  {
    id: "goat", name: "Live Goat", category: "livestock", emoji: "🐐", status: "order", featured: true, price: 85000, unit: "animal", min: 1,
    desc: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
    note: "Sourced after you order. Collection or delivery is arranged with you."
  },
  {
    id: "broiler", name: "Live Broiler Chicken", category: "poultry", emoji: "🐓", status: "in", featured: true, price: 8500, unit: "bird", min: 1,
    tiers: [{ quantity: 50, price: 8000 }], desc: "Sample listing for live broilers.", note: "Weight varies by bird."
  },
  {
    id: "local-chicken", name: "Live Local Chicken", category: "poultry", emoji: "🐔", status: "in", price: 12000, unit: "bird", min: 1,
    desc: "Sample listing for live local birds.", note: "Weight varies by bird."
  },
  {
    id: "frozen-whole", name: "Frozen Whole Chicken", category: "frozen", emoji: "🍗", status: "in", featured: true, price: 6500, unit: "kg", min: 1,
    desc: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business."
  },
  {
    id: "frozen-portions", name: "Frozen Chicken Portions", category: "frozen", emoji: "🍖", status: "out", price: 6000, unit: "kg", min: 1,
    desc: "Sample portions.", note: "Shown as unavailable in this demo."
  },
  {
    id: "tomatoes", name: "Tomatoes", category: "produce", emoji: "🍅", status: "in", featured: true, price: 35000, unit: "basket", min: 1,
    desc: "Sample tomatoes sold by the basket.", note: "Basket sizes vary. Seasonal supply."
  },
  { id: "pepper", name: "Pepper", category: "produce", emoji: "🌶️", status: "in", price: 3000, unit: "kg", min: 1, desc: "Sample pepper sold by the kilogram.", note: "Seasonal supply." },
  {
    id: "onions", name: "Onions", category: "produce", emoji: "🧅", status: "in", price: 2200, unit: "kg", min: 1,
    tiers: [{ quantity: 25, price: 2000 }], desc: "Sample onions sold by the kilogram.", note: ""
  },
  {
    id: "rice", name: "Rice", category: "grains", emoji: "🍚", status: "in", featured: true, price: 4000, unit: "kg", min: 1,
    tiers: [{ quantity: 50, price: 3700 }], desc: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
  },
  { id: "beans", name: "Beans", category: "grains", emoji: "🫘", status: "in", price: 3500, unit: "kg", min: 1, desc: "Sample beans sold by the kilogram.", note: "" },
  { id: "maize", name: "Maize", category: "grains", emoji: "🌽", status: "in", price: 1800, unit: "kg", min: 5, desc: "Sample maize.", note: "Minimum order 5 kg." },
  { id: "garri", name: "Garri", category: "grains", emoji: "🥣", status: "in", price: 2000, unit: "kg", min: 1, desc: "Sample garri sold by the kilogram.", note: "" },
  { id: "yam", name: "Yam", category: "tubers", emoji: "🍠", status: "in", featured: true, price: 4500, unit: "tuber", min: 1, desc: "Sample yam sold per tuber.", note: "Tuber sizes vary." },
  { id: "cassava", name: "Cassava", category: "tubers", emoji: "🥔", status: "in", price: 1500, unit: "kg", min: 2, desc: "Sample cassava.", note: "Minimum order 2 kg." },
  { id: "plantain", name: "Plantain", category: "fruits", emoji: "🍌", status: "in", price: 3000, unit: "bunch", min: 1, desc: "Sample plantain sold per bunch.", note: "Bunch sizes vary." },
  { id: "bulk-rice", name: "Rice, Bulk Sack", category: "bulk", emoji: "🌾", status: "in", price: 190000, unit: "sack", min: 1, desc: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business." },
];

/* ---------- CART ---------- */
const KEY = "harvesthub-v2-cart";
let cart = load();

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cart));
  } catch (e) {
    toast("Could not save your cart in this browser.");
  }
}

function $(id) {
  return document.getElementById(id);
}

const app = $("app");

const naira = (num) => "₦" + num.toLocaleString("en-NG");
const product = (id) => products.find((p) => p.id === id);
const count = (id) => products.filter((p) => p.category === id).length;
const subtotal = () => lines().reduce((sum, l) => sum + l.total, 0);
const waLink = (text) => `https://wa.me/${ config.whatsapp }?text=${ encodeURIComponent(text) }`;

// Best matching quantity tier, or the base price.

function unitPrice(p, quantity) {
  const tier = (p.tiers || []).filter((t) => quantity >= t.quantity).sort((a, b) => b.quantity - a.quantity)[0];
  return tier ? tier.price : p.price;
}

function lines() {
  return cart.map((c) => {
    const p = product(c.id);
    if (!p) return null;
    const price = unitPrice(product, c.quantity);
    return { p, qty: c.quantity, price, total: price * c.quantity };
  }).filter(Boolean);
}

function addItem(id, quantity) {
  const p = product(id);
  const entry = cart.find((c) => c.id === id);
  const next = (entry ? entry.quantity : 0) + quantity;
  if (next < p.min) return toast(`Minimum order for ${ p.name } is ${ p.min } ${ p.unit }.`);
  if (entry) entry.quantity = next;
  else cart.push({ id, quantity: next });
  save();
  drawCart();
  toast("Added to cart");
}

function setquantity(id, delta) {
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  const next = entry.quantity + delta;
  if (next < product(id).min) cart = cart.filter((c) => c.id !== id);
  else entry.quantity = next;
  save();
  drawCart();
  if (route().page === "checkout") render();
}

function removeItem(id) {
  cart = cart.filter((c) => c.id !== id);
  save();
  drawCart();
  if (route().page === "checkout") render();
}

/* ---------- ORDER MESSAGES ---------- */

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

/* ---------- VIEWS ---------- */

function stock(p) {
  const map = { in: ["in", "Available"], out: ["out", "Currently unavailable"], order: ["order", "Made to order"] };
  return `<span class="st st--${ map[p.status][0] }">${ map[p.status][1] }</span>`;
}

function media(p) {
  return p.image ? `<img src="${ p.image }" alt="${ p.name }" loading="lazy" />` :
    `<span role="img" aria-label="${ p.name }">${ p.emoji }</span>`;
}

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
                    <span class="icon cart-icon" data-icon="shoppingCart"></span>
                </button>
                <a class="details-btn" href="#/product/${ product.id }">
                    View Details
                    <span class="icon details-icon" data-icon="attachment"></span>
                </a>
            </menu>
        </div>
    </article>`;
}

function home() {
  return `<section class="hero">
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
          <span class="icon arrow-icon" data-icon="arrowUp"></span>
          </a>
          <a class="btn btn-secondary" href="#/wholesale">Bulk supply for business</a>
        </menu>
      </div>

      <figure class="hero-img">
        <img src="../../Assets/Images/3d-fruit-basket.png" alt="">
      </figure>

      <!--<div class="price-board">
        <h3 class="price-board-title">On the price board</h3>
          ${ products.filter((p) => p.featured).slice(0, 6).map((p) =>
            `<a href="#/product/${ p.id }">
                <span>
                  ${ p.name }
                  <small>per ${ p.unit }</small>
                </span>
                <b>${ naira(p.price) }</b>
              </a>`).join("")}
      </div>-->

    </div>
  </section>

  <section class="section wrapper">
    <h2>Browse by section</h2>
    <div class="index">
    ${ categories.map((c) =>
      `<a href = "#/shop?category=${ c.id }" > ${ c.name }
        <span>${ count(c.id) } items</span>
      </a>`).join("") }
    </div>
  </section>

  <section class="section wrapper">
    <h2>Featured this week</h2>
    <div class="product-grid">
      ${products.filter((p) => p.featured).map((p) => productCard(p)).join("")}
    </div>
  </section>

  <section class="paths">
    <div class="path path-home">
      <h2>For your household</h2>
      <p>Order by the animal, bird, kilogram, basket or bunch. Each product shows exactly how it is sold.</p>
      <a class="btn btn-forest" href="#/shop">Shop for home</a>
    </div>
    <div class="path path-bulk">
      <h2>For restaurants and retailers</h2>
      <p>Ask for larger quantities and a quotation. Quantity prices are set product by product.</p>
      <a class="btn" href="#/wholesale">Request bulk supply</a>
    </div>
  </section>

  <section class="section wrapper">
    <h2>How ordering works</h2>
    <div class="steps">
      <div>
        <h3>Choose</h3>Add products and quantities to your cart.
      </div>
      <div>
        <h3>Send your order</h3>Share it on WhatsApp or by email. This submits a request only.
      </div>
      <div>
        <h3>We confirm</h3>HarvestHub confirms stock, final price, payment and delivery or collection with you.
      </div>
    </div>
  </section>`;
}

function shop(params) {
  const categorys = categories.map((c) => `<option value="${ c.id }" ${ params.get("category") === c.id ? "selected" : "" }>${ c.name }</option>`).join("");

  app.innerHTML = `
    <section class="section wrapper">
      <h1>Shop</h1>
      <div class="bar2">
        <input id="fQ" type="search" placeholder="Search" value="${ params.get("q") || "" }" aria-label="Search" />
        <select id="fCategory" aria-label="Category"><option value="">All sections</option>${ categorys }</select>
        <input id="fMax" type="number" min="0" placeholder="Max price (₦)" aria-label="Maximum price" />
        <select id="fSort" aria-label="Sort"><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select>
        <label><input id="fIn" type="checkbox" /> Available only</label>
      </div>
      <div class="product-grid" id="results"></div>
    </section>`;

  document.querySelector(".bar2").addEventListener("input", drawResults);
  drawResults();
}

function drawResults() {
  const q = $("fQ").value.trim().toLowerCase();
  const category = $("fCategory").value;
  const max = parseFloat($("fMax").value);
  const sort = $("fSort").value;
  const onlyIn = $("fIn").checked;

  const list = products.filter((p) => {
    if (q && !(p.name + " " + p.desc).toLowerCase().includes(q)) return false;
    if (category && p.category !== category) return false;
    if (!isNaN(max) && p.price > max) return false;
    if (onlyIn && p.status === "out") return false;
    return true;
  });

  const order = {
    featured: (a, b) => Number(!!b.featured) - Number(!!a.featured),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  $("results").innerHTML = list.sort(order[sort]).map(productCard).join("") || `<div class="empty">Nothing matches. Try clearing a filter.</div>`;
}

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
}

function field(id, label, type = "text", cls = "") {
  return `<div class="fld ${ cls }"><label for="${ id }">${ label }</label><input id="${ id }" type="${ type }" /><span class="err" id="e-${ id }"></span></div>`;
}

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
}

function wholesale() {
  return `
    <section class="section wrapper">
      <h1>Bulk supply for businesses</h1>
      <p>For restaurants, categoryerers, retailers and hotels. Tell us what you need and we will reply with a quotation. Quantity prices are agreed product by product.</p>
      <form id="wsForm" class="box" novalidate>
        <div class="two">
          ${ field("wb", "Business name") }
          ${ field("wc", "Contact person") }
          ${ field("wp", "Phone number", "tel") }
          ${ field("wl", "Delivery locategoryion") }
          ${ field("wd", "Needed by (date)", "date") }
          <div class="fld full"><label for="wn">products and quantities</label><textarea id="wn" rows="4" placeholder="Example: 200 kg rice, 40 broilers"></textarea><span class="err" id="e-wn"></span></div>
        </div>
        <button type="button" class="btn whatsapp-btn" data-action="send-ws">Send enquiry on WhatsApp</button>
        <p class="note">Opening WhatsApp does not send the message until you press send. A quotation is not an order.</p>
      </form>
    </section>`;
}

function delivery() {
  return `
    <section class="section wrapper">
      <h1>Delivery and collection</h1>
      <p>Delivery areas and fees are set by the business and shown at checkout.</p>
      ${ config.zones.map((z) => `<div class="ln"><span>${ z.name }<br /><small>Minimum order ${ naira(z.minOrder) }. ${ z.window }.</small></span><b>${ naira(z.fee) }</b></div>`).join("") }
      <div class="note">Livestock and frozen goods may need special arrangements, which are explained on each product. Outside these areas, send a WhatsApp enquiry for a quotation.</div>
    </section>`;
}

function info(title) {
  return `<section class="sec wrapper"><h1>${ title }</h1><p>Replace with the business's own text: who HarvestHub is, privacy, terms, and the returns, refunds and cancellation policy.</p><p>${ config.phone }<br />${ config.email }<br />${ config.address }</p></section>`;
}

/* ---------- CART DRAWER, TOAST ---------- */
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
}

const panel = (on) => {
  $("drawer").classList.toggle("on", on);
  $("scrim").classList.toggle("on", on);
};

let timer;
function toast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("on");
  clearTimeout(timer);
  timer = setTimeout(() => t.classList.remove("on"), 2300);
}

/* ---------- ROUTING AND EVENTS ---------- */
function route() {
  const [path, query] = (location.hash.slice(1) || "/").split("?");
  const parts = path.split("/").filter(Boolean);
  return { page: parts[0] || "home", id: parts[1], params: new URLSearchParams(query || "") };
}

function render() {
  const { page, id, params } = route();
  const pages = { home, product: () => pdp(id), checkout, wholesale, delivery, about: () => info("About HarvestHub") };

  if (page === "shop") shop(params);
  else app.innerHTML = (pages[page] || home)();

  //$("nav").classList.remove("on");
  window.scrollTo(0, 0);
}

// Shows an error under each field and returns true when all pass.
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
}

const phoneOk = (v) => /^[0-9+\s-]{10,16}$/.test(v);
const filled = (v) => v.length > 0;

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
}

function sendEnquiry() {
  const ok = check([
    ["wb", filled, "Enter your business name."],
    ["wc", filled, "Enter a contact name."],
    ["wp", phoneOk, "Enter a valid phone number."],
    ["wl", filled, "Enter the delivery locategoryion."],
    ["wn", filled, "Tell us what you need."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const v = (id) => $(id).value.trim();
  const text = ["HARVESTHUB BULK ENQUIRY", "", `Business: ${ v("wb") }`, `Contact: ${ v("wc") }`, `Phone: ${ v("wp") }`, `Locategoryion: ${ v("wl") }`, `Needed by: ${ v("wd") || "Not stated" }`, "", `Request: ${ v("wn") }`].join("\n");
  window.open(waLink(text), "_blank", "noopener");
  toast("WhatsApp opened. Press send there to submit your enquiry.");
}

const pq = () => parseInt($("pq").textContent, 10);

const acts = {
  cart: () => panel(true),
  close: () => panel(false),
  menu: () => $("nav").classList.toggle("on"),
  add: (el) => addItem(el.dataset.id, product(el.dataset.id).min),
  "add-pdp": (el) => addItem(el.dataset.id, pq()),
  buy: (el) => { addItem(el.dataset.id, pq()); locategoryion.hash = "#/checkout"; },
  pq: (el) => { const min = parseInt($("pq").dataset.min, 10); $("pq").textContent = Math.max(min, pq() + parseInt(el.dataset.d, 10)); },
  inc: (el) => setquantity(el.dataset.id, 1),
  dec: (el) => setquantity(el.dataset.id, -1),
  del: (el) => removeItem(el.dataset.id),
  "send-wa": () => sendOrder("wa"),
  "send-mail": () => sendOrder("mail"),
  "send-ws": sendEnquiry,
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-action]");
  if (el && acts[el.dataset.act]) acts[el.dataset.act](el);
});

/*$("searchInput").addEventListener("submit", (e) => {
  e.preventDefault();
  locategoryion.hash = `#/shop?q=${encodeURIComponent($("findInput").value.trim())}`;
});*/

window.addEventListener("hashchange", render);

function init() {
  //$("bar").textContent = config.announcement;
  $("wa").href = waLink("Hello HarvestHub, I would like to place an order.");
  //$("names").innerHTML = products.map((p) => `<option value="${p.name}">`).join("");
  $("footAddr").textContent = config.address;
  $("footCategorys").innerHTML = categories.slice(0, 6).map((c) => `<a href="#/shop?category=${ c.id }">${ c.name }</a>`).join("");
  $("footContact").innerHTML = `<a href="${ waLink("Hello HarvestHub") }" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${ config.email }">${ config.email }</a><span>${ config.phone }</span>`;
  //drawCart();
  render();
  initializeIcons(document);
}

init();