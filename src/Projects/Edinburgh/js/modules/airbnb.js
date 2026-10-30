/*
  AIRBNB BOOKING LINKS
  An apartment's airbnbUrl is only used if it is a valid https:// address on an
  approved Airbnb domain (list in js/config.js). Anything else is ignored, so the
  site never links to a fake or unsafe destination.
*/

import { siteConfig } from '../config.js';
import { cleanText, escapeHtml } from './utils.js';

// Returns the cleaned URL, or "" if it is missing or not an approved Airbnb address.
export function getValidAirbnbUrl(value) {
  const text = cleanText(value);
  if (!text) return '';

  try {
    const url = new URL(text);
    if (url.protocol !== 'https:') return '';
    if (url.username || url.password) return '';

    const host = url.hostname.toLowerCase();
    const allowed = siteConfig.airbnb.allowedHostSuffixes.some(
      (suffix) => host === suffix || host.endsWith(`.${suffix}`)
    );
    return allowed ? url.href : '';
  } catch {
    return '';
  }
}

// Returns the button HTML, or "" when this apartment has no valid Airbnb URL.
export function renderAirbnbButton(apartment, { className = 'btn btn--primary', label = 'Book on Airbnb' } = {}) {
  const url = getValidAirbnbUrl(apartment.airbnbUrl);
  if (!url) return '';

  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
    <span>${escapeHtml(label)}</span><span class="visually-hidden"> for ${escapeHtml(apartment.displayName)} (opens Airbnb in a new tab)</span>
  </a>`;
}