import { SITE } from "../config/site.js";
import { esc, formatPrice } from "./format.js";

// Returns clean international digits, or null if missing/placeholder/invalid.
export function waNumber() {
  const d = String(SITE.whatsappNumber || "").replace(/\D/g, "");
  return d.length >= 8 && d.length <= 15 && !d.startsWith("0") ? d : null;
}

export function waLink(message = "") {
  const n = waNumber();
  if (!n) { console.warn("[whatsapp] SITE.whatsappNumber is not configured (src/config/site.js)."); return null; }
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export const generalMessage = (custom) => custom || `Hello ${SITE.name}, I have a question.`;

export const productMessage = (p) =>
  [
    `Hello ${SITE.name}, I'd like to enquire about: ${p.name}`,
    p.price != null ? `Listed price: ${formatPrice(p.price)}` : "Price: please confirm",
    `Link: ${location.href.split("#")[0]}#/shop/${p.slug}`
  ].join("\n");

export const propertyMessage = (pr) => `Hello ${SITE.name}, I have a question about the stay: ${pr.name}.`;

// The user must still press send in WhatsApp; nothing is sent automatically.
export function waButton(label, message, cls = "btn") {
  const href = waLink(message);
  return href
    ? `<a class="${cls}" href="${esc(href)}" target="_blank" rel="noopener" aria-label="${esc(label)} (opens WhatsApp)">${esc(label)}</a>`
    : `<button class="${cls}" type="button" disabled title="WhatsApp number not configured">${esc(label)} (unavailable)</button>`;
}