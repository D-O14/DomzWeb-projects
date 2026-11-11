import "./demo.css";
import { Input } from "@components/form/input/input";
import { initializeIcons } from "@assets/Icons/icons";
import { $, parseHTML, initializeActions } from "@utils/DOM.js";

const navdata = {
    brandName: "HarvestHub", logo: "harvestHub",
    links: [
        { anchor: "Home", path: "#/", className: "active" },
        { anchor: "Shop", path: "#/shop" },
        { anchor: "Wholesale", path: "#/wholesale" },
        { anchor: "Delivery", path: "#/delivery" },
        { anchor: "About", path: "#/about" },
    ],
};

const products = [
    {
        id: "goat", name: "Live Goat", category: "livestock", emoji: "🐐", status: "order", featured: true, price: 85000, unit: "animal", minQty: 1,
        description: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
        note: "Sourced after you order. Collection or delivery is arranged with you."
    },
    {
        id: "broiler", name: "Live Broiler Chicken", category: "poultry", emoji: "🐓", featured: true, price: 8500, unit: "bird", min: 1,
        props: [{ maxQty: 50, price: 8000 }], description: "Sample listing for live broilers.", note: "Weight varies by bird."
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
        props: [{ maxQty: 25, price: 2000 }], description: "Sample onions sold by the kilogram.", note: ""
    },
    {
        id: "rice", name: "Rice", category: "grains", emoji: "🍚", featured: true, price: 4000, unit: "kg", minQty: 1,
        props: [{ maxQty: 50, price: 3700 }], description: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
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

const actions = {
    openCart: (element) => { element.nextElementSibling.classList.toggle("on") },
    closeCart: (element) => { element.closest(".cart").classList.remove("on") },
    selectItem: (element) => {
        const checked = element.classList.contains("checked");
        !checked ? element.classList.add("checked") :
            element.classList.remove("checked");
        element.closest(".cart-item").dataset.selected = !checked;
    },
    removeFromCart: (element) => {
        const item = element.closest(".cart-item");
        item.classList.add("deleted");
        inCart = inCart.filter((product) => product.id !== item.dataset.productId);
        item.addEventListener("transitionend", () => { item.remove() });
    },
    increase: (element) => { element.parentElement.querySelector(".q-count").textContent++ },
    decrease: (element) => { element.parentElement.querySelector(".q-count").textContent-- },
};

let inCart = products.slice(2, 8);

function naira(num) { return "₦" + num.toLocaleString("en-NG") };
function media(product) {
    return product.image ? `<img src="${ product.img }" alt="${ product.name }" loading="lazy" />` :
        `<span role="img" aria-label="${ product.name }">${ product.emoji }</span>`;
};

function navbar(navdata) {
    const navigationBar = parseHTML(`<nav class="header-nav">
    <div class="row row-1">
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
    <div class="row row-2">
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
  </nav>`);
    
    navigationBar.querySelector(".row-2").prepend(
        Input({
            id: "searchBar", className: "search-bar", labelClass: "search-field", name: "searched",
            placeholder: "Search the market...", icon: navdata.logo, type: "search"
        })
    );

    return navigationBar;
};

function cart() {
    return parseHTML(`<aside class="cart on">
    <div class="cart-header">
        <h2>
            Your Cart
            <span id="in-cartCount" class="in-cart-count">${ inCart.length }</span>
        </h2>
        <button data-action="closeCart" aria-label="Close your cart">
            <span class="icon close-icon" data-icon="close"></span>
        </button>
    </div>
    <div class="cart-content">
    ${ inCart.map((product) => cartItem(product)).join("") }
    </div>
    <div class="cart-footer">
        <menu class="cart-actions">
            <button class="co-btn">Checkout (${ naira(85000) })</button>
        </menu>
    </div>
</aside>`);
};

function cartItem(product) {
    return `<article class="cart-item" data-product-id="${ product.id }">
<div class="item-header">
    <a class="item-display">
        ${ media(product) }
    </a>
    <span class="item-category">${ product.category }</span>
    <label for="select">
        <span class="item-select" data-action="selectItem" id="${ product.id }"></span>
        <input type="checkbox" class="select">
    </label>
</div>
<div class="item-body">
    <div class="item-specs">
        <h3 class="item-name">
        ${ product.name }
        <small class="item-unit">
            per ${ product.unit } (${ naira(product.price) })
        </small>
        </h3>
        <span class="item-price">
            ${ naira(product.price) }
        </span>
    </div>
    <menu class="item-actions">
        <div class="q-counter">
            <button class="q-count-btn" data-action="decrease" aria-label="decrease quantity">
                <span class="icon minus-icon" data-icon="minus"></span>
            </button>
            <span class="q-count">${ product.minQty }</span>
            <button class="q-count-btn" data-action="increase" aria-label="increase quantity">
                <span class="icon plus-icon" data-icon="plus"></span>
            </button>
        </div>
        <button class="remove-item-btn" data-action="removeFromCart" aria-label="remove item from cart">
            <span class="icon delete-icon" data-icon="delete"></span>
        </button>
    </menu>
</div>
</article>`
};

function renderApp(...components) {
    initializeActions(document, actions);
    $("app").append(...components);
    initializeIcons(document);
};

renderApp(cart());