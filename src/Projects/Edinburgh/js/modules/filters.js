/*
  FILTERS AND SORTING (apartments page)
  Controls only appear when the apartment data can support them:
  - Location filter: needs at least 2 different locations.
  - Bedrooms filter: needs at least 2 different bedroom counts.
  - Price sorting: needs at least 2 apartments with a numeric price.
  If none of these apply, the whole panel stays hidden.
*/

import { escapeHtml, pluralize } from './utils.js';

export function createFilters({ apartments, container, onChange }) {
  const state = { location: '', bedrooms: '', sort: 'default' };

  const locations = [...new Set(apartments.map((a) => a.location).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b));
  const bedroomCounts = [...new Set(apartments.map((a) => a.bedrooms).filter(Boolean))]
    .sort((a, b) => a - b);
  const canSortByPrice = apartments.filter((a) => Number.isFinite(a.price)).length >= 2;

  const showLocation = locations.length >= 2;
  const showBedrooms = bedroomCounts.length >= 2;

  // Nothing useful to filter: keep the panel hidden.
  if (!showLocation && !showBedrooms && !canSortByPrice) {
    container.hidden = true;
    return { apply: (list) => list.slice(), reset() {}, isActive: () => false };
  }

  function selectGroup(id, label, options) {
    const items = options
      .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
      .join('');
    return `
      <div class="filters__group">
        <label class="filters__label" for="${id}">${escapeHtml(label)}</label>
        <select class="filters__select" id="${id}" data-filter="${id.replace('filter-', '')}">${items}</select>
      </div>`;
  }

  const groups = [];

  if (showLocation) {
    groups.push(selectGroup('filter-location', 'Location', [
      { value: '', label: 'All locations' },
      ...locations.map((value) => ({ value, label: value }))
    ]));
  }

  if (showBedrooms) {
    groups.push(selectGroup('filter-bedrooms', 'Bedrooms', [
      { value: '', label: 'Any number' },
      ...bedroomCounts.map((count) => ({ value: String(count), label: pluralize(count, 'bedroom') }))
    ]));
  }

  const sortOptions = [
    { value: 'default', label: 'Recommended order' },
    { value: 'name', label: 'Name: A to Z' }
  ];
  if (canSortByPrice) {
    sortOptions.push({ value: 'price-asc', label: 'Price: low to high' });
    sortOptions.push({ value: 'price-desc', label: 'Price: high to low' });
  }
  groups.push(selectGroup('filter-sort', 'Sort by', sortOptions));

  groups.push(`
    <div class="filters__group">
      <button type="button" class="btn btn--outline btn--small filters__reset" data-reset-filters>Clear filters</button>
    </div>`);

  container.innerHTML = groups.join('');
  container.hidden = false;

  container.addEventListener('change', (event) => {
    const select = event.target.closest('select[data-filter]');
    if (!select) return;
    state[select.dataset.filter] = select.value;
    onChange();
  });

  function reset() {
    state.location = '';
    state.bedrooms = '';
    state.sort = 'default';
    container.querySelectorAll('select').forEach((select) => {
      select.selectedIndex = 0;
    });
    onChange();
  }

  document.querySelectorAll('[data-reset-filters]').forEach((button) => {
    button.addEventListener('click', reset);
  });

  function apply(list) {
    let result = list.filter((apartment) => {
      if (state.location && apartment.location !== state.location) return false;
      if (state.bedrooms && String(apartment.bedrooms) !== state.bedrooms) return false;
      return true;
    });

    if (state.sort === 'name') {
      result = result.slice().sort((a, b) => a.displayName.localeCompare(b.displayName));
    } else if (state.sort === 'price-asc' || state.sort === 'price-desc') {
      const direction = state.sort === 'price-asc' ? 1 : -1;
      result = result.slice().sort((a, b) => {
        const aHas = Number.isFinite(a.price);
        const bHas = Number.isFinite(b.price);
        if (aHas && bHas) return (a.price - b.price) * direction;
        if (aHas) return -1;   // apartments without a price always go last
        if (bHas) return 1;
        return 0;
      });
    }
    return result;
  }

  return { apply, reset, isActive: () => Boolean(state.location || state.bedrooms) };
}