/**
 * One entry per property. Each has its own Airbnb URL, so a future multi-property
 * collection only needs a list view; /stay/:slug already resolves by slug.
 * FUTURE: swap for a backend/DB call (hosts, availability) here.
 */
const RAW = [
  {
    id: "prop-001",
    slug: "featured-stay",
    name: "Featured Stay (placeholder name)", // TODO
    featured: true,
    published: true,
    summary: "",                              // TODO one-line pitch
    description: "TODO: describe the property using the owner's approved copy.",
    location: "",                             // TODO only what the owner authorises
    airbnbUrl: "",                            // TODO exact Airbnb listing URL
    facts: { guests: null, bedrooms: null, beds: null, bathrooms: null }, // TODO numbers; null hides
    amenities: [],                            // TODO e.g. ["Wi-Fi", "Air conditioning"]
    images: []                                // TODO [{src:"assets/stay/01.jpg", alt:"Living room"}]
  }
];
export const PROPERTIES = RAW.filter((p) => p.published);