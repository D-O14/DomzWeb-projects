import "./bakery.css";

let timeout;
let inCart = false;

const title = document.title;
const line = document.querySelector(".line");
const toast = document.querySelector(".toast");
const links = document.querySelectorAll(".link");
const loader = document.querySelector(".loader");
const progress = document.querySelector(".progress");
const cardBtn = document.querySelectorAll(".cardBtn");
const closeBtn = document.querySelector(".icon-close");
const message = document.querySelector(".toast-message");

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => { loader.classList.add("loader-hidden") }, 3000);
    loader.addEventListener("transitionend", () => { loader.remove() });
});

document.addEventListener("visibilitychange", function () {
    document.visibilityState === "hidden" ? document.title = "Oy! You aren't finished here!" : document.title = title;
});

for (const button of cardBtn) { 
    button.addEventListener("click", () => {
        inCart = !inCart;
        const product = button.dataset.product;
        if (inCart) {
            button.textContent = "Added to Cart";
            showToast(`${ product } added to cart`);
        } else {
            button.textContent = "Add to Cart";
            showToast(`${ product } removed from cart`);
        };
    })
};

for (const link of links) { 
    link.addEventListener("click", (e) => {
        e.preventDefault();
        links.forEach(link => { link.classList.remove("active") })
        link.classList.add("active")
        line.style.width = e.target.offsetWidth + "px";
        line.style.left = e.target.offsetLeft + "px";
    });
};

closeBtn.addEventListener("click", () => { clearTimeout(timeout); hideToast() });

function showToast(content) {
    clearTimeout(timeout);
    message.textContent = content;
    toast.classList.remove("hide", "show");
    progress.classList.remove("active");
    void toast.offsetWidth;
    setTimeout(() => { toast.classList.add("show"); progress.classList.add("active") }, 1000);
    timeout = setTimeout(() => { toast.classList.remove("show"); progress.classList.remove("active") }, 5000)
    timeout = setTimeout(hideToast, 5000);
};

function hideToast() {
    toast.classList.remove("show");
    toast.classList.add("hide");
    progress.classList.remove("active");
    setTimeout(() => { toast.classList.remove("hide") }, 400);
}