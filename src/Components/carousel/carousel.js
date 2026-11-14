import { doc } from "prettier";
import "./carousel.css";
import { parseHTML, initializeActions, queryAll } from "@utils/DOM.js";
/*import { icons } from "@assets/Icons/icons.js";
import { createTemplate, createStyle } from "@utils/component.js";*/

const carouselItems = [
    { img: "../../Assets/Images/pizza-slices.webp", name: "Deluxe Pizza", price: 20, rating: 4.5 },
    { img: "../../Assets/Images/strawberry-cake.webp", name: "Strawberry Cake", price: 20, rating: 4.5},
    { img: "../../Assets/Images/healthy-toast.webp", name: "Healthy Toast", price: 20, rating: 4.5 },
    { img: "../../Assets/Images/pastry-rolls.webp", name: "Pastry rolls", price: 20, rating: 4.5 },
    { img: "../../Assets/Images/pancakes.webp", name: "Pancakes", price: 20, rating: 4.5 },
];

const cards = document.querySelectorAll(".carousel-item");

let currentIndex = 2;
let autoPlay = setInterval(() => {
    currentIndex++;
    if (currentIndex >= queryAll(".card").length) { currentIndex = 0 };
    updateCarousel();
}, 4000);

const actions = {
    slideToNext: () => {
        currentIndex++;
        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }
        updateCarousel();
    },

    slideToPrev: () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }
        updateCarousel();
    },
};

const carousel = document.querySelector(".carousel");
const indicators = document.querySelectorAll(".indicator");

carousel.addEventListener("mouseenter", () => { clearInterval(autoPlay) });
carousel.addEventListener("mouseleave", () => { autoPlay = setInterval(actions.slideToNext(), 2000) });
indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        indicators.forEach(indicator => { indicator.classList.remove("active") });
        indicators[index].classList.add("active");
    });
});
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        currentIndex++;
        if (currentIndex >= cards.length) { currentIndex = 0 };
        updateCarousel();
    };

    if (e.key === "ArrowLeft") {
        currentIndex--;
        if (currentIndex < 0) { currentIndex = cards.length - 1 };
        updateCarousel();
    };
});


function Carousel(items, config = {}) {
    const state = {
        autoPlayId: "",
        currentIndex: config.initialIndex
    };

    const lifecycles = {
        create: () => {
            return items.map((item, index) => {
                return parseHTML(`<article class="carousel-item">
                <figure class="item-display">
                    <img class="item-img" src="${ item.img }" alt="${ item.desc }" decoding="async"
                    loading="lazy">
                </figure>
                <div class="item-info">
                    <h1>${ item.name }</h1>
                    ${ item.rating ? `<span class="rating">${ item.rating }&star;</span>` : "" }
                </div>
                ${ item.price ? `<span class="price">$${ item.price }</span>` : "" }
            </article>
            
            <menu class="controls">
                <button class="prevBtn">&#10094;</button>
                <menu class="indicators">
                    <button class="indicator" aria-label="Go to slide ${ index }">
                        <span></span>
                    </button>
                </menu>
                <button class="nextBtn">&#10095;</button>
            </menu>`)
            }).join("");
        },
        update: () => {
            items.forEach(item => { item.classList.remove(config.viewClass) });
            items[state.currentIndex].classList.add(config.viewClass);
            items[state.currentIndex].scrollIntoView({
                behavior: config.scrollBehavior,
                inline: config.scrollInline
            });
        },
    };

    const events = {
        autoPlay: () => {
            state.autoPlayId = setInterval(() => {
                state.currentIndex++;
                if (state.currentIndex >= items.length) { state.currentIndex = 0 };
                lifecycles.update();
            }, config.autoPlayTimer);
        },

        slideToNext: () => {
            state.currentIndex++;
            if (state.currentIndex >= items.length) { state.currentIndex = 0 };
            lifecycles.update();
        },

        slideToPrev() {
            state.currentIndex--;
            if (state.currentIndex < 0) { state.currentIndex = items.length - 1 };
            lifecycles.update();
        },
    };

    if (config.autoPlay === true) { events.autoPlay() };
    return lifecycles.create();
};

function updateCarousel() {
    cards.forEach(card => { card.classList.remove("active") });
    cards[currentIndex].classList.add("active");
    cards[currentIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center"
    });
};

/*Carousel(carouselItems, {
    autoPlay: true, scrollBehavior: "smooth",
    scrollInline: "center", autoPlayTimer: 4000, initialIndex: 2
});*/

initializeActions(document, actions);