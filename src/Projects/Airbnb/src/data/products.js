/**
 * @typedef {Object} Product
 * @property {string} id            stable unique id
 * @property {string} slug          URL-safe: letters, digits, - _
 * @property {string} name
 * @property {string} category
 * @property {number|null} price    null => "Price on enquiry"
 * @property {string} short
 * @property {string} description
 * @property {{src:string,alt:string}[]} images   [] => placeholder shown
 * @property {Record<string,string>} attributes   shown as specs
 * @property {boolean} featured
 * @property {boolean} published
 * @property {boolean} [demo]       remove on real items; hides the demo notice
 * FUTURE: replace RAW with a fetch() to a CMS/DB; keep the validation below.
 */
const demo = (n, category, featured) => ({
  id: `demo-${n}`, slug: `sample-product-${n}`, name: `Sample product ${n}`, category, price: null,
  short: "Demo item. Replace with real inventory.",
  description: "Demo description. Replace this with the real product description.",
  images: [], attributes: {}, featured, published: true, demo: true
});

const RAW = [demo(1, "Category A", true), demo(2, "Category A", true), demo(3, "Category B", true), demo(4, "Category B", false)];

const REQUIRED = ["id", "slug", "name", "category", "short", "description"];
const isValid = (p) =>
  REQUIRED.every((k) => typeof p[k] === "string" && p[k]) &&
  /^[\w-]+$/.test(p.slug) &&
  (p.price === null || Number.isFinite(p.price)) &&
  Array.isArray(p.images);

export const PRODUCTS = RAW.filter((p) => {
  if (!isValid(p)) { console.warn("[products] skipped invalid product:", p?.id ?? p); return false; }
  return p.published;
});
export const CATEGORIES = [...new Set(PRODUCTS.map((p) => p.category))];