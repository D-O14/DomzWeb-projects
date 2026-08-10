import "./carousel.css";
import { icons } from "@assets/Icons/icons.js";
import { createTemplate, createStyle } from "@utils/component.js";

const carouselItems = [
    { img: "../../Assets/Images/pic_unsplash(6).jpg", name: "Special Pizza", price: "", },
    { img: "../../Assets/Images/pic_unsplash(3).jpg", name: "Straw Cake", price: "", },
    { img: "../../Assets/Images/pic_unsplash(1).jpg", name: "Vanilla Cake", price: "", },
    { img: "../../Assets/Images/pic_unsplash(2).jpg", name: "Meatball", price: "", },
    { img: "../../Assets/Images/pic_unsplash(4).jpg", name: "Burger", price: "", },
]

function updateCarousel() {
    cards.forEach(card => {
        card.classList.remove("active");
    });
    cards[currentIndex].classList.add("active");
    cards[currentIndex].scrollIntoView({
        behavior: "smooth",
        inline: "center"
    });
};

let autoPlay = setInterval(() => {
    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    };
    updateCarousel();
}, 2000);

carousel.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
});

carousel.addEventListener("mouseleave", () => {
    autoPlay = setInterval(nextSlide(), 2000);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel();
        indicators.forEach(indicator => {
            indicator.classList.remove("active");
        });

        indicators[index].classList.add("active");
    });
});


next.addEventListener("click", () => { nextSlide() });
prev.addEventListener("click", () => { prevSlide() });

function nextSlide() {
    currentIndex++;
    if (currentIndex >= cards.length) {
        currentIndex = 0;
    }
    updateCarousel();
}

function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = cards.length - 1;
    }
    updateCarousel();
};

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        currentIndex++;
        if (currentIndex >= cards.length) {
            currentIndex = 0;
        };
        updateCarousel();
    }

    if (e.key === "ArrowLeft") {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        };
        updateCarousel();
    }
});