import "./demo.css";
import { initializeIcons } from "@assets/Icons/icons";

const links = document.querySelectorAll("a");
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
    })
})

const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");

navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show-menu");
    navToggle.classList.toggle("show-icon");
});

initializeIcons(document);