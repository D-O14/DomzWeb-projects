let index = 0;
const animDuration = 1000;
const sections = document.querySelectorAll("section");

document.addEventListener("DOMContentLoaded", () => {
    toggleText(index, "show");
});

window.addEventListener("wheel", (e) => {
    const delta = e.wheelDelta;
    const currentTime = new Date().getTime();
    if (delta < 0) {
        const nextClick = new Event("click");
        nextBtn.dispatchEvent(nextClick);
    } else {
        const prevClick = new Event("click");
        nextBtn.dispatchEvent(prevClick);
    }
 });

function toggleText(index, state) {
    if (state === "show") {
        sections.forEach((sect, i) => {
            if (i === index) {
                const text = sect.querySelector(".text");
                text.classList.add("show");
            };
        });
    } else {
        sections.forEach((sect, i) => {
            if (i === index) {
                const text = sect.querySelector(".text");
                text.classList.remove("show");
            }
        });
    };
};

const prevBtn = document.querySelector(".prev");
prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
        toggleText(index, "hide");
        index--;
        sections.forEach((sect, i) => {
            if (i === index) {
                toggleText(i, "show");
                sect.scrollIntoView({ behavior: "smooth" });
            }
        });
});

const nextBtn = document.querySelector(".next");
nextBtn.addEventListener("click", () => {
    if (index > 2) return;
    toggleText(index, "hide");
    index++;
    sections.forEach((sect, i) => {
        if (i === index) {
            toggleText(i, "show");
            sect.scrollIntoView({ behavior: "smooth" });
        }
    });
});