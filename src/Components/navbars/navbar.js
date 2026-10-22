import "./navbar.css";
import "@styles/tailwindcss/output.css";
import { query } from "@utils/utilities";
import { initializeIcons } from "@assets/Icons/icons";
import { createStyle, createTemplate } from "@utils/component";

const navTemplate = createTemplate(
    `<header part="header"> 
    <nav part="nav">
        <a href="" class="logo" part="logo">
            <span class="icon planet-icon" data-icon=""></span>
            <span class="brandName"></span>
        </a>
        <div class="nav" id="nav">
            <ul class="menu">
                <slot name="dropdown" class="dropdown">
                
                </slot>
            </ul>
            <slot name="menu"></slot>
        </div>

        <div class="nav-toggle" id="nav-toggle">
            <span class="icon bar-icon" data-icon="menu"></span>
            <span class="icon close-icon" data-icon="close"></span>
        </div>
    </nav>
</header>`
);
const linkTemplate = createTemplate(
    `<li>
    <a href="#" class="menu-item" part="navlink">
        <span class="icon arrow-icon" part="linkicon" data-icon="goArrow"></span>
        <span class="anchor">Catalogue</span>
    </a>
</li>`
);

const navData = {
    links: [
        { anchor: "Home", path: "#", className: "active" },
        { anchor: "About", path: "#" },
        { anchor: "Services", path: "#" },
        { anchor: "Products", path: "#" },
    ],
};

export class NavBar extends HTMLElement {
    constructor() {
        super();

        this._navData = {
            links: []
        };

        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./navbar.css", import.meta.url);

        this.nav = navTemplate.content.cloneNode(true);
        this.navBar = query(this.nav, ".nav");
        this.header = query(this.nav, "header");
        this.linkMenu = query(this.nav, ".menu");
        this.toggle = query(this.nav, ".nav-toggle");
        this.brandName = query(this.nav, ".brandName");
        this.navIcon = query(this.nav, ".planet-icon");
        this.navMenu = query(this.nav, "[name='menu']");
        this.dropdown = query(this.nav, "[name='dropdown']");
        this.dropDownMenu = query(this.nav, ".dropdown-menu");
        shadow.append(style, this.header);
    }

    connectedCallback() {
        this.navIcon.dataset.icon = this.getAttribute("logo") || "";
        this.brandName.textContent = this.getAttribute("brandname") || "";

        this.renderNavBar();
        initializeIcons(this.shadowRoot);
    };

    set navData(value) {
        this._navData = value;
        this.renderNavBar();
    };
    get navData() { return this._navData };

    renderNavBar() { 
        this.renderLinks();
        this.showSideBar();
    };

    renderLinks() {
        this.navData.links.forEach(navData => {
            this.link = linkTemplate.content.cloneNode(true);
            this.navLink = query(this.link, ".menu-item");
            const linkIcon = query(this.link, ".icon");

            this.navLink.href = navData.path;
            this.navLink.querySelector(".anchor").textContent = navData.anchor;
            if (navData.icon) { linkIcon.dataset.icon = navData.icon };
            if (navData.className) { this.navLink.classList.add(navData.className) };
            this.navLink.addEventListener("click", (e) => { 
                e.preventDefault();
                this.shadowRoot.querySelector(".active").classList.remove("active");
                this.navLink.classList.add("active");
            });

            this.linkMenu.insertBefore(this.link, this.dropdown);
        });
    };

    showSideBar() {
        this.toggle.addEventListener("click", () => {
            this.navBar.classList.toggle("show-nav");
            this.toggle.classList.toggle("show-icon");
        });
    };

};

const navBar = query(document, "nav-bar");
navBar.navData = navData;

customElements.define("nav-bar", NavBar);