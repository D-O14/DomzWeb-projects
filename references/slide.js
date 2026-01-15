const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("active");
	nav.classList.toggle("active");
});

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

var sliderNav = (manual) => {
	btns.forEach((btn) => {
		btn.classList.remove("active");
	});

	slides.forEach((slide) => {
		slide.classList.remove("active");
	});

	contents.forEach((content) => {
		content.classList.remove("active");
	});

	btns[manual].classList.add("active");
	slides[manual].classList.add("active");
	contents[manual].classList.add("active");
};

btns.forEach((index, btn) => {
	btn.addEventListener("click", () => {
		sliderNav(i);
	});
});
