/*
  MAIN ENTRY POINT
  Every HTML page loads this file. It builds the shared header and footer,
  then runs the code for whichever page is open (read from <body data-page="...">).
*/

import { siteConfig } from './config.js';
import { renderLayout } from './modules/layout.js';
import { initContactPage } from './modules/contact.js';
import { initNavigation } from './modules/navigation.js';
import { applyImageFallbacks } from './modules/images.js';
import { upgradeGeneralLinks } from './modules/whatsapp.js';
import { applySeo, revealOnScroll } from './modules/utils.js';
import { initApartmentDetail } from './modules/apartment-details.js';
import { initHomepage, initListings } from './modules/apartment-listings.js';

// Elements that fade in as they scroll into view (see "SCROLL REVEAL" in css/style.css).
const REVEAL_SELECTORS = [
  '.section-head',
  '.principles',
  '.steps',
  '.split > *',
  '.cta__inner',
  '.contact-grid',
  '.page-hero .container'
];

function init() {
  document.documentElement.classList.add('js-enabled');

  renderLayout();
  initNavigation();
  upgradeGeneralLinks(document);
  applyImageFallbacks(document);

  document.querySelectorAll(REVEAL_SELECTORS.join(',')).forEach((el) => el.classList.add('reveal'));
  revealOnScroll(document);

  const page = document.body.dataset.page;

  try {
    if (page === 'home') initHomepage();
    if (page === 'apartments') initListings();
    if (page === 'apartment') initApartmentDetail();
    if (page === 'contact') initContactPage();
  } catch (error) {
    console.error(`[${siteConfig.business.name}] A page script failed:`, error);
  }

  // Social-sharing and canonical tags (only added when seo.siteUrl is set in config.js).
  // The apartment page sets its own tags after it finds the apartment.
  if (page !== 'apartment') {
    const description = document.querySelector('meta[name="description"]');
    const file = window.location.pathname.split('/').pop();
    applySeo({
      title: document.title,
      description: description ? description.content : '',
      file: file === 'index.html' ? '' : file
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}