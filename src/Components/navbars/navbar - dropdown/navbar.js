import "./navbar.css";
import { initializeIcons } from "@assets/Icons/icons";

const main = query(document, "main");
const navTemplate = document.querySelector(".nav-template");
const btnTemplate = document.querySelector(".btn-template");
const linkTemplate = document.querySelector(".link-template");
const dropDownTemplate = document.querySelector(".dropdown-template");

const navData = {
    logo: "planet", brandName: "DomzWeb",
    links: [
        { anchor: "Home", path: "#", className: "active" },
        { anchor: "About", path: "#" },
        { anchor: "Services", path: "#" },
        { anchor: "Products", path: "#" },
    ],
    buttons: [
        { text: "Login", className: "login-btn" },
        { text: "Sign Up", className: "sign-up-btn" },
    ],
    dropdown: {
        anchor: "Contact", subLinks: [
            { icon: "instagram", anchor: "Instagram", path: "https://www.instagram.com/", className: "insta" },
            { icon: "gitHub", anchor: "Github", path: "https://github.com/", className: "git" },
            { icon: "phone", anchor: "Phone", path: "tel:+234 09164569891", className: "phone" },
            { icon: "email", anchor: "Email", path: "mailto: dominionogwai613@gmail.com", className: "email" },
        ]
    },
};

function query(root = document, selector) {
    const element = root.querySelector(selector);
    return element;
};

function adopt(root = document.body, element) {
    root.append(element);
};

function NavBar(navData) {
    main.replaceChildren();
    const nav = navTemplate.content.cloneNode(true);
    const logo = nav.querySelector(".logo");
    const navMenu = nav.querySelector(".nav-menu");

    showMenu(nav);
    navLinks(navData.links, query(nav, ".menu"));
    dropDown(query(nav, ".menu"), navData);
    menuButtons(navData, navMenu);

    logo.querySelector(".icon").dataset.icon = navData.logo;
    logo.querySelector(".brandName").textContent = navData.brandName;

    adopt(main, query(nav, "header"));
    initializeIcons(document);
};

function navLinks(navData, menu) {
    navData.forEach(navData => {
        const linkMenu = linkTemplate.content.cloneNode(true);
        const navLink = linkMenu.querySelector(".nav-link");

        navLink.href = navData.path;
        navLink.textContent = navData.anchor;
        if (navData.className) { navLink.classList.add(navData.className) };
        navLink.addEventListener("click", (e) => { switchActive(e, navLink) });

        menu.insertBefore(linkMenu, query(menu, ".dropdown"));
    });
}

function showMenu(nav) {
    const toggle = query(nav, ".nav-toggle");
    const navBar = query(nav, ".nav"); 
    toggle.addEventListener("click", () => {
        navBar.classList.toggle("show-nav");
        toggle.classList.toggle("show-icon");
    });
}

function switchActive(e, navLink) {
    e.preventDefault();
    document.querySelector(".active").classList.remove("active");
    navLink.classList.add("active");
};

function dropDown(menu, navData) { 
    const dropdown = menu.querySelector(".dropdown");
    dropdown.querySelector(".nav-link").textContent = navData.dropdown.anchor;
    dropDownLinks(query(menu, ".dropdown-menu"), navData.dropdown.subLinks);
};

function dropDownLinks(menu, subLinks) {
    subLinks.forEach(subLink => {
        const dropDown = dropDownTemplate.content.cloneNode(true);
        const dropDownLink = dropDown.querySelector(".dropdown-link");
        const dropDownSubLink = dropDownLink.querySelector(".sub-link");
        const linkIcon = dropDownLink.querySelector(".icon");

        dropDownLink.href = subLink.path;
        linkIcon.dataset.icon = subLink.icon;
        linkIcon.classList.add(subLink.className);
        dropDownSubLink.textContent = subLink.anchor;

        menu.append(dropDown);
    });
};

function menuButtons(navData, menu) {
    navData.buttons.forEach(button => { 
        const menuBtn = btnTemplate.content.cloneNode(true); 
        const btn = menuBtn.querySelector(".btn");

        btn.textContent = button.text;
        btn.classList.add(button.className);

        menu.append(btn);
    });
};

NavBar(navData);