import "./toast.css";
import "@styles/tailwindcss/output.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const button = document.querySelector("button");
const toast = document.querySelector(".toast");
const close = document.querySelector(".close");
const progress = document.querySelector(".progress");

button.addEventListener("click", () => {
    toast.classList.add("visible");
    setTimeout(() => {
        toast.classList.add("hide");
    }, 5000);
    setTimeout(() => {
        toast.classList.remove("visible");
    }, 5300);
});

close.addEventListener("click", () => {
    toast.classList.add("hide");
});

initializeIcons(document);