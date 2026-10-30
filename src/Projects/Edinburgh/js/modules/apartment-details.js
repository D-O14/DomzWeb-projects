/*
  APARTMENT DETAIL PAGE
  URL pattern: apartment.html?slug=apartment-slug
  The slug is read from the address bar and matched against js/data/apartments.js,
  so each apartment has its own shareable link that still works after a refresh.
*/

import { siteConfig } from '../config.js';
import { applyImageFallbacks } from './images.js';
import { renderGallery, initGallery } from './gallery.js';
import { renderAirbnbButton, getValidAirbnbUrl } from './airbnb.js';
import { renderWhatsAppButton, getWhatsAppNumber } from './whatsapp.js';
import { applySeo, cleanText, escapeHtml, getApartmentBySlug, getApartmentPagePath, icon } from './utils.js';

function setPageMeta(title, description, file) {
  document.title = `${title}${siteConfig.seo.titleSeparator}${siteConfig.business.name}`;

  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute('content', description);

  applySeo({ title: document.title, description, file });
}

function renderNotFound(root) {
  setPageMeta('Apartment not found', siteConfig.seo.defaultDescription, '');
  root.innerHTML = `
    <div class="container section">
      <div class="empty-state">
        <h1 class="empty-state__title">We couldn’t find that apartment</h1>
        <p>The link may be incorrect, or the apartment may no longer be listed.</p>
        <a class="btn btn--primary" href="apartments.html">View all apartments</a>
      </div>
    </div>`;
}

function renderParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function renderFacts(apartment) {
  const facts = [];
  if (apartment.bedrooms) facts.push({ value: apartment.bedrooms, label: apartment.bedrooms === 1 ? 'Bedroom' : 'Bedrooms' });
  if (apartment.bathrooms) facts.push({ value: apartment.bathrooms, label: apartment.bathrooms === 1 ? 'Bathroom' : 'Bathrooms' });
  if (apartment.maxGuests) facts.push({ value: apartment.maxGuests, label: apartment.maxGuests === 1 ? 'Guest' : 'Guests' });
  if (facts.length === 0) return '';

  return `<ul class="fact-list" aria-label="Apartment capacity">${facts.map((fact) => `
    <li class="fact"><span class="fact__value">${escapeHtml(fact.value)}</span><span class="fact__label">${fact.label}</span></li>`).join('')}</ul>`;
}

function renderDetail(apartment) {
  const name = escapeHtml(apartment.displayName);
  const hasAirbnb = Boolean(getValidAirbnbUrl(apartment.airbnbUrl));
  const hasWhatsApp = Boolean(getWhatsAppNumber());

  const airbnbButton = renderAirbnbButton(apartment, { className: 'btn btn--primary btn--block' });
  const whatsappButton = renderWhatsAppButton(apartment, {
    className: hasAirbnb ? 'btn btn--outline btn--block' : 'btn btn--primary btn--block'
  });

  // Compact buttons for the bar pinned to the bottom of phone screens
  const barAirbnb = renderAirbnbButton(apartment, { className: 'btn btn--primary' });
  const barWhatsApp = renderWhatsAppButton(apartment, {
    className: hasAirbnb ? 'btn btn--outline' : 'btn btn--primary'
  });

  let bookingNote = '';
  if (hasAirbnb) bookingNote = siteConfig.airbnb.bookingNote;
  else if (hasWhatsApp) bookingNote = 'Message us on WhatsApp to ask about availability and booking.';

  const description = apartment.description
    ? renderParagraphs(apartment.description)
    : '<p>Full details for this apartment are available on request. Send us a message and we will be glad to help.</p>';

  const amenities = apartment.amenities.length
    ? `<section aria-labelledby="amenities-heading">
         <h2 class="detail-section__title" id="amenities-heading">Amenities</h2>
         <ul class="amenity-list">${apartment.amenities.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
       </section>`
    : '';

  const checkIn = apartment.checkInInfo
    ? `<section aria-labelledby="checkin-heading">
         <h2 class="detail-section__title" id="checkin-heading">Check-in information</h2>
         <p class="checkin-info">${escapeHtml(apartment.checkInInfo)}</p>
       </section>`
    : '';

  const rules = apartment.houseRules.length
    ? `<section aria-labelledby="rules-heading">
         <h2 class="detail-section__title" id="rules-heading">House rules</h2>
         <ul class="rules-list">${apartment.houseRules.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
       </section>`
    : '';

  const actionCount = [barAirbnb, barWhatsApp].filter(Boolean).length;

  return `
    <div class="container detail-header">
      <nav aria-label="Breadcrumb">
        <ol class="breadcrumb">
          <li><a href="index.html">Home</a></li>
          <li><a href="apartments.html">Apartments</a></li>
          <li aria-current="page">${name}</li>
        </ol>
      </nav>
      <h1 class="detail-title">${name}</h1>
      ${apartment.location ? `<p class="detail-location">${icon('pin')} ${escapeHtml(apartment.location)}</p>` : ''}
    </div>

    <div class="container detail-layout">
      <div class="detail-main">
        ${renderGallery(apartment)}
        ${renderFacts(apartment)}
        <section class="detail-description" aria-labelledby="about-heading">
          <h2 class="detail-section__title" id="about-heading">About this apartment</h2>
          ${description}
        </section>
        ${amenities}
        ${checkIn}
        ${rules}
      </div>

      <aside class="detail-aside" aria-label="Booking and enquiries">
        <div class="booking-card">
          ${apartment.priceDisplay ? `<p class="booking-card__price">${escapeHtml(apartment.priceDisplay)}</p>` : ''}
          ${bookingNote ? `<p class="booking-card__note">${escapeHtml(bookingNote)}</p>` : ''}
          <div class="booking-card__actions">
            ${airbnbButton}
            ${whatsappButton}
          </div>
          <a class="link-arrow booking-card__back" href="apartments.html">See all apartments</a>
        </div>
      </aside>
    </div>

    <div class="action-bar${actionCount === 1 ? ' action-bar--single' : ''}" aria-label="Quick actions">
      ${barAirbnb}
      ${barWhatsApp}
    </div>`;
}

export function initApartmentDetail() {
  const root = document.querySelector('[data-apartment-detail]');
  if (!root) return;

  const slug = new URLSearchParams(window.location.search).get('slug');
  const apartment = getApartmentBySlug(slug);

  if (!apartment) {
    renderNotFound(root);
    return;
  }

  const summary = cleanText(apartment.description).split(/\n\s*\n/)[0];
  const description = summary
    ? (summary.length > 155 ? `${summary.slice(0, 152).trim()}…` : summary)
    : `${apartment.displayName} at ${siteConfig.business.name}. View photographs and details, then book on Airbnb or enquire on WhatsApp.`;

  setPageMeta(apartment.displayName, description, getApartmentPagePath(apartment));

  root.innerHTML = renderDetail(apartment);
  applyImageFallbacks(root);
  initGallery(root, apartment);
}