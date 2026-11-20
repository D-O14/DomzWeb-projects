export const config = {
    heroImg: "../../Assets/Images/3d-bread.webp",
    aboutImg: "../../Assets/Images/cupcake.webp",
    brandName: "Cravory", logo: "croissant",
    address: "8819 Ohio St. South Gate, CA 90280",
    contact: {
        wa: "+234 486 686 3295",
        email: "cravory@gmail.com",
        phoneNumber: "+234 486 686 3295"
    },
    socials: [
        { name: "Twitter", path: "https://x.com", icon: "twitter" },
        { name: "Facebook", path: "https://facebook.com", icon: "facebook" },
        { name: "Instagram", path: "https://instagram.com", icon: "instagram" },
    ],
    links: [
        { anchor: "Home", path: "#", className: "active" },
        { anchor: "Products", path: "#" },
        { anchor: "Our Story", path: "#" },
        { anchor: "Reservations", path: "#" },
        { anchor: "Partners", path: "#" },
    ],
    features: [
        { icon: "sprout", header: "100%", small: "Arabica Beans", content: "Premium quality in each flavor" },
        { icon: "coffee", header: "Freshly Brewed", small: "Every Day", content: "Crafted with care" },
        { icon: "heart", header: "Cozy Ambience", small: "& Great Vibes", content: "The perfect place to unwind" },
        { icon: "people", header: "5k+", small: "Happy Customers", content: "And counting..." },
    ],
    products: [
        { id: "matcha-latte", name: "Matcha Latte", price: 4.20, category: "Coffee", desc: "", img: "", stars: "" },
        { id: "capuccino", name: "Capuccino", price: 3.80, category: "Coffee", desc: "", img: "https://res.cloudinary.com/rkevllcx/image/upload/f_auto,q_auto/coffee-glass", stars: "", popular: true },
        { id: "iced-latte", name: "Iced Latte", price: 4.00, category: "Cold Drink", desc: "", img: "../../Assets/Images/side-view-macchiato.webp", stars: "", popular: true },
        { id: "mocha-frappe", name: "Mocha Frappe", price: 4.80, category: "Coffee", desc: "", img: "../../Assets/Images/spiced-latte.webp", stars: "", popular: true },
        { id: "choco-cake", name: "Chocolate Cake", price: 3.25, category: "Sweets", desc: "", img: "../../Assets/Images/seasoned-cappucino.webp", stars: "", popular: true },
        { id: "caramel-macchiato", name: "Caramel Macchiato", price: 4.50, category: "Cold Drink", desc: "", img: "../../Assets/Images/chocolate-drink.webp", stars: "", popular: true },
        { id: "strawberry-cake", name: "Strawberry-topped Cake", price: 3.45, category: "Sweets", desc: "", img: "../../Assets/Images/cup-cappuccino.webp", stars: "", popular: true },
    ],
    categories: [
        { id: "specials", name: "Specials", img: "../../Assets/Images/3d-croissant.webp" },
        { id: "p&s", name: "Pastries & Sweets", img: "../../Assets/Images/3d-doughnut.webp" },
        { id: "cookies", name: "Cookies", img: "../../Assets/Images/3d-choco-cookie.webp" },
        { id: "cakes", name: "Cakes", img: "../../Assets/Images/cupcake.webp" },
        { id: "breads", name: "Breads", img: "../../Assets/Images/3d-bread-slices.webp" },
    ],
    resources: [
        { anchor: "Contact Us", path: "#" },
        { anchor: "Privacy Policy", path: "#" },
        { anchor: "Reservation Policy", path: "#" },
        { anchor: "Terms & Conditions", path: "#" },
        { anchor: "Licensing", path: "#" },
    ],
    testimonials: [
        { name: "", img: "", review: "" },
        { name: "", img: "", review: "" },
        { name: "", img: "", review: "" },
    ],
};