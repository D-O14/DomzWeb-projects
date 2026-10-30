/*
  PHOTO GALLERY AND LIGHTBOX
  - Main photo with thumbnails.
  - Full-screen lightbox: works with mouse, touch (swipe) and keyboard
    (Left/Right arrows, Escape, Tab stays inside the lightbox).
*/

import { escapeHtml, icon } from './utils.js';
import { getGalleryImages, placeholderImage, applyImageFallbacks } from './images.js';

/* ---------- Markup ---------- */

export function renderGallery(apartment) {
  const images = getGalleryImages(apartment);
  const name = escapeHtml(apartment.displayName);
  const badge = apartment.isPlaceholder ? '<span class="badge">Sample listing</span>' : '';

  // No photographs supplied yet: a static placeholder, not a button.
  if (images.length === 0) {
    return `
      <div class="gallery">
        <div class="gallery__main gallery__main--static">
          <img src="${placeholderImage('apartment')}" alt="Photographs of ${name} are coming soon" width="1200" height="900">
          ${badge}
        </div>
      </div>`;
  }

  const total = images.length;
  const first = images[0];

  const thumbs = total > 1
    ? `<div class="gallery__thumbs">${images.map((image, index) => `
        <button type="button" class="gallery__thumb" data-gallery-thumb="${index}"
                aria-label="Show photo ${index + 1} of ${total}: ${escapeHtml(image.alt)}"
                aria-current="${index === 0 ? 'true' : 'false'}">
          <img src="${escapeHtml(image.src)}" alt="" width="208" height="156" loading="lazy" decoding="async" data-fallback="apartment">
        </button>`).join('')}</div>`
    : '';

  return `
    <div class="gallery" data-gallery>
      <button type="button" class="gallery__main" data-gallery-open>
        <img src="${escapeHtml(first.src)}" alt="${escapeHtml(first.alt)}" width="1200" height="900"
             fetchpriority="high" decoding="async" data-fallback="apartment" data-gallery-main>
        ${badge}
        <span class="gallery__expand">${icon('expand')}<span>${total > 1 ? `View all ${total} photos` : 'Enlarge photo'}</span></span>
      </button>
      ${thumbs}
    </div>`;
}

/* ---------- Behaviour ---------- */

export function initGallery(root, apartment) {
  const images = getGalleryImages(apartment);
  if (images.length === 0 || !root) return;

  const gallery = root.querySelector('[data-gallery]');
  if (!gallery) return;

  const mainImage = gallery.querySelector('[data-gallery-main]');
  const openButton = gallery.querySelector('[data-gallery-open]');
  const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
  const total = images.length;

  let current = 0;       // photo shown on the page
  let lightboxIndex = 0; // photo shown in the lightbox
  let lastFocused = null;

  function wrap(index) {
    return (index + total) % total;
  }

  function select(index) {
    current = wrap(index);
    delete mainImage.dataset.fallbackApplied;
    mainImage.src = images[current].src;
    mainImage.alt = images[current].alt;
    thumbs.forEach((thumb, i) => thumb.setAttribute('aria-current', i === current ? 'true' : 'false'));
  }

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => select(Number(thumb.dataset.galleryThumb)));
  });

  /* ----- Lightbox ----- */

  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', `Photo gallery: ${apartment.displayName}`);
  box.innerHTML = `
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="">
    </figure>
    <div class="lightbox__footer">
      <p class="lightbox__caption"></p>
      <p class="lightbox__counter" aria-live="polite"></p>
    </div>
    <button type="button" class="lightbox__btn lightbox__btn--close" aria-label="Close gallery">${icon('close')}</button>
    <button type="button" class="lightbox__btn lightbox__btn--prev" aria-label="Previous photo"${total < 2 ? ' hidden' : ''}>${icon('prev')}</button>
    <button type="button" class="lightbox__btn lightbox__btn--next" aria-label="Next photo"${total < 2 ? ' hidden' : ''}>${icon('next')}</button>`;
  document.body.appendChild(box);

  const lightboxImage = box.querySelector('.lightbox__img');
  const caption = box.querySelector('.lightbox__caption');
  const counter = box.querySelector('.lightbox__counter');
  const closeButton = box.querySelector('.lightbox__btn--close');
  const prevButton = box.querySelector('.lightbox__btn--prev');
  const nextButton = box.querySelector('.lightbox__btn--next');

  // If a photo fails to load, show the placeholder rather than a broken image.
  lightboxImage.addEventListener('error', () => {
    lightboxImage.src = placeholderImage('apartment');
  });

  function preload(index) {
    const image = new Image();
    image.src = images[wrap(index)].src;
  }

  function show(index) {
    lightboxIndex = wrap(index);
    const image = images[lightboxIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    caption.textContent = image.alt;
    counter.textContent = `${lightboxIndex + 1} / ${total}`;
    if (total > 1) {
      preload(lightboxIndex + 1);
      preload(lightboxIndex - 1);
    }
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }

  function close() {
    if (box.hidden) return;
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    select(lightboxIndex);   // keep the page photo in step with the last one viewed
    if (thumbs[current]) thumbs[current].scrollIntoView({ block: 'nearest', inline: 'center' });
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  openButton.addEventListener('click', () => open(current));
  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => show(lightboxIndex - 1));
  nextButton.addEventListener('click', () => show(lightboxIndex + 1));

  // Click on the dark background closes the lightbox
  box.addEventListener('click', (event) => {
    if (event.target === box || event.target.classList.contains('lightbox__figure')) close();
  });

  // Keyboard: Escape, arrow keys, and Tab kept inside the dialog
  document.addEventListener('keydown', (event) => {
    if (box.hidden) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowLeft' && total > 1) {
      event.preventDefault();
      show(lightboxIndex - 1);
    } else if (event.key === 'ArrowRight' && total > 1) {
      event.preventDefault();
      show(lightboxIndex + 1);
    } else if (event.key === 'Tab') {
      const focusable = [...box.querySelectorAll('button:not([hidden])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Touch: swipe left or right
  let touchStartX = null;
  box.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  box.addEventListener('touchend', (event) => {
    if (touchStartX === null || total < 2) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 50) show(lightboxIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  applyImageFallbacks(root);
}