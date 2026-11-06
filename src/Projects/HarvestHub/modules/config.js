export const config = {
    cart_key: "your-harvesthub-cart",
    brandName: "HarvestHub", logo: "harvestHub",
    address: "No: 3, Razao-Belo, Osagie Ln, Benin City, Edo State",
    collectionEnabled: true,

    contact: {
        whatsapp: "+234 916 456 989 1",
        email: "harvesthub@gmail.com",
        phone: "+234 916 456 989 1",
    },

    links: [
        { anchor: "Home", path: "#/", className: "active" },
        { anchor: "Shop", path: "#/shop" },
        { anchor: "Wholesale", path: "#/wholesale" },
        { anchor: "Delivery", path: "#/delivery" },
        { anchor: "About", path: "#/about" },
    ],

    zones: [
        { id: "central", name: "Benin City: central areas", fee: 2500, minOrder: 5000, window: "Time confirmed after you order" },
        { id: "outer", name: "Benin City: outer areas", fee: 4500, minOrder: 10000, window: "Time confirmed after you order" },
    ],

    products: [
        {
            id: "goat", name: "Live Goat", category: "livestock", emoji: "🐐", featured: true, price: 85000, unit: "animal", minQty: 1,
            description: "Sample listing. Size and weight vary by animal and are confirmed before dispatch.",
            note: "Sourced after you order. Collection or delivery is arranged with you."
        },
        {
            id: "broiler", name: "Live Broiler Chicken", category: "poultry", emoji: "🐓", featured: true, price: 8500, unit: "bird", minQty: 1,
            tiers: [{ quantity: 50, price: 8000 }], description: "Sample listing for live broilers.", note: "Weight varies by bird."
        },
        {
            id: "local-chicken", name: "Live Local Chicken", category: "poultry", emoji: "🐔", price: 12000, unit: "bird", minQty: 1,
            description: "Sample listing for live local birds.", note: "Weight varies by bird."
        },
        {
            id: "frozen-whole", name: "Frozen Whole Chicken", category: "frozen", emoji: "🍗", featured: true, price: 6500, unit: "kg", minQty: 1,
            description: "Sample frozen whole chicken, sold by weight.", note: "Final weight depends on the pack. Handling details are supplied by the business."
        },
        {
            id: "frozen-portions", name: "Frozen Chicken Portions", category: "frozen", emoji: "🍖", status: "out", price: 6000, unit: "kg", minQty: 1,
            description: "Sample portions.", note: "Shown as unavailable in this demo."
        },
        {
            id: "tomatoes", name: "Tomatoes", category: "produce", emoji: "🍅", featured: true, price: 35000, unit: "basket", minQty: 1,
            description: "Sample tomatoes sold by the basket.", note: "Basket sizes vary. Seasonal supply."
        },
        {
            id: "pepper", name: "Pepper", category: "produce", emoji: "🌶️", price: 3000, unit: "kg", minQty: 1,
            description: "Sample pepper sold by the kilogram.", note: "Seasonal supply."
        },
        {
            id: "onions", name: "Onions", category: "produce", emoji: "🧅", price: 2200, unit: "kg", minQty: 1,
            tiers: [{ quantity: 25, price: 2000 }], description: "Sample onions sold by the kilogram.", note: ""
        },
        {
            id: "rice", name: "Rice Bowl", category: "grains", emoji: "🍚", featured: true, price: 4000, unit: "kg", minQty: 1,
            tiers: [{ quantity: 50, price: 3700 }], description: "Sample rice. Larger quantities have a lower per-kilogram price.", note: ""
        },
        {
            id: "beans", name: "Beans", category: "grains", emoji: "🫘", price: 3500, unit: "kg", minQty: 1,
            description: "Sample beans sold by the kilogram.", note: ""
        },
        {
            id: "maize", name: "Maize", category: "grains", emoji: "🌽", price: 1800, unit: "kg", minQty: 5,
            description: "Sample maize.", note: "MinQtyimum order 5 kg."
        },
        {
            id: "garri", name: "Garri", category: "grains", emoji: "🥣", price: 2000, unit: "kg", minQty: 1,
            description: "Sample garri sold by the kilogram.", note: ""
        },
        {
            id: "yam,", name: "Yam", category: "tubers", emoji: "🍠", featured: true, price: 4500, unit: "tuber", minQty: 1,
            description: "Sample yam sold per tuber.", note: "Tuber sizes vary."
        },
        {
            id: "cassava", name: "Cassava", category: "tubers", emoji: "🥔", price: 1500, unit: "kg", minQty: 2,
            description: "Sample cassava.", note: "MinQtyimum order 2 kg."
        },
        {
            id: "plantain", name: "Plantain", category: "fruits", emoji: "🍌", price: 3000, unit: "bunch", minQty: 1,
            description: "Sample plantain sold per bunch.", note: "Bunch sizes vary."
        },
        {
            id: "bulk-rice", name: "Rice, Bulk Sack", category: "bulk", emoji: "🌾", price: 190000, unit: "sack", minQty: 1,
            description: "Sample bulk sack for businesses.", note: "Sack weight confirmed by the business."
        },
    ],

    categories: [
        { id: "all", name: "All Sections" },
        { id: "grains", name: "Grains and Staples" },
        { id: "bulk", name: "Bulk and Wholesale Supply" },
        { id: "fruits", name: "Fruits", img: "./assets/images/3d-fruits.png", featured: true, dataset: "fruits" },
        { id: "poultry", name: "Poultry", img: "./assets/images/3d-chicken.png", featured: true, dataset: "poultry" },
        { id: "livestock", name: "Livestock", img: "./assets/images/3d-goat.png", featured: true, dataset: "livestock" },
        { id: "frozen", name: "Frozen Foods", img: "./assets/images/3d-frozen-meat.png", featured: true, dataset: "frozen" },
        { id: "produce", name: "Fresh Produce", img: "./assets/images/3d-produce-box.png", featured: true, dataset: "produce" },
        { id: "tubers", name: "Tubers and Roots", img: "./assets/images/3d-tubers_roots.png", featured: true, dataset: "tubers_roots" },
    ],

    steps: [
        { step: "Make a Choice", howTo: "Add products and quantities to your cart.", illustr: "./assets/illustrations/add-to-cart.svg", },
        { step: "Send your order", howTo: "Share it on WhatsApp or by email. This submits a request only.", illustr: "./assets/illustrations/email-capture.svg", },
        { step: "We Confirm", howTo: "HarvestHub confirms stock, final price, payment and delivery or collection with you.", illustr: "./assets/illustrations/confirmed.svg", }
    ],

    order: [
        { id: "featured", label: "Featured", sortBy: (a, b) => Number(!!b.featured) - Number(!!a.featured) },
        { id: "name", label: "Name: A-Z", sortBy: (a, b) => a.name.localeCompare(b.name) },
        { id: "high", label: "Price: High to Low", sortBy: (a, b) => b.price - a.price },
        { id: "low", label: "Price: Low to High", sortBy: (a, b) => a.price - b.price },
    ],

};