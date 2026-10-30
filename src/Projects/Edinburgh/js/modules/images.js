/*
  IMAGE HELPERS
  - Chooses cover and gallery images from an apartment record.
  - Generates a tasteful placeholder when a photograph is missing or fails to load,
    so there are never broken-image icons.
*/

import { cleanText, escapeHtml } from './utils.js';

const PLACEHOLDER_STYLES = {
  apartment: { background: '#e4ddcf', line: '#8a6a3f', text: '#5b574d', label: 'Photograph coming soon' },
  about:     { background: '#e4ddcf', line: '#8a6a3f', text: '#5b574d', label: 'Photograph coming soon' },
  hero:      { background: '#14261f', line: '#d6bd92', text: '#d6bd92', label: '' }
};

// Returns an SVG image as a data: address (no file needed).
export function placeholderImage(kind = 'apartment') {
  const style = PLACEHOLDER_STYLES[kind] || PLACEHOLDER_STYLES.apartment;
  const label = style.label
    ? `<text x="600" y="545" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="5" fill="${style.text}">${escapeHtml(style.label.toUpperCase())}</text>`
    : '';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" width="1200" height="900">
    <rect width="1200" height="900" fill="${style.background}"/>
    <g fill="none" stroke="${style.line}" stroke-width="3" opacity="0.85">
      <path d="M520 470V390L600 330L680 390V470Z"/>
      <path d="M570 470V420H630V470"/>
    </g>${label}</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// All real photographs for an apartment: cover image first, then the rest, no duplicates.
export function getGalleryImages(apartment) {
  const list = [];
  const seen = new Set();
  const records = Array.isArray(apartment.images) ? apartment.images : [];

  function add(src, alt) {
    const path = cleanText(src);
    if (!path || seen.has(path)) return;
    seen.add(path);
    list.push({
      src: path,
      alt: cleanText(alt) || `${apartment.displayName}, photograph ${list.length + 1}`
    });
  }

  if (apartment.coverImage) {
    const match = records.find((item) => item && cleanText(item.src) === apartment.coverImage);
    add(apartment.coverImage, match ? match.alt : '');
  }
  records.forEach((item) => {
    if (item && typeof item === 'object') add(item.src, item.alt);
  });

  return list;
}

// The image used on apartment cards.
export function getCoverImage(apartment) {
  const images = getGalleryImages(apartment);
  if (images.length > 0) return { ...images[0], isPlaceholder: false };
  return {
    src: placeholderImage('apartment'),
    alt: `Photographs of ${apartment.displayName} are coming soon`,
    isPlaceholder: true
  };
}

// Any <img data-fallback="apartment|about|hero"> that fails to load is swapped for a placeholder.
export function applyImageFallbacks(root = document) {
  root.querySelectorAll('img[data-fallback]').forEach((img) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = 'true';

    const swap = () => {
      if (img.dataset.fallbackApplied) return;
      img.dataset.fallbackApplied = 'true';
      if (img.alt) img.alt = `${img.alt} (photograph coming soon)`;
      img.removeAttribute('srcset');
      img.src = placeholderImage(img.dataset.fallback);
    };

    img.addEventListener('error', swap);
    // The image may already have failed before this code ran.
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) swap();
  });
}