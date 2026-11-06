import { config } from "./config.js";

function $(id) { return document.getElementById(id) };

export const helpers = {
    filled: (v) => v.length > 0,
    v: (id) => $(id).value.trim(),
    pq: () => parseInt($("pq").textContent, 10),
    phoneOk: (v) => /^[0-9+\s-]{10,16}$/.test(v),
    naira: (num) => "₦" + num.toLocaleString("en-NG"),
    product: (id) => config.products.find((p) => p.id === id),
    waLink: (text) => `https://wa.me/${ config.whatsapp }?text=${ encodeURIComponent(text) }`,
    media: (product) => {
        return product.image ? `<img src="${ product.img }" alt="${ product.name }" loading="lazy" />` :
            `<span role="img" aria-label="${ product.name }">${ product.emoji }</span>`
    },
};