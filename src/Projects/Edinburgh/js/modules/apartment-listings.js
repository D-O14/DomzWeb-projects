/*
  LISTINGS
  - initHomepage(): featured apartments and the amenity highlights on index.html.
  - initListings(): the full grid, filters and empty state on apartments.html.
  Both read from js/data/apartments.js, so new apartments appear automatically.
*/

import { siteConfig } from '../config.js';
import { escapeHtml, getApartments, pluralize } from './utils.js';
import { renderApartmentCard } from './apartment-card.js';
import { applyImageFallbacks } from './images.js';
import { createFilters } from './filters.js';

/* ---------- Homepage ---------- */

function pickFeatured(apartments) {
  // 1) apartments listed in config.js featuredApartmentIds
  const ids = Array.isArray(siteConfig.featuredApartmentIds) ? siteConfig.featuredApartmentIds : [];
  const byId = ids.map((id) => apartments.find((a) => a.id === id)).filter(Boolean);
  if (byId.length > 0) return byId;

  // 2) apartments marked featured: true
  const flagged = apartments.filter((a) => a.featured);
  if (flagged.length > 0) return flagged;

  // 3) the first three
  return apartments.slice(0, 3);
}

function renderAmenityHighlights(apartments) {
  const section = document.querySelector('[data-amenities-section]');
  const list = document.querySelector('[data-amenity-list]');
  if (!section || !list) return;

  // Count amenities across all apartments (case-insensitive) and show the most common.
  const counts = new Map();
  apartments.forEach((apartment) => {
    apartment.amenities.forEach((amenity) => {
      const key = amenity.toLowerCase();
      const entry = counts.get(key) || { label: amenity, count: 0 };
      entry.count += 1;
      counts.set(key, entry);
    });
  });

  const top = [...counts.values()].sort((a, b) => b.count - a.count).slice(0, 6);
  if (top.length === 0) return;   // section stays hidden when there is no amenity data

  list.innerHTML = top.map((entry) => `<li>${escapeHtml(entry.label)}</li>`).join('');
  section.hidden = false;
}

export function initHomepage() {
  const apartments = getApartments();
  const section = document.querySelector('[data-featured-section]');
  const grid = document.querySelector('[data-featured-grid]');

  if (section && grid) {
    const featured = pickFeatured(apartments);
    if (featured.length === 0) {
      section.hidden = true;
    } else {
      grid.innerHTML = featured.map(renderApartmentCard).join('');
      applyImageFallbacks(grid);
    }
  }

  renderAmenityHighlights(apartments);
}

/* ---------- Apartments page ---------- */

export function initListings() {
  const grid = document.querySelector('[data-apartment-grid]');
  if (!grid) return;

  const filterBox = document.querySelector('[data-filters]');
  const countElement = document.querySelector('[data-results-count]');
  const emptyState = document.querySelector('[data-empty-state]');
  const all = getApartments();

  // No apartments at all: show a friendly message instead of the "no match" state.
  if (all.length === 0) {
    if (filterBox) filterBox.hidden = true;
    if (emptyState) {
      emptyState.querySelector('.empty-state__title').textContent = 'Apartments are coming soon';
      emptyState.querySelector('p').textContent = 'Our apartment listings are being prepared. Please check back soon.';
      emptyState.querySelector('[data-reset-filters]').hidden = true;
      emptyState.hidden = false;
    }
    return;
  }

  const filters = createFilters({ apartments: all, container: filterBox, onChange: update });

  function update() {
    const list = filters.apply(all);

    grid.innerHTML = list.map(renderApartmentCard).join('');
    applyImageFallbacks(grid);

    if (emptyState) emptyState.hidden = list.length > 0;
    grid.hidden = list.length === 0;

    if (countElement) {
      countElement.textContent = filters.isActive()
        ? `Showing ${list.length} of ${pluralize(all.length, 'apartment')}`
        : pluralize(all.length, 'apartment');
    }
  }

  update();
}