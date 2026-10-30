/*
  ============================================================
  APARTMENT DATA: THE SINGLE SOURCE FOR EVERY APARTMENT
  ============================================================
  Cards, detail pages, galleries, filters, Airbnb links and
  WhatsApp messages all read from this array.

  FIELD GUIDE
  id             Unique and permanent, e.g. "apartment-002".
  slug           Used in the URL: apartment.html?slug=<slug>
                 Lowercase letters, numbers and hyphens only. Unique.
  name           Apartment name shown to visitors.
  location       Area or neighbourhood. "" = hidden.
  price          Number, used only for sorting. null = no sorting by price.
  priceDisplay   Text shown and sent on WhatsApp. "" = hidden.
  bedrooms / bathrooms / maxGuests   Number, or null to hide.
  description    Text. Separate paragraphs with a blank line.
  amenities      List of short phrases.
  houseRules     List of short rules. [] = hidden.
  checkInInfo    Text about check-in/out. "" = hidden.
  images         Photos: { src: "path", alt: "what the photo shows" }.
  coverImage     Path of the card photo. "" = uses the first image.
  airbnbUrl      The real https:// Airbnb listing for THIS apartment. "" = button hidden.
  featured       true/false.
  isPlaceholder  Only for sample records. Delete the line for real apartments.
*/

// EDIT HERE: Add, edit or remove apartment records.
export const apartments = [
  {
    id: "apartment-001",
    slug: "golf-estate-3-bedroom",
    name: "Tastefully Furnished 3 Bedroom Apartment",
    location: "Golf Estate",
    price: 120000,
    priceDisplay: "₦120,000 per night",
    bedrooms: 3,
    bathrooms: null,   // EDIT HERE: number of bathrooms
    maxGuests: null,   // EDIT HERE: maximum number of guests
    description:
      "A tastefully furnished 3 bedroom apartment at Golf Estate.\n\n" +
      "The living area has a large sectional sofa, a wall-mounted TV with warm ambient lighting, and a separate dining area. " +
      "The kitchen has a gas cooker with oven, an extractor hood, a microwave, a blender, an electric kettle and a large refrigerator. " +
      "A balcony looks out over the communal lawn.",
    amenities: [
      "Air conditioning",
      "Smart-screen TV",
      "Kitchen with gas cooker and oven",
      "Refrigerator",
      "Microwave",
      "Electric kettle",
      "Blender",
      "Dining area",
      "Balcony",
      "Wardrobes",
      "Dressing table with mirror",
      "Standing fans",
      "Exercise bike",
      "Shoe rack"
    ],
    houseRules: [],      // EDIT HERE: e.g. ["No smoking", "No parties"]
    checkInInfo: "",     // EDIT HERE: e.g. "Check-in from 2 pm."
    images: [
      { src: "./assets/images/apartments/golf-estate-3-bedroom/living-room.jpg", alt: "Living room with a blue sectional sofa, wall-mounted TV and ambient lighting" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/living-room-sofa.jpg", alt: "Living room seen from the sofa, with a framed artwork and a large indoor plant" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/living-room-wide.jpg", alt: "Wide view of the living room with a patterned rug and sofa" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/dining-area.jpg", alt: "Dining area with a four-seat table, white sideboard and curtained window" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/dining-area-2.jpg", alt: "Dining table with four chairs, wall shelves and an air conditioning unit" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/exercise-bike.jpg", alt: "Exercise bike and a standing fan beside the dining area" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/kitchen.jpg", alt: "Kitchen with a gas cooker, extractor hood, microwave and blender on a granite worktop" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/kitchen-fridge.jpg", alt: "Kitchen with wooden cabinets and a large refrigerator" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/kitchen-entrance.jpg", alt: "Kitchen seen from the hallway, with a gas cooker and extractor hood" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/bedroom-one.jpg", alt: "Bedroom with a double bed, blue upholstered headboard wall and dressing table" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/bedroom-two.jpg", alt: "Bedroom with a double bed, wardrobe, wall-mounted TV and air conditioning" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/hallway.jpg", alt: "Hallway with a full-length mirror and a view into a bedroom" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/entrance-shoe-rack.jpg", alt: "Entrance hallway with a white shoe rack" },
      { src: "./assets/images/apartments/golf-estate-3-bedroom/balcony-view.jpg", alt: "Balcony with artificial grass overlooking the communal lawn and surrounding buildings" }
    ],
    coverImage: "./assets/images/apartments/golf-estate-3-bedroom/living-room.jpg",
    airbnbUrl: "",   // EDIT HERE: paste the real Airbnb listing URL for this apartment
    featured: true
  },
  {
    id: "apartment-002",
    slug: "apartment-two",
    name: "Apartment Two",
    location: "",
    price: null,
    priceDisplay: "",
    bedrooms: null,
    bathrooms: null,
    maxGuests: null,
    description: "",
    amenities: [],
    houseRules: [],
    checkInInfo: "",
    images: [],
    coverImage: "",
    airbnbUrl: "",
    featured: true,
    isPlaceholder: true
  },
  {
    id: "apartment-003",
    slug: "apartment-three",
    name: "Apartment Three",
    location: "",
    price: null,
    priceDisplay: "",
    bedrooms: null,
    bathrooms: null,
    maxGuests: null,
    description: "",
    amenities: [],
    houseRules: [],
    checkInInfo: "",
    images: [],
    coverImage: "",
    airbnbUrl: "",
    featured: true,
    isPlaceholder: true
  }
];
