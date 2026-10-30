/*
  APARTMENT CARD
  One reusable function builds every card (homepage and listings page).
*/

import { siteConfig } from '../config.js';
import { getCoverImage } from './images.js';
import { renderWhatsAppButton } from './whatsapp.js';
import { getValidAirbnbUrl, renderAirbnbButton } from './airbnb.js';
import { escapeHtml, getApartmentPagePath, pluralize } from './utils.js';

export function renderApartmentCard(apartment) {
  const href = escapeHtml(getApartmentPagePath(apartment));
  const name = escapeHtml(apartment.displayName);
  const cover = getCoverImage(apartment);

  const meta = [];
  if (apartment.bedrooms) meta.push(pluralize(apartment.bedrooms, 'bedroom'));
  if (apartment.bathrooms) meta.push(pluralize(apartment.bathrooms, 'bathroom'));
  if (apartment.maxGuests) meta.push(`Up to ${pluralize(apartment.maxGuests, 'guest')}`);

  const chips = apartment.amenities.slice(0, 3)
    .map((item) => `<li class="chip">${escapeHtml(item)}</li>`)
    .join('');

  const hasAirbnb = Boolean(getValidAirbnbUrl(apartment.airbnbUrl));

  return `
    <article class="apartment-card">
      <a class="apartment-card__media" href="${href}" tabindex="-1" aria-hidden="true">
        <img src="${escapeHtml(cover.src)}" alt="${escapeHtml(cover.alt)}" width="800" height="600"
             loading="lazy" decoding="async"${cover.isPlaceholder ? '' : ' data-fallback="apartment"'}>
        ${apartment.isPlaceholder ? '<span class="badge">Sample listing</span>' : ''}
      </a>
      <div class="apartment-card__body">
        ${apartment.location ? `<p class="apartment-card__location">${escapeHtml(apartment.location)}</p>` : ''}
        <h3 class="apartment-card__title"><a href="${href}">${name}</a></h3>
        ${meta.length ? `<ul class="meta-list">${meta.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>` : ''}
        ${chips ? `<ul class="chip-list" aria-label="Selected amenities">${chips}</ul>` : ''}
        ${apartment.priceDisplay ? `<p class="apartment-card__price">${escapeHtml(apartment.priceDisplay)}</p>` : ''}
        <div class="apartment-card__actions">
          <a class="link-arrow apartment-card__link" href="${href}">View details<span class="visually-hidden"> for ${name}</span></a>
          ${renderAirbnbButton(apartment, { className: 'btn btn--primary' })}
          ${renderWhatsAppButton(apartment, { className: 'btn btn--outline' })}
          ${hasAirbnb ? `<p class="airbnb-note">${escapeHtml(siteConfig.airbnb.bookingNote)}</p>` : ''}
        </div>
      </div>
    </article>`;
}