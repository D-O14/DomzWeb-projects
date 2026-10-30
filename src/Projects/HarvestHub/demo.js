import "./demo.css";
import { query } from "@utils/utilities";
import { initializeIcons } from "@assets/Icons/icons";

const products = [
    {
        id: crypto.randomUUID(), name: "Live Goat", category: "livestock", img: "🐐", status: "order", featured: true, price: 85000, unit: "animal", minimum: 1,
        desc: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
        note: "Sourced after you order. Collection or delivery is arranged with you."
    },
    {
        id: crypto.randomUUID(), name: "Live Broiler Chicken", category: "poultry", img: "🐓", status: "in", featured: true, price: 8500, unit: "bird", minimum: 1,
        props: [{ quantity: 50, price: 8000 }], desc: "Sample listing for live broilers.", note: "Weight varies by bird."
    },
    {
        id: crypto.randomUUID(), name: "Live Local Chicken", category: "poultry", img: "🐔", status: "in", price: 12000, unit: "bird", minimum: 1,
        desc: "Sample listing for live local birds.", note: "Weight varies by bird."
    },
    {
        id: crypto.randomUUID(), name: "Frozen Whole Chicken", category: "frozen", img: "🍗", status: "in", featured: true, price: 6500, unit: "kg", minimum: 1,
        desc: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business."
    },
    {
        id: crypto.randomUUID(), name: "Frozen Chicken Portions", category: "frozen", img: "🍖", status: "out", price: 6000, unit: "kg", minimum: 1,
        desc: "Sample portions.", note: "Shown as unavailable in this demo."
    },
    {
        id: crypto.randomUUID(), name: "Tomatoes", category: "produce", img: "🍅", status: "in", featured: true, price: 35000, unit: "basket", minimum: 1,
        desc: "Sample tomatoes sold by the basket.", note: "Basket sizes vary. Seasonal supply."
    },
    { id: crypto.randomUUID(), name: "Pepper", category: "produce", img: "🌶️", status: "in", price: 3000, unit: "kg", minimum: 1, desc: "Sample pepper sold by the kilogram.", note: "Seasonal supply." },
    {
        id: crypto.randomUUID(), name: "Onions", category: "produce", img: "🧅", status: "in", price: 2200, unit: "kg", minimum: 1,
        props: [{ quantity: 25, price: 2000 }], desc: "Sample onions sold by the kilogram.", note: ""
    },
    {
        id: crypto.randomUUID(), name: "Rice", category: "grains", img: "🍚", status: "in", featured: true, price: 4000, unit: "kg", minimum: 1,
        props: [{ quantity: 50, price: 3700 }], desc: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
    },
    { id: crypto.randomUUID(), name: "Beans", category: "grains", img: "🫘", status: "in", price: 3500, unit: "kg", minimum: 1, desc: "Sample beans sold by the kilogram.", note: "" },
    { id: crypto.randomUUID(), name: "Maize", category: "grains", img: "🌽", status: "in", price: 1800, unit: "kg", minimum: 5, desc: "Sample maize.", note: "Minimumimum order 5 kg." },
    { id: crypto.randomUUID(), name: "Garri", category: "grains", img: "🥣", status: "in", price: 2000, unit: "kg", minimum: 1, desc: "Sample garri sold by the kilogram.", note: "" },
    { id: crypto.randomUUID(), name: "Yam", category: "tubers", img: "🍠", status: "in", featured: true, price: 4500, unit: "tuber", minimum: 1, desc: "Sample yam sold per tuber.", note: "Tuber sizes vary." },
    { id: crypto.randomUUID(), name: "Cassava", category: "tubers", img: "🥔", status: "in", price: 1500, unit: "kg", minimum: 2, desc: "Sample cassava.", note: "Minimumimum order 2 kg." },
    { id: crypto.randomUUID(), name: "Plantain", category: "fruits", img: "🍌", status: "in", price: 3000, unit: "bunch", minimum: 1, desc: "Sample plantain sold per bunch.", note: "Bunch sizes vary." },
    { id: crypto.randomUUID(), name: "Rice, Bulk Sack", category: "bulk", img: "🌾", status: "in", price: 190000, unit: "sack", minimum: 1, desc: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business." },
];


const naira = (num) => "₦" + num.toLocaleString("en-NG");

function stock(p) {
    const map = { in: ["in", "Available"], out: ["out", "Currently unavailable"], order: ["order", "Made to order"] };
    return `<span class="st st--${ map[p.status][0] }">${ map[p.status][1] }</span>`;
}

function media(p) {
    return p.image ? `<img src="${ p.image }" alt="${ p.name }" loading="lazy" />` :
        `<span role="img" class="img" aria-label="${ p.name }">${ p.img }</span>`;
}

function productCard(product) {
    return `<article class="product-card">
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
        </article>`
}

function renderApp() {
    const featured = products.filter((product) => product.featured);
    return featured.map((product) => productCard(product)).join("");
};

//query(document, "#app").innerHTML = renderApp();
initializeIcons(document);