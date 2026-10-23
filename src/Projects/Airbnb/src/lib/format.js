import { SITE } from "../config/site.js";

export const esc = (v) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

export const formatPrice = (n) =>
  new Intl.NumberFormat(SITE.locale, { style: "currency", currency: SITE.currency, maximumFractionDigits: 0 }).format(n);