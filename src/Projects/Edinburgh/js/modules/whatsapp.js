/*
  WHATSAPP ENQUIRY SYSTEM
  - Validates the business number from config.js.
  - Builds a message from the template and the selected apartment's own data.
  - Creates a https://wa.me/NUMBER?text=ENCODED_MESSAGE link.

  Nothing is ever sent automatically. WhatsApp only opens with the message
  prefilled, and the visitor must review it and press Send.
*/

import { siteConfig } from '../config.js';
import { cleanText, escapeHtml, getApartmentPublicUrl, icon } from './utils.js';

// International format, digits only, no leading zero (7 to 15 digits after the first).
// The placeholder "234XXXXXXXXXX" fails this test on purpose.
export function isValidWhatsAppNumber(value) {
  return /^[1-9]\d{7,14}$/.test(cleanText(value));
}

export function getWhatsAppNumber() {
  const number = cleanText(siteConfig.contact.whatsappNumber);
  return isValidWhatsAppNumber(number) ? number : '';
}

/*
  Fills a template (an array of lines) with values.
  A line containing a {{token}} whose value is empty is removed completely,
  so "Price: {{price}}" disappears when there is no price.
  Repeated blank lines are collapsed.
*/
export function fillTemplate(lines, values) {
  const filledLines = [];

  (Array.isArray(lines) ? lines : []).forEach((line) => {
    const text = String(line);
    let hasToken = false;
    let missingValue = false;

    const filled = text.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
      hasToken = true;
      const value = cleanText(values[key]);
      if (!value) missingValue = true;
      return value;
    });

    if (hasToken && missingValue) return;
    filledLines.push(filled);
  });

  const result = [];
  filledLines.forEach((line) => {
    const isBlank = line.trim() === '';
    if (isBlank && (result.length === 0 || result[result.length - 1] === '')) return;
    result.push(isBlank ? '' : line);
  });
  while (result.length > 0 && result[result.length - 1] === '') result.pop();

  return result.join('\n');
}

export function buildApartmentMessage(apartment) {
  return fillTemplate(siteConfig.whatsapp.apartmentMessageLines, {
    name: cleanText(apartment.name) || siteConfig.whatsapp.fallbackApartmentName,
    location: apartment.location,
    price: apartment.priceDisplay,
    url: getApartmentPublicUrl(apartment)
  });
}

export function buildGeneralMessage() {
  return fillTemplate(siteConfig.whatsapp.generalMessageLines, {});
}

// Returns the wa.me link, or "" when the number is missing, invalid or still the placeholder.
export function buildWhatsAppLink(message) {
  const number = getWhatsAppNumber();
  if (!number) return '';
  const text = cleanText(message) ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export function getApartmentWhatsAppLink(apartment) {
  return buildWhatsAppLink(buildApartmentMessage(apartment));
}

export function getGeneralWhatsAppLink() {
  return buildWhatsAppLink(buildGeneralMessage());
}

/*
  WhatsApp button for one apartment.
  With a valid number: opens WhatsApp with that apartment's message.
  Without one: links to the Contact page instead of a broken link.
*/
export function renderWhatsAppButton(apartment, { className = 'btn btn--outline', label = 'Enquire on WhatsApp' } = {}) {
  const name = escapeHtml(apartment.displayName);
  const url = getApartmentWhatsAppLink(apartment);

  if (!url) {
    return `<a class="${className}" href="contact.html">Contact us<span class="visually-hidden"> about ${name}</span></a>`;
  }

  return `<a class="${className}" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
    ${icon('whatsapp')}<span>${escapeHtml(label)}</span><span class="visually-hidden"> about ${name} (opens WhatsApp in a new tab)</span>
  </a>`;
}

/*
  Upgrades every <a data-whatsapp-general> (header, hero, CTA bands) to a WhatsApp link.
  Without a valid number the link keeps pointing to the Contact page.
*/
export function upgradeGeneralLinks(root = document) {
  const url = getGeneralWhatsAppLink();
  if (!url) return;

  root.querySelectorAll('a[data-whatsapp-general]').forEach((link) => {
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    if (!link.querySelector('.visually-hidden')) {
      link.insertAdjacentHTML('beforeend', '<span class="visually-hidden"> (opens WhatsApp in a new tab)</span>');
    }
  });
}