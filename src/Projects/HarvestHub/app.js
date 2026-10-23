/* HarvestHub v2 (front-end stage, demo data)
   Prices are whole naira. The backend stage will move products,
   zones and settings into the database and recalculate totals on the server. */

/* ---------- CONFIG: replace with real details ---------- */
const CONFIG = {
  announcement: "Retail and bulk supply for households and food businesses in Benin City.",
  whatsapp: "2340000000000",
  email: "orders@example.com",
  phone: "+234 000 000 0000",
  address: "Sample address, Benin City, Edo State",
  collectionEnabled: true,
  zones: [
    { id: "central", name: "Benin City: central areas", fee: 2500, minOrder: 5000, window: "Timing confirmed after you order" },
    { id: "outer", name: "Benin City: outer areas", fee: 4500, minOrder: 10000, window: "Timing confirmed after you order" },
  ],
};

/* ---------- DATA ---------- */
const CATEGORIES = [
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
const PRODUCTS = [
  { id: "goat", name: "Live Goat", cat: "livestock", emoji: "🐐", status: "order", feat: true, price: 85000, unit: "animal", min: 1,
    desc: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
    note: "Sourced after you order. Collection or delivery is arranged with you." },
  { id: "broiler", name: "Live Broiler Chicken", cat: "poultry", emoji: "🐓", status: "in", feat: true, price: 8500, unit: "bird", min: 1,
    tiers: [{ qty: 50, price: 8000 }], desc: "Sample listing for live broilers.", note: "Weight varies by bird." },
  { id: "local-chicken", name: "Live Local Chicken", cat: "poultry", emoji: "🐔", status: "in", price: 12000, unit: "bird", min: 1,
    desc: "Sample listing for live local birds.", note: "Weight varies by bird." },
  { id: "frozen-whole", name: "Frozen Whole Chicken", cat: "frozen", emoji: "🍗", status: "in", feat: true, price: 6500, unit: "kg", min: 1,
    desc: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business." },
  { id: "frozen-portions", name: "Frozen Chicken Portions", cat: "frozen", emoji: "🍖", status: "out", price: 6000, unit: "kg", min: 1,
    desc: "Sample portions.", note: "Shown as unavailable in this demo." },
  { id: "tomatoes", name: "Tomatoes", cat: "produce", emoji: "🍅", status: "in", feat: true, price: 35000, unit: "basket", min: 1,
    desc: "Sample tomatoes sold by the basket.", note: "Basket sizes vary. Seasonal supply." },
  { id: "pepper", name: "Pepper", cat: "produce", emoji: "🌶️", status: "in", price: 3000, unit: "kg", min: 1, desc: "Sample pepper sold by the kilogram.", note: "Seasonal supply." },
  { id: "onions", name: "Onions", cat: "produce", emoji: "🧅", status: "in", price: 2200, unit: "kg", min: 1,
    tiers: [{ qty: 25, price: 2000 }], desc: "Sample onions sold by the kilogram.", note: "" },
  { id: "rice", name: "Rice", cat: "grains", emoji: "🍚", status: "in", feat: true, price: 4000, unit: "kg", min: 1,
    tiers: [{ qty: 50, price: 3700 }], desc: "Sample rice. Larger quantities have a lower per-kilogram price.", note: "" },
  { id: "beans", name: "Beans", cat: "grains", emoji: "🫘", status: "in", price: 3500, unit: "kg", min: 1, desc: "Sample beans sold by the kilogram.", note: "" },
  { id: "maize", name: "Maize", cat: "grains", emoji: "🌽", status: "in", price: 1800, unit: "kg", min: 5, desc: "Sample maize.", note: "Minimum order 5 kg." },
  { id: "garri", name: "Garri", cat: "grains", emoji: "🥣", status: "in", price: 2000, unit: "kg", min: 1, desc: "Sample garri sold by the kilogram.", note: "" },
  { id: "yam", name: "Yam", cat: "tubers", emoji: "🍠", status: "in", feat: true, price: 4500, unit: "tuber", min: 1, desc: "Sample yam sold per tuber.", note: "Tuber sizes vary." },
  { id: "cassava", name: "Cassava", cat: "tubers", emoji: "🥔", status: "in", price: 1500, unit: "kg", min: 2, desc: "Sample cassava.", note: "Minimum order 2 kg." },
  { id: "plantain", name: "Plantain", cat: "fruits", emoji: "🍌", status: "in", price: 3000, unit: "bunch", min: 1, desc: "Sample plantain sold per bunch.", note: "Bunch sizes vary." },
  { id: "bulk-rice", name: "Rice, Bulk Sack", cat: "bulk", emoji: "🌾", status: "in", price: 190000, unit: "sack", min: 1, desc: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business." },
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

const $ = (id) => document.getElementById(id);
const naira = (n) => "₦" + n.toLocaleString("en-NG");
const product = (id) => PRODUCTS.find((p) => p.id === id);

// Best matching quantity tier, or the base price.
function unitPrice(p, qty) {
  const tier = (p.tiers || []).filter((t) => qty >= t.qty).sort((a, b) => b.qty - a.qty)[0];
  return tier ? tier.price : p.price;
}

function lines() {
  return cart
    .map((c) => {
      const p = product(c.id);
      if (!p) return null;
      const price = unitPrice(p, c.qty);
      return { p, qty: c.qty, price, total: price * c.qty };
    })
    .filter(Boolean);
}

const subtotal = () => lines().reduce((sum, l) => sum + l.total, 0);

function addItem(id, qty) {
  const p = product(id);
  const entry = cart.find((c) => c.id === id);
  const next = (entry ? entry.qty : 0) + qty;
  if (next < p.min) return toast(`Minimum order for ${p.name} is ${p.min} ${p.unit}.`);
  if (entry) entry.qty = next;
  else cart.push({ id, qty: next });
  save();
  drawCart();
  toast("Added to cart");
}

function setQty(id, delta) {
  const entry = cart.find((c) => c.id === id);
  if (!entry) return;
  const next = entry.qty + delta;
  if (next < product(id).min) cart = cart.filter((c) => c.id !== id);
  else entry.qty = next;
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
const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function feeFor(fulfilment, zoneId) {
  if (fulfilment === "Collection") return 0;
  const zone = CONFIG.zones.find((z) => z.id === zoneId);
  return zone ? zone.fee : null;
}

function orderText(c, fee) {
  const rows = lines().map((l) => `- ${l.p.name}: ${l.qty} ${l.p.unit} @ ${naira(l.price)} = ${naira(l.total)}`);
  const sub = subtotal();
  return [
    "HARVESTHUB ORDER REQUEST", "",
    `Name: ${c.name}`, `Phone: ${c.phone}`, `Fulfilment: ${c.fulfilment}`,
    `Address: ${c.address || "N/A"}, ${c.city} ${c.state}`, "",
    "Items:", ...rows, "",
    `Subtotal: ${naira(sub)}`, `Delivery: ${naira(fee)}`, `Estimated total: ${naira(sub + fee)}`,
    "Final prices, stock and delivery are confirmed by HarvestHub.", "",
    `Notes: ${c.notes || "None"}`,
  ].join("\n");
}

/* ---------- VIEWS ---------- */
const app = $("app");

function stock(p) {
  const map = { in: ["in", "Available"], out: ["out", "Currently unavailable"], order: ["order", "Made to order"] };
  return `<span class="st st--${map[p.status][0]}">${map[p.status][1]}</span>`;
}

function media(p) {
  return p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" />` : `<span role="img" aria-label="${p.name}">${p.emoji}</span>`;
}

function card(p) {
  return `
    <article class="card">
      <a class="card__img" href="#/product/${p.id}">${media(p)}${p.tiers ? '<span class="tag">Bulk prices</span>' : ""}</a>
      <div class="card__body">
        <h3><a href="#/product/${p.id}">${p.name}</a></h3>
        <div class="price">${naira(p.price)} <small>per ${p.unit}</small></div>
        ${stock(p)}
        <div class="card__act">
          <button class="btn btn--forest" data-act="add" data-id="${p.id}" ${p.status === "out" ? "disabled" : ""}>Add</button>
          <a class="btn btn--line" href="#/product/${p.id}">Details</a>
        </div>
      </div>
    </article>`;
}

function home() {
  const board = PRODUCTS.filter((p) => p.feat).slice(0, 6);
  const count = (id) => PRODUCTS.filter((p) => p.cat === id).length;

  return `
    <section class="hero">
      <div class="wrap hero__in">
        <div>
          <h1>The whole market, in one basket.</h1>
          <p>Livestock, poultry, frozen foods, produce and staples, organised in one catalogue. Order for your household, or request bulk supply for your business.</p>
          <div class="hero__act">
            <a class="btn" href="#/shop">Start shopping</a>
            <a class="btn btn--line" href="#/wholesale">Bulk supply for business</a>
          </div>
        </div>
        <div class="board">
          <h3>On the price board</h3>
          ${board.map((p) => `<a href="#/product/${p.id}"><span>${p.name}<small>per ${p.unit}</small></span><b>${naira(p.price)}</b></a>`).join("")}
          <p class="board__note">Sample prices for demonstration, not current market prices.</p>
        </div>
      </div>
    </section>

    <section class="sec wrap">
      <h2>Browse by section</h2>
      <div class="index">
        ${CATEGORIES.map((c) => `<a href="#/shop?cat=${c.id}">${c.name}<span>${count(c.id)} items</span></a>`).join("")}
      </div>
    </section>

    <section class="sec wrap">
      <h2>Featured this week</h2>
      <div class="grid">${PRODUCTS.filter((p) => p.feat).map(card).join("")}</div>
    </section>

    <section class="paths">
      <div class="path path--home">
        <h2>For your household</h2>
        <p>Order by the animal, bird, kilogram, basket or bunch. Each product shows exactly how it is sold.</p>
        <a class="btn btn--forest" href="#/shop">Shop for home</a>
      </div>
      <div class="path path--bulk">
        <h2>For restaurants and retailers</h2>
        <p>Ask for larger quantities and a quotation. Quantity prices are set product by product.</p>
        <a class="btn" href="#/wholesale">Request bulk supply</a>
      </div>
    </section>

    <section class="sec wrap">
      <h2>How ordering works</h2>
      <div class="steps">
        <div><h3>Choose</h3>Add products and quantities to your cart.</div>
        <div><h3>Send your order</h3>Share it on WhatsApp or by email. This submits a request only.</div>
        <div><h3>We confirm</h3>HarvestHub confirms stock, final price, payment and delivery or collection with you.</div>
      </div>
    </section>`;
}

function shop(params) {
  const cats = CATEGORIES.map((c) => `<option value="${c.id}" ${params.get("cat") === c.id ? "selected" : ""}>${c.name}</option>`).join("");

  app.innerHTML = `
    <section class="sec wrap">
      <h1>Shop</h1>
      <div class="bar2">
        <input id="fQ" type="search" placeholder="Search" value="${params.get("q") || ""}" aria-label="Search" />
        <select id="fCat" aria-label="Category"><option value="">All sections</option>${cats}</select>
        <input id="fMax" type="number" min="0" placeholder="Max price (₦)" aria-label="Maximum price" />
        <select id="fSort" aria-label="Sort"><option value="feat">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select>
        <label><input id="fIn" type="checkbox" /> Available only</label>
      </div>
      <div class="grid" id="results"></div>
    </section>`;

  document.querySelector(".bar2").addEventListener("input", drawResults);
  drawResults();
}

function drawResults() {
  const q = $("fQ").value.trim().toLowerCase();
  const cat = $("fCat").value;
  const max = parseFloat($("fMax").value);
  const sort = $("fSort").value;
  const onlyIn = $("fIn").checked;

  const list = PRODUCTS.filter((p) => {
    if (q && !(p.name + " " + p.desc).toLowerCase().includes(q)) return false;
    if (cat && p.cat !== cat) return false;
    if (!isNaN(max) && p.price > max) return false;
    if (onlyIn && p.status === "out") return false;
    return true;
  });

  const order = {
    feat: (a, b) => Number(!!b.feat) - Number(!!a.feat),
    low: (a, b) => a.price - b.price,
    high: (a, b) => b.price - a.price,
    name: (a, b) => a.name.localeCompare(b.name),
  };

  $("results").innerHTML = list.sort(order[sort]).map(card).join("") || `<div class="empty">Nothing matches. Try clearing a filter.</div>`;
}

function pdp(id) {
  const p = product(id);
  if (!p) return `<section class="sec wrap empty"><h1>Product not found</h1><a class="btn" href="#/shop">Back to shop</a></section>`;

  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const tiers = p.tiers ? `<ul class="tiers">${p.tiers.map((t) => `<li>${t.qty}+ ${p.unit}: ${naira(t.price)} per ${p.unit}</li>`).join("")}</ul>` : "";
  const ask = waLink(`Hello HarvestHub, I have a question about: ${p.name}`);

  return `
    <section class="sec wrap">
      <div class="pdp">
        <div class="pdp__img">${media(p)}</div>
        <div>
          <h1>${p.name}</h1>
          <div class="price">${naira(p.price)} <small>per ${p.unit}</small></div>
          ${tiers}${stock(p)}
          <p>${p.desc}</p>
          <p>Minimum order: ${p.min} ${p.unit}</p>
          <div class="qty"><button data-act="pq" data-d="-1" aria-label="Decrease">−</button><span id="pq" data-min="${p.min}">${p.min}</span><button data-act="pq" data-d="1" aria-label="Increase">+</button></div>
          <div class="row">
            <button class="btn btn--forest" data-act="add-pdp" data-id="${p.id}" ${p.status === "out" ? "disabled" : ""}>Add to cart</button>
            <button class="btn" data-act="buy" data-id="${p.id}" ${p.status === "out" ? "disabled" : ""}>Buy now</button>
            <a class="btn btn--wa" href="${ask}" target="_blank" rel="noopener">Ask on WhatsApp</a>
          </div>
          ${p.note ? `<div class="note">${p.note}</div>` : ""}
        </div>
      </div>
    </section>
    ${related.length ? `<section class="sec wrap"><h2>More in this section</h2><div class="grid">${related.map(card).join("")}</div></section>` : ""}`;
}

function field(id, label, type = "text", cls = "") {
  return `<div class="fld ${cls}"><label for="${id}">${label}</label><input id="${id}" type="${type}" /><span class="err" id="e-${id}"></span></div>`;
}

function checkout() {
  const ls = lines();
  if (!ls.length) return `<section class="sec wrap empty"><h1>Your cart is empty</h1><a class="btn" href="#/shop">Browse products</a></section>`;

  const zones = CONFIG.zones.map((z) => `<option value="${z.id}">${z.name} (${naira(z.fee)})</option>`).join("");
  const sub = subtotal();

  return `
    <section class="sec wrap">
      <h1>Checkout</h1>
      <div class="co">
        <form id="coForm" novalidate>
          <div class="two">
            ${field("name", "Full name", "text", "full")}
            ${field("phone", "Phone number", "tel")}
            ${field("email", "Email (optional)", "email")}
            <div class="fld"><label for="ful">Fulfilment</label><select id="ful"><option>Delivery</option>${CONFIG.collectionEnabled ? "<option>Collection</option>" : ""}</select></div>
            <div class="fld"><label for="zone">Delivery area</label><select id="zone">${zones}</select></div>
            ${field("city", "City or town")}
            ${field("state", "State")}
            ${field("address", "Delivery address", "text", "full")}
            <div class="fld full"><label for="notes">Notes (optional)</label><textarea id="notes" rows="3"></textarea></div>
          </div>
          <div class="note">Sending on WhatsApp or email submits an order request only. HarvestHub confirms stock, final price, payment and delivery with you. Online payment arrives with the backend stage.</div>
          <div class="row">
            <button type="button" class="btn btn--wa" data-act="send-wa">Send order on WhatsApp</button>
            <button type="button" class="btn btn--forest" data-act="send-mail">Send order by email</button>
          </div>
        </form>
        <aside class="box">
          <h3>Order summary</h3>
          ${ls.map((l) => `<div class="ln"><span>${l.p.name} (${l.qty} ${l.p.unit})</span><span>${naira(l.total)}</span></div>`).join("")}
          <div class="ln"><span>Subtotal</span><span>${naira(sub)}</span></div>
          <div class="ln ln--t"><span>Delivery fee and total</span><span>shown in your message</span></div>
        </aside>
      </div>
    </section>`;
}

function wholesale() {
  return `
    <section class="sec wrap">
      <h1>Bulk supply for businesses</h1>
      <p>For restaurants, caterers, retailers and hotels. Tell us what you need and we will reply with a quotation. Quantity prices are agreed product by product.</p>
      <form id="wsForm" class="box" novalidate>
        <div class="two">
          ${field("wb", "Business name")}
          ${field("wc", "Contact person")}
          ${field("wp", "Phone number", "tel")}
          ${field("wl", "Delivery location")}
          ${field("wd", "Needed by (date)", "date")}
          <div class="fld full"><label for="wn">Products and quantities</label><textarea id="wn" rows="4" placeholder="Example: 200 kg rice, 40 broilers"></textarea><span class="err" id="e-wn"></span></div>
        </div>
        <button type="button" class="btn btn--wa" data-act="send-ws">Send enquiry on WhatsApp</button>
        <p class="note">Opening WhatsApp does not send the message until you press send. A quotation is not an order.</p>
      </form>
    </section>`;
}

function delivery() {
  return `
    <section class="sec wrap">
      <h1>Delivery and collection</h1>
      <p>Delivery areas and fees are set by the business and shown at checkout.</p>
      ${CONFIG.zones.map((z) => `<div class="ln"><span>${z.name}<br /><small>Minimum order ${naira(z.minOrder)}. ${z.window}.</small></span><b>${naira(z.fee)}</b></div>`).join("")}
      <div class="note">Livestock and frozen goods may need special arrangements, which are explained on each product. Outside these areas, send a WhatsApp enquiry for a quotation.</div>
    </section>`;
}

function info(title) {
  return `<section class="sec wrap"><h1>${title}</h1><p>Replace with the business's own text: who HarvestHub is, privacy, terms, and the returns, refunds and cancellation policy.</p><p>${CONFIG.phone}<br />${CONFIG.email}<br />${CONFIG.address}</p></section>`;
}

/* ---------- CART DRAWER, TOAST ---------- */
function drawCart() {
  const ls = lines();
  $("count").textContent = ls.reduce((n, l) => n + l.qty, 0);

  $("dBody").innerHTML = ls.length
    ? ls.map((l) => `
        <div class="item">
          <strong>${l.p.name}</strong><span>${naira(l.total)}</span>
          <small>${naira(l.price)} per ${l.p.unit}</small><span></span>
          <div class="qty"><button data-act="dec" data-id="${l.p.id}" aria-label="Decrease">−</button><span>${l.qty}</span><button data-act="inc" data-id="${l.p.id}" aria-label="Increase">+</button></div>
          <button class="lnk" data-act="del" data-id="${l.p.id}">Remove</button>
        </div>`).join("")
    : `<div class="empty">Your cart is empty.</div>`;

  $("dFoot").innerHTML = ls.length
    ? `<div class="ln ln--t"><span>Subtotal</span><span>${naira(subtotal())}</span></div><p><small>Delivery is added at checkout.</small></p><a class="btn btn--forest" style="display:block;text-align:center" href="#/checkout" data-act="close">Checkout</a>`
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

  $("nav").classList.remove("on");
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
  const zone = CONFIG.zones.find((z) => z.id === val("zone"));
  if (delivering && subtotal() < zone.minOrder) return toast(`Minimum order for this area is ${naira(zone.minOrder)}.`);

  const text = orderText({ name: val("name"), phone: val("phone"), fulfilment: val("ful"), address: val("address"), city: val("city"), state: val("state"), notes: val("notes") }, fee);

  if (channel === "wa") {
    window.open(waLink(text), "_blank", "noopener");
    toast("WhatsApp opened. Press send there to submit your request.");
  } else {
    location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("HarvestHub order request")}&body=${encodeURIComponent(text)}`;
    toast("Your email app should open. Press send to submit your request.");
  }
}

function sendEnquiry() {
  const ok = check([
    ["wb", filled, "Enter your business name."],
    ["wc", filled, "Enter a contact name."],
    ["wp", phoneOk, "Enter a valid phone number."],
    ["wl", filled, "Enter the delivery location."],
    ["wn", filled, "Tell us what you need."],
  ]);
  if (!ok) return toast("Please fix the highlighted fields.");

  const v = (id) => $(id).value.trim();
  const text = ["HARVESTHUB BULK ENQUIRY", "", `Business: ${v("wb")}`, `Contact: ${v("wc")}`, `Phone: ${v("wp")}`, `Location: ${v("wl")}`, `Needed by: ${v("wd") || "Not stated"}`, "", `Request: ${v("wn")}`].join("\n");
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
  buy: (el) => { addItem(el.dataset.id, pq()); location.hash = "#/checkout"; },
  pq: (el) => { const min = parseInt($("pq").dataset.min, 10); $("pq").textContent = Math.max(min, pq() + parseInt(el.dataset.d, 10)); },
  inc: (el) => setQty(el.dataset.id, 1),
  dec: (el) => setQty(el.dataset.id, -1),
  del: (el) => removeItem(el.dataset.id),
  "send-wa": () => sendOrder("wa"),
  "send-mail": () => sendOrder("mail"),
  "send-ws": sendEnquiry,
};

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (el && acts[el.dataset.act]) acts[el.dataset.act](el);
});

$("find").addEventListener("submit", (e) => {
  e.preventDefault();
  location.hash = `#/shop?q=${encodeURIComponent($("findInput").value.trim())}`;
});

window.addEventListener("hashchange", render);

function init() {
  $("bar").textContent = CONFIG.announcement;
  $("wa").href = waLink("Hello HarvestHub, I would like to place an order.");
  $("names").innerHTML = PRODUCTS.map((p) => `<option value="${p.name}">`).join("");
  $("footAddr").textContent = CONFIG.address;
  $("footCats").innerHTML = CATEGORIES.slice(0, 6).map((c) => `<a href="#/shop?cat=${c.id}">${c.name}</a>`).join("");
  $("footContact").innerHTML = `<a href="${waLink("Hello HarvestHub")}" target="_blank" rel="noopener">WhatsApp</a><a href="mailto:${CONFIG.email}">${CONFIG.email}</a><span>${CONFIG.phone}</span>`;
  drawCart();
  render();
}

init();