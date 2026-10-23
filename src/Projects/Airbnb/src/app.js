import { SITE } from "./config/site.js";
import { PRODUCTS, CATEGORIES } from "./data/products.js";
import { PROPERTIES } from "./data/properties.js";
import { esc, formatPrice } from "./lib/format.js";
import { waButton, productMessage, propertyMessage, generalMessage } from "./lib/whatsapp.js";

const app = document.getElementById("app");
const LINKS = [["shop", "Shop"], ["stay", "Stay"], ["about", "About"], ["contact", "Contact"]];
const price = (p) => (p.price == null ? "Price on enquiry" : formatPrice(p.price));
const featuredProperty = () => PROPERTIES.find((p) => p.featured) || PROPERTIES[0];

const media = (img, fallbackAlt, ratio) =>
  `<div class="m" style="aspect-ratio:${ratio}">${
    img?.src
      ? `<img src="${esc(img.src)}" alt="${esc(img.alt || fallbackAlt)}" loading="lazy" onerror="this.outerHTML='<span class=ph>Photo coming soon</span>'">`
      : `<span class="ph">Photo coming soon</span>`
  }</div>`;

const card = (p) =>
  `<a class="card" href="#/shop/${esc(p.slug)}">${media(p.images[0], p.name, "4/5")}<h3>${esc(p.name)}</h3><p class="price">${price(p)}</p><p class="muted small">${esc(p.short)}</p></a>`;

function mount(title, html, dark = false, desc = SITE.tagline) {
  document.title = title === SITE.name ? title : `${title} · ${SITE.name}`;
  document.querySelector('meta[name="description"]').content = desc;
  app.className = dark ? "dark" : "";
  app.innerHTML = html;
  scrollTo(0, 0);
  app.focus({ preventScroll: true });
}

const notFound = () =>
  mount("Not found", `<section class="wrap"><h1>Page not found</h1><p class="row"><a class="btn solid" href="#/shop">Shop</a><a class="btn" href="#/">Home</a></p></section>`);

function home() {
  const feat = PRODUCTS.filter((p) => p.featured).slice(0, 4);
  const stay = featuredProperty();
  mount(SITE.name, `
  <section class="wrap"><p class="eyebrow">${esc(SITE.tagline)}</p><h1>${esc(SITE.heroHeadline)}</h1>
    <p class="lead">${esc(SITE.heroIntro)}</p>
    <p class="row"><a class="btn solid" href="#/shop">Browse the shop</a><a class="btn" href="#/stay">See the stay</a></p></section>
  <section class="wrap"><h2>Featured</h2><div class="grid">${feat.map(card).join("")}</div>
    <p class="row"><a class="btn" href="#/shop">View all products</a></p></section>
  ${stay ? `<section class="dark"><div class="wrap split"><div><p class="eyebrow">The stay</p><h2>${esc(stay.name)}</h2>
    <p>${esc(stay.summary || stay.description)}</p><p class="row"><a class="btn solid" href="#/stay">Explore the stay</a></p></div>
    ${media(stay.images[0], stay.name, "4/3")}</div></section>` : ""}
  <section class="wrap"><h2>About us</h2><p class="lead">${esc(SITE.about[0])}</p>
    <p class="row"><a class="btn" href="#/about">Our story</a>${waButton("Chat on WhatsApp", generalMessage(), "btn solid")}</p></section>`);
}

function shop() {
  let cat = "All", q = "";
  const demoNote = PRODUCTS.some((p) => p.demo) ? `<p class="note">Demo products shown. Replace src/data/products.js with real inventory.</p>` : "";
  mount("Shop", `<section class="wrap"><h1>Shop</h1><p class="lead">Browse the collection and order on WhatsApp.</p>${demoNote}
    <div class="tools"><label class="sr" for="q">Search products</label><input id="q" type="search" placeholder="Search products" autocomplete="off">
    <div class="chips" role="group" aria-label="Filter by category">${["All", ...CATEGORIES].map((c) => `<button type="button" data-cat="${esc(c)}" aria-pressed="${c === "All"}">${esc(c)}</button>`).join("")}</div></div>
    <div id="grid" class="grid" aria-live="polite"></div></section>`, false, "Browse the full product catalog.");
  const grid = app.querySelector("#grid");
  const draw = () => {
    const t = q.trim().toLowerCase();
    const items = PRODUCTS.filter((p) => (cat === "All" || p.category === cat) && (!t || `${p.name} ${p.short} ${p.category}`.toLowerCase().includes(t)));
    grid.innerHTML = items.length ? items.map(card).join("")
      : `<div class="empty"><h2>No matches</h2><p>Try another search or category, or ask us directly.</p>${waButton("Ask on WhatsApp", generalMessage(t ? `Hello ${SITE.name}, do you have: ${q.trim()}?` : undefined), "btn solid")}</div>`;
  };
  app.querySelector("#q").addEventListener("input", (e) => { q = e.target.value; draw(); });
  app.querySelector(".chips").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    cat = b.dataset.cat;
    app.querySelectorAll(".chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    draw();
  });
  draw();
}

function product(slug) {
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return notFound();
  const imgs = p.images.length ? p.images : [null];
  const rel = PRODUCTS.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3);
  const specs = Object.entries(p.attributes || {});
  mount(p.name, `<section class="wrap"><a href="#/shop">&larr; All products</a>
    <div class="pd"><div><div id="main">${media(imgs[0], p.name, "4/5")}</div>
      ${imgs.length > 1 ? `<div class="thumbs">${imgs.map((i, n) => `<button type="button" data-i="${n}" aria-label="Show photo ${n + 1}">${media(i, p.name, "1/1")}</button>`).join("")}</div>` : ""}</div>
    <div><p class="eyebrow">${esc(p.category)}</p><h1>${esc(p.name)}</h1><p class="price big">${price(p)}</p><p>${esc(p.description)}</p>
      ${specs.length ? `<dl>${specs.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
      <p class="row">${waButton("Order on WhatsApp", productMessage(p), "btn solid")}</p>
      <p class="muted small">Opens WhatsApp with a pre-filled message. Nothing is sent until you press send, and availability is confirmed by the seller.</p></div></div>
    ${rel.length ? `<h2>Related</h2><div class="grid">${rel.map(card).join("")}</div>` : ""}</section>`, false, p.short);
  app.querySelectorAll(".thumbs button").forEach((b) => b.addEventListener("click", () => {
    app.querySelector("#main").innerHTML = media(imgs[b.dataset.i], p.name, "4/5");
  }));
}

function stay(slug) {
  const pr = slug ? PROPERTIES.find((x) => x.slug === slug) : featuredProperty();
  if (!pr) return slug ? notFound() : mount("Stay", `<section class="wrap"><h1>The stay</h1><p>Coming soon.</p><a class="btn" href="#/shop">Visit the shop</a></section>`, true);
  const facts = [["guests", "Guests"], ["bedrooms", "Bedrooms"], ["beds", "Beds"], ["bathrooms", "Bathrooms"]].filter(([k]) => pr.facts?.[k] != null);
  const book = pr.airbnbUrl
    ? `<a class="btn solid" href="${esc(pr.airbnbUrl)}" target="_blank" rel="noopener">Book on Airbnb<span class="sr"> (opens Airbnb in a new tab)</span></a>`
    : `<button class="btn solid" type="button" disabled>Booking link not configured</button>`;
  mount(pr.name, `<section class="wrap"><p class="eyebrow">The stay</p><h1>${esc(pr.name)}</h1>${media(pr.images[0], pr.name, "16/9")}
    ${pr.images.length > 1 ? `<div class="gal">${pr.images.slice(1).map((i) => media(i, pr.name, "4/3")).join("")}</div>` : ""}
    <div class="split"><div><p class="lead">${esc(pr.description)}</p>${pr.location ? `<p><strong>Location:</strong> ${esc(pr.location)}</p>` : ""}
      ${facts.length ? `<ul class="facts">${facts.map(([k, l]) => `<li><strong>${pr.facts[k]}</strong> ${l}</li>`).join("")}</ul>` : ""}</div>
      <div><h2>Amenities</h2>${pr.amenities.length ? `<ul class="amen">${pr.amenities.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>` : `<p class="muted">Amenities list to be supplied.</p>`}</div></div>
    <p class="row">${book}${waButton("Ask about the stay", propertyMessage(pr), "btn")}<a class="btn" href="#/shop">Visit the shop</a></p>
    <p class="muted small">Bookings are completed on Airbnb, not on this website.</p></section>`, true, pr.summary || pr.description);
}

function about() {
  mount("About", `<section class="wrap"><h1>About</h1>${SITE.about.map((t) => `<p class="lead">${esc(t)}</p>`).join("")}
    <p class="row"><a class="btn solid" href="#/shop">Shop</a><a class="btn" href="#/stay">The stay</a></p></section>`);
}

function contact() {
  const rows = [
    SITE.phone && [`tel:${SITE.phone.replace(/[^\d+]/g, "")}`, "Call", SITE.phone],
    SITE.email && [`mailto:${SITE.email}`, "Email", SITE.email],
    ...Object.entries(SITE.social).filter(([, u]) => u).map(([k, u]) => [u, k[0].toUpperCase() + k.slice(1), u])
  ].filter(Boolean);
  mount("Contact", `<section class="wrap"><h1>Contact</h1><p class="row">${waButton("Chat on WhatsApp", generalMessage(), "btn solid")}</p>
    ${rows.length ? `<ul>${rows.map(([h, l, t]) => `<li><a href="${esc(h)}"${h.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(l)}: ${esc(t)}</a></li>`).join("")}</ul>` : `<p class="muted">Phone, email and social links not configured yet (src/config/site.js).</p>`}
    ${SITE.location ? `<p>${esc(SITE.location)}</p>` : ""}</section>`);
}

const ROUTES = [[/^\/$/, home], [/^\/shop$/, shop], [/^\/shop\/([\w-]+)$/, product], [/^\/stay(?:\/([\w-]+))?$/, stay], [/^\/about$/, about], [/^\/contact$/, contact]];

const setMenu = (open) => {
  document.querySelector(".hdr").classList.toggle("open", open);
  const b = document.getElementById("navBtn");
  b.setAttribute("aria-expanded", String(open));
  b.textContent = open ? "Close" : "Menu";
};

function route() {
  const path = location.hash.slice(1) || "/";
  setMenu(false);
  document.querySelectorAll("#nav a").forEach((a) => (a.getAttribute("href") === `#/${path.split("/")[1]}` ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current")));
  for (const [re, fn] of ROUTES) { const m = path.match(re); if (m) return fn(...m.slice(1).map((s) => s ?? undefined)); }
  notFound();
}

document.getElementById("hdr").innerHTML = `<header class="hdr"><div class="bar"><a class="brand" href="#/">${esc(SITE.name)}</a>
  <button id="navBtn" class="btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
  <nav id="nav" aria-label="Main">${LINKS.map(([h, t]) => `<a href="#/${h}">${t}</a>`).join("")}</nav></div></header>`;
document.getElementById("ftr").innerHTML = `<div class="wrap"><strong>${esc(SITE.name)}</strong><p>${esc(SITE.tagline)}</p>
  <nav aria-label="Footer">${LINKS.map(([h, t]) => `<a href="#/${h}">${t}</a>`).join("")}</nav>${waButton("Chat on WhatsApp", generalMessage(), "btn")}</div>`;
document.getElementById("navBtn").addEventListener("click", () => setMenu(!document.querySelector(".hdr").classList.contains("open")));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
addEventListener("hashchange", route);
route();