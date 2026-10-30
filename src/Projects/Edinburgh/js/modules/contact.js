/*
  CONTACT DETAILS
  getContactChannels() turns the settings in js/config.js into clean, validated
  values. It is used by the footer and by the Contact page. Missing or invalid
  details are simply left out.
*/

import { siteConfig } from '../config.js';
import { cleanText, escapeHtml, getSafeHttpsUrl, icon } from './utils.js';
import { getWhatsAppNumber, getGeneralWhatsAppLink } from './whatsapp.js';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SOCIAL_LABELS = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  x: 'X',
  youtube: 'YouTube'
};

export function getContactChannels() {
  const contact = siteConfig.contact;

  const whatsappNumber = getWhatsAppNumber();
  const whatsappUrl = whatsappNumber ? getGeneralWhatsAppLink() : '';

  const phone = cleanText(contact.phone);
  const phoneDigits = phone.replace(/[^\d+]/g, '');
  const phoneHref = phone && phoneDigits.replace(/\D/g, '').length >= 7 ? `tel:${phoneDigits}` : '';

  const email = cleanText(contact.email);

  const social = Object.entries(contact.social || {})
    .map(([key, value]) => ({ key, label: SOCIAL_LABELS[key] || key, url: getSafeHttpsUrl(value) }))
    .filter((item) => item.url);

  const locations = Array.isArray(contact.operatingLocations)
    ? contact.operatingLocations.map(cleanText).filter(Boolean)
    : [];

  return {
    whatsappNumber,
    whatsappUrl,
    phone: phoneHref ? phone : '',
    phoneHref,
    email: EMAIL_PATTERN.test(email) ? email : '',
    address: cleanText(contact.address),
    locations,
    social
  };
}

function renderCard({ iconName, label, value, href, external }) {
  const attributes = external ? ' target="_blank" rel="noopener noreferrer"' : '';
  const hint = external ? '<span class="visually-hidden"> (opens in a new tab)</span>' : '';

  return `
    <li class="contact-card">
      <a class="contact-card__link" href="${escapeHtml(href)}"${attributes}>
        <span class="contact-card__icon">${icon(iconName)}</span>
        <span class="contact-card__text">
          <span class="contact-card__label">${escapeHtml(label)}</span>
          <span class="contact-card__value">${escapeHtml(value)}</span>${hint}
        </span>
      </a>
    </li>`;
}

export function initContactPage() {
  const list = document.querySelector('[data-contact-methods]');
  if (!list) return;

  const channels = getContactChannels();
  const cards = [];

  if (channels.whatsappUrl) {
    cards.push(renderCard({
      iconName: 'whatsapp', label: 'WhatsApp', value: `+${channels.whatsappNumber}`,
      href: channels.whatsappUrl, external: true
    }));
  }
  if (channels.phoneHref) {
    cards.push(renderCard({ iconName: 'phone', label: 'Telephone', value: channels.phone, href: channels.phoneHref }));
  }
  if (channels.email) {
    cards.push(renderCard({ iconName: 'mail', label: 'Email', value: channels.email, href: `mailto:${channels.email}` }));
  }
  channels.social.forEach((item) => {
    cards.push(renderCard({
      iconName: 'globe', label: item.label, value: 'Visit our profile', href: item.url, external: true
    }));
  });

  list.innerHTML = cards.join('');

  // Address and operating locations
  const extra = document.querySelector('[data-contact-extra]');
  const addressBox = document.querySelector('[data-contact-address]');
  const addressParts = [];
  if (channels.address) addressParts.push(`<p>${escapeHtml(channels.address)}</p>`);
  if (channels.locations.length) addressParts.push(`<p>Operating locations: ${escapeHtml(channels.locations.join(', '))}</p>`);

  if (extra && addressBox && addressParts.length) {
    addressBox.innerHTML = addressParts.join('');
    extra.hidden = false;
  }

  // Nothing configured yet: show the friendly fallback instead of an empty page.
  const fallback = document.querySelector('[data-contact-fallback]');
  if (fallback) fallback.hidden = cards.length > 0;
  list.hidden = cards.length === 0;
}