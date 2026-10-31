import "./demo.css";
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


const order = {
  featured: (a, b) => Number(!!b.featured) - Number(!!a.featured),
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

function query(selector) { return document.querySelector(selector) };
initializeIcons(document);