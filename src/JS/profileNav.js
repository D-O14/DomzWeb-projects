const navMenu = document.getElementById("nav-list");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

const links = document.querySelectorAll("a");
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
    })
});

const navItems = document.querySelectorAll(".nav-item");
const linkAction = () => { navMenu.classList.remove("show-menu") };
navItems.forEach(navItem => { navItem.addEventListener("click", () => { linkAction() }) });


if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add("show-menu");
    })
};

if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu")
    })
};

const showDropdown = (dropdownId) => {
    const dropdown = document.getElementById(dropdownId)
    dropdown.addEventListener("click", () => {
        dropdown.classList.toggle("show")
    })
};

showDropdown("dropdown");