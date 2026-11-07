import "./demo.css";
import { initializeIcons } from "@assets/Icons/icons";

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

let timer;
let inCart = products.slice(2, 8);

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

document.addEventListener("click", (e) => {
    const element = e.target.closest("[data-action]");
    if (element && actions[element.dataset.action]) { actions[element.dataset.action](element) };
});

function $(id) { return document.getElementById(id) };
function naira(num) { return "₦" + num.toLocaleString("en-NG") };
function create(element) { return document.createElement(element) };
function query(selector) { return document.querySelector(selector) };
function media(product) {
    return product.image ? `<img src="${ product.img }" alt="${ product.name }" loading="lazy" />` :
        `<span role="img" aria-label="${ product.name }">${ product.emoji }</span>`;
};

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

function parseHTML(markup) {
    const template = create("template");
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
};

function input(config = {}) {
    const field = parseHTML(`<label for="${ config.id }" class="${ config.labelClass ?? "" }">
          ${ config.label ?? "" }
          <span class="icon ${config.icon}-icon" data-icon="${ config.icon ?? "caret" }"></span>
          <input ${ config.value ? `value="${ config.value }"` : "" } type="${ config.type ?? "text" }" placeholder="${ config.placeholder ?? "input here" }" id="${ config.id }" 
          ${ config.name ? `name="${ config.name }"` : "" } class="${ config.className }"  ${ config.required ? "required" : "" } 
          ${ config.attributes ? config.attributes.map(attr => { return attr }).join(" ") : "" }>
          ${ config.required ? `<span class="error" id="error-${ config.id }" aria-live="polite"></span>` : "" }
      </label>`);

    function attachEvents(element, events = {}) {
        for (const [eventName, handler] of Object.entries(events)) {
            if (typeof handler !== "function") continue;
            element.addEventListener(eventName, handler);
        };
    };

    const inputElement = field.querySelector("input");
    attachEvents(inputElement, config.events);

    return {
        element: field,
        input: inputElement,

        update(newProps = {}) { 

        }
    };
};

function searchFilter() {
    const wrapper = parseHTML(`<div class="search-filter">
    <div class="filter">
        <button class="filter-btn" data-action="filter" aria-label="activate filter menu">
            <span class="icon filter-icon" data-icon="filter"></span>
        </button>
    </div>
    </div>`);
    wrapper.prepend(input({
        id: "searchbar",
        type: "search",
        icon: "search",
        className: "searchbar",
        iconClass: "plant-icon",
        labelClass: "search-field",
        placeholder: "Search The Market...",
        events: {
            update: () => {
                const searched = searchItems({
                    input: wrapper.querySelector("input[type='search']"),
                    items: [...products],
                    property: "name",
                })
                searched.length === 0 ? console.log("no results") : renderProducts(searched);
            }
        },
    }));

    return wrapper;
};

function renderProducts(products) {
    if (products.length === 0) {
        throw new Error("No Products Found!");
    } else {
        products.forEach(product => { console.log(product.name) });
    };
};

function searchItems({ input, items, property }) {
    const query = input.value.toLowerCase().trim();
    const searched = items.filter(item => {
        const field = item[property];
        return typeof field && field.includes(query);
    });
    return searched;
};

function cartItem(product) {
    return `<article class="cart-item" data-product-id="${ product.id }">
<div class="item-header">
    <a class="item-display">
        <span class="item-img" role="img" aria-label="${ product.name }">${ product.emoji }</span>
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

function cart() {
    return `<aside class="cart on">
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
</aside>`
};

function toast({ ...notif }) {
    const state = {
        timerId: null,
        duration: notif.duration ?? 2000,
    };
    const toast = parseHTML(`<div class="toast" id="toast" role="status" aria-live="polite">
        <span class="icon toast-icon" data-icon="check"></span>
        <p class="content">${ notif.content }</p>
    </div>`);

    return {
        toast,
        notify() {
            toast.classList.add("notify");
            clearTimeout(state.timerId);
            state.timerId = setTimeout(() => { toast.classList.remove("notify") }, state.duration);
          },

        destroy() {
            clearTimeout(state.timerId);
            toast.classList.remove("notify");
            toast.remove();
          }
    };
};

function renderApp(...components) {
    const app = query("main");
    const view = components;
    if (typeof view === "string") { app.innerHTML = view }
    else if (view instanceof Node) { app.replaceChildren(view) }
    else { throw new TypeError(`Invalid Element: "${ view }". Expected an HTML string or DOM Node, received ${ view }.`) };
};

const notif = toast({ content: "Added to cart!", duration: 2000 });
const inputField = input({
    id: "searchbar",
    type: "search",
    className: "searchbar",
    labelClass: "search-field",
    placeholder: "Search your items...",
    events: {
        input: (event) => {
            const searched = searchItems({
                input: event.currentTarget,
                items: [...products],
                property: "name",
            })
            searched.length === 0 ? console.log("no results") : renderProducts(searched);
        }
    },
});

query("button").addEventListener("click", () => { notif.notify() });
query("main").append(inputField.element);
initializeIcons(document);

/*I think it's okay if I exposed the element for a toast component, but the input is better left isolated, while
the update function alone can be returned as an object. The component already had the ability to be assigned to
a constant, so I can just do that, but I want to be able to preserve the ability of the component to simply
render in innerHTML, or when appended. I also want it to be that the lifecycle functions can be used directly in
the configuration of the element instead of just as an external API.*/