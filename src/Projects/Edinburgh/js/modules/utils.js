/*
  SHARED HELPERS
  Small functions used by several modules: safe text handling, apartment data
  loading, URL building, icons, scroll reveal and SEO tags.
*/

import { siteConfig } from '../config.js';
import { apartments as rawApartments } from '../data/apartments.js';


/* ---------- Text helpers ---------- */

// Escapes text before it is placed inside HTML, so data can never break the page.
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Returns trimmed text. null, undefined and the literal words "undefined"/"null" become "".
export function cleanText(value) {
  if (value === null || value === undefined) return '';
  const text = String(value).trim();
  return text === 'undefined' || text === 'null' ? '' : text;
}

export function toPositiveNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : null;
}

// pluralize(2, "bedroom") -> "2 bedrooms"
export function pluralize(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function cleanList(value) {
  return Array.isArray(value) ? value.map(cleanText).filter(Boolean) : [];
}

// Returns the URL only if it is a valid https:// address, otherwise "".
export function getSafeHttpsUrl(value) {
  const text = cleanText(value);
  if (!text) return '';
  try {
    const url = new URL(text);
    return url.protocol === 'https:' ? url.href : '';
  } catch {
    return '';
  }
}

/* ---------- Apartment data ---------- */

// Reads js/data/apartments.js and returns clean, consistent records.
// Records without a slug (or with a duplicate slug) are skipped with a console warning.
export function getApartments() {
  const seen = new Set();
  const result = [];
  const list = Array.isArray(rawApartments) ? rawApartments : [];

  list.forEach((raw, index) => {
    if (!raw || typeof raw !== 'object') return;

    const slug = cleanText(raw.slug).toLowerCase();
    if (!slug) {
      console.warn(`[apartments.js] Record #${index + 1} has no slug and was skipped.`);
      return;
    }
    if (seen.has(slug)) {
      console.warn(`[apartments.js] Duplicate slug "${slug}" was skipped. Every slug must be unique.`);
      return;
    }
    seen.add(slug);

    const name = cleanText(raw.name);
    const price = raw.price === null || raw.price === '' ? NaN : Number(raw.price);

    result.push({
      id: cleanText(raw.id) || slug,
      slug,
      name,
      displayName: name || 'Apartment',
      location: cleanText(raw.location),
      price: Number.isFinite(price) ? price : null,
      priceDisplay: cleanText(raw.priceDisplay),
      bedrooms: toPositiveNumber(raw.bedrooms),
      bathrooms: toPositiveNumber(raw.bathrooms),
      maxGuests: toPositiveNumber(raw.maxGuests),
      description: cleanText(raw.description),
      amenities: cleanList(raw.amenities),
      houseRules: cleanList(raw.houseRules),
      checkInInfo: cleanText(raw.checkInInfo),
      images: Array.isArray(raw.images) ? raw.images : [],
      coverImage: cleanText(raw.coverImage),
      airbnbUrl: cleanText(raw.airbnbUrl),
      featured: raw.featured === true,
      isPlaceholder: raw.isPlaceholder === true
    });
  });

  return result;
}

export function getApartmentBySlug(slug) {
  const wanted = cleanText(slug).toLowerCase();
  if (!wanted) return null;
  return getApartments().find((apartment) => apartment.slug === wanted) || null;
}

// Relative link to an apartment's detail page: apartment.html?slug=...
export function getApartmentPagePath(apartment) {
  return `apartment.html?slug=${encodeURIComponent(apartment.slug)}`;
}


/* ---------- Public URLs ---------- */

// The live website address from config.js (seo.siteUrl) without a trailing slash, or "".
export function getSiteBaseUrl() {
  const raw = cleanText(siteConfig.seo.siteUrl);
  if (!raw) return '';
  try {
    const url = new URL(raw);
    if (!/^https?:$/.test(url.protocol)) return '';
    return url.href.replace(/\/+$/, '');
  } catch {
    return '';
  }
}

const LOCAL_HOST = /^(?:localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)|\.local$|^\[?::1\]?$/i;

// The full public URL of an apartment page, used in WhatsApp messages.
// Returns "" when it cannot be determined reliably (for example while testing on
// localhost), so a link that customers cannot open is never sent.
export function getApartmentPublicUrl(apartment) {
  const path = getApartmentPagePath(apartment);
  const base = getSiteBaseUrl();
  if (base) return `${base}/${path}`;

  const { protocol, hostname } = window.location;
  if (!/^https?:$/.test(protocol) || LOCAL_HOST.test(hostname)) return '';
  try {
    return new URL(path, window.location.href).href;
  } catch {
    return '';
  }
}


/* ---------- Icons (inline SVG, styled by the .icon class) ---------- */

const ICON_PATHS = {
  whatsapp: '<path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 8 19.4L3 21z"/><path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1.2-1.2-1.7-1-.8.6a4.6 4.6 0 0 1-1.9-1.9l.6-.8-1-1.7L9 9.5z"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>'
};

export function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICON_PATHS[name] || ''}</svg>`;
}


/* ---------- Scroll reveal ---------- */

export function revealOnScroll(root = document) {
  const items = root.querySelectorAll('.reveal:not(.is-visible)');

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach((item) => observer.observe(item));
}

/* ---------- SEO tags that need the live domain ---------- */

function setMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

// Adds canonical and social-sharing tags ONLY when seo.siteUrl is configured,
// because they must contain the real public address.
export function applySeo({ title, description, file }) {
  const base = getSiteBaseUrl();
  if (!base) return;

  const url = file ? `${base}/${file}` : `${base}/`;

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  setMeta('property', 'og:url', url);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:site_name', siteConfig.business.name);

  const image = cleanText(siteConfig.seo.ogImage);
  if (image) {
    const absolute = /^https?:\/\//i.test(image) ? image : `${base}/${image.replace(/^\/+/, '')}`;
    setMeta('property', 'og:image', absolute);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }
}