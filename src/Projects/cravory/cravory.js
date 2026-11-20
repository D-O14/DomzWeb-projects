import "./cravory.css";
import { config } from "./modules/config";
import { Button } from "@components/button/button.js";
import { Input } from "@components/form/input/input.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import { $, query, parseHTML, initializeActions } from "@utils/DOM.js";

let cart = [];

const actions = {
    showMenu: () => { query(".site-header").classList.toggle("hamburger") },
    sendEmail: (element) => {
        const form = element.closest(".email-form");
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            formData.append("access_key", "2754f49b-1543-4f88-bbde-f4298c06e99d");
            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();
                if (response.ok) { Toast({ content: "Success! Your message has been sent." }); form.reset() }
                else { Toast({ content: `Error: ${ data.message }` }) };
            } catch (error) {
                Toast({ content: "Something went wrong. Please try again." });
            };
        });
    },
};

const pages = {};

function Tab(links) {
    const tab = parseHTML(`<span class="tab"></span>`);
    for (const link of links) {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            links.forEach(link => { link.classList.remove("active") })
            link.classList.add("active");
            tab.style.width = `${ e.target.offsetWidth }px`;
            tab.style.left = `${ e.target.offsetLeft }px`;
        });
    };

    return tab;
};

function NavBar(config) {
    const navbar = parseHTML(`
        <nav class= "site-navbar">
          <a href="#/" class="logo">
            <span class="icon logo-icon" data-icon="${ config.logo }"></span>
            <span class="brand-name">
                <!--${ config.brandName }-->
                <span>
                    <span class="covered">Cra</span>vory
                </span>
                <small>
                    <span class="covered">Bak</span>ery & Cafe
                </small>
            </span>
            <span class="icon coffee-icon" data-icon="coffee"></span>
          </a>
          <div class="navbar">
            <ul class="nav-links">
            ${ config.links.map(navlink => {
        return `<li>
                <a href="${ navlink.path }" class="nav-item ${ navlink.className ? navlink.className : "" }">${ navlink.anchor }</a>
            </li>`
    }).join("") }
            </ul>
          </div>
          <menu class="nav-menu"></menu>
      </nav>`);

    const links = navbar.querySelectorAll("a");
    navbar.querySelector(".nav-menu").append(
        Button({ className: "user-btn", id: "", icon: "account", iconOnly: true, ariaLabel: "Become a user", attributes: ["title='Become a user'"] }),
        Button({ className: "cart-btn", id: "", icon: "shoppingCart", iconOnly: true, ariaLabel: "Open your cart", children: `<span class="cart-count" id="cartCount">${ cart.length }</span>` }),
        Button({ className: "nav-toggle", id: "", icon: "menubar", children: `<span class="icon close-icon" data-icon="close"></span>`, action: "showMenu", iconOnly: true, ariaLabel: "Toggle navbar menu" }),
    );
    navbar.querySelector(".nav-links").after(Tab(links));
    return navbar;
};

function Footer(config) {
    const footer = parseHTML(`
    <div class="footer-grid">
        <div>
            <h2>
                <span class="footer-icon" data-icon="coffee"></span>
                ${ config.brandName }
            </h2>
            <p class="footer-content">
                Your ultimate destination for artisanal delights delivered right to your doorstep. Explore our curated
                selection of handcrafted pastries, breads, and cakes, crafted with care and delivered fresh to you.
            </p>
        </div>

        <div>
            <h4>Pages</h4>
            <div>
                ${ config.links.map(link => {
        return `
                    <a href="${ link.path }">${ link.anchor }</a>
                `}).join("") }
            </div>
        </div>

        <div>
            <h4>Resources</h4>
            <div>
                ${ config.resources.map(link => {
            return `
                    <a href="${ link.path }">${ link.anchor }</a>
                `}).join("") }
            </div>
        </div>


        <div class="social-section">
            <menu>
            ${ config.socials.map(social => {
                return `
                <a href="${ social.path }" title="${ social.name }" aria-label="Link to cravory's ${ social.name } account">
                    <span class="social-icon ${ social.icon }-icon" data-icon="${ social.icon }"></span>
                </a>
            `}).join("") }
            </menu>
            <p class="footer-contact-info">
                Subscribe to Cravory Bakery & Cafe's newsletter and discover the delightful
                treats we have planned for you.
            </p>
            <form class="email-form"></form>
        </div>

    <div class="copyright">
        <p>&copy;2026 Cravory. All Rights Reserved</p>
        <small class="author">Made with motion</small>
    </div>
    </div>`);

    footer.querySelector(".email-form").append(
        Input({ id: "emailField", labelClass: "email-input", placeholder: "Your E-mail address", icon: "mail", className: "email-field" }),
        Button({ text: "Subscribe", className: "subscribe-btn" })
    );
    return footer;
};

function Slider(items) {
    return `
    ${ items.map((category) => `
        <div class="category">
            <a href="#/products-page?category=${ category.id }" class="category-img" data-category="${ category.id }"> 
                <img class="category-display-img" src="${ category.img }" alt="">
            </a>
            <span class="category-name">${ category.name }</span>
        </div>`).join("") }`;
};

function Chips() { };

function Carousel(config) { };

function imgDisplay(config = {}) {
    return `
    <figure class="${ config.className }">
        <img src="${ config.src ? config.src : "../../Assets/Illustrations/image-placeholder.svg" }" alt="${ config.alt ?? "" }" loading="${ config.loading ?? "lazy" }"
        ${ config.fetchpriority ? `fetchpriority="${ config.fetchpriority }"` : "" } decoding="async" 
        ${ config.dimensions ? `width="${ config.dimensions.width }" height="${ config.dimensions.height }"` : "width=100 height=100" }>
    </figure>`;
};

function ProductCard(product) {
    return `<article class= "product-card" data-product-id="${ product.id }" >
            <div class="card-header">
                <span class="product-category">${ product.category }</span>
                <a class="product-img" href="#/product/${ product.id }">
                    ${ imgDisplay({ className: "product-display", src: product.img, alt: `picture of ${ product.name }` }) }
                </a>
            </div>
            <div class="card-content">
                <div class="product-specs">
                    <h3 class="product-name">
                        <a href="#/product/${ product.id }">${ product.name }</a>
                    </h3>
                    <span class="product-price">$${ product.price }</span>
                </div>
                <menu class="card-actions"> 
                    <div class="product-ratings">⭐</div>
                    <button class="add-product-btn" data-product-id="${ product.id }" data-action="addToCart" aria-label="Add ${ product.name } to Cart">
                        <span class="icon plus-icon" data-icon="plus"></span>
                    </button>
                </menu>
            </div>
        </article>`;
};

function TestimonialCard(config) { return parseHTML(``) };
function TestimonialSlider(config) { return parseHTML(``) };

function homePage() {
    return `<section class="hero-section two-column" id="hero">
        <div class="hero-content">
            <small class="hero-subtext">Baked fresh. Made with love</small>
            <h1 class="hero-header">Freshly Baked Delights, Every Day</h1>
            <p class="hero-text">
                Discover the magic of freshly baked goodness. Handcrafted with love and the finest
                ingredients. Delight in every bite, every day.
            </p>
            <menu class="hero-actions">
                <a href="#/page/products-page" class="btn main-btn">
                    Order Now
                    <span class="icon" data-icon="goArrow"></span>
                </a>
                <a href="#/page/branches" class="btn secondary-btn">
                    Explore our menu
                    <span class="icon" data-icon="foodMenu"></span>
                </a>
            </menu>
        </div>
        ${ imgDisplay({ src: config.heroImg, className: "hero-img", fetchpriority: "high", loading: "eager" }) }
    </section>

    <section class="features-section">
        <div class="features wrapper">
        ${ config.features.map(feature => {
        return `<article class="feature">
                <span class="icon feature-icon" data-icon="${ feature.icon }"></span>
                <h2 class="feature-header">${ feature.header }</h2>
                <small class="feature-small">${ feature.small }</small>
                <p class="feature-content">${ feature.content }</p>
            </article>`
    }).join("") }
        </div>
    </section>

    <section class="section categories-section" id="categories">
        <h2 class="section-header">-Products and variations-</h2>
        <div class="categories">
            ${ Slider(config.categories) }
        </div>
    </section>

    <section class="specials-section">
        <div class="wrapper">
            <h2 class="section-header">-Our Most Loved Products-</h2>
            <div class="specials"></div>
        </div>
    </section>
    
    <section class="newsletter-section">
        <div class="wrapper two-column">
            <div class="section-content">
                <h2 class="section-header">-Get The Daily Dough-</h2>
                <p class="section-text">
                    Subscribe and experience the convenience of freshly baked goods delivered
                    right to your doorstep every day.
                </p>
                <a href="" class="secondary-btn btn">
                    Learn More
                    <span class="icon" data-icon="arrowRight"></span>
                </a>
            </div>
            <div class="column">
                ${ imgDisplay({ className: "section-img", src: "../../Assets/Images/3d-package.webp" }) }
                <form class="email-form">
                    <label for="emailField" class="email-input">
                        <span class="icon mail-icon" data-icon="mail"></span>
                        <input type="text" placeholder="Your E-mail address" id="emailField" class="email-field">
                    </label>
                    <button type="button" class="subscribe-btn">
                        <span class="text">Subscribe</span>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <section class="products-section" id="products">
    <div class="wrapper products">
        <h2 class="section-header spaced">
            -Most Popular Products-
            <a href="#/menu" class="btn view-btn">
                View Menu
                <span class="icon" data-icon="arrowRight"></span>
            </a>
        </h2>
        <div class="products-grid">
            ${ config.products.filter(product => product.popular).map((product) => {
        return ProductCard(product)
    }).join("") }
        </div>
    </div>
    </section>
    
    <section class="about-section two-column" id="about">
        ${ imgDisplay({ className: "about-img", src: config.aboutImg }) }
        <div class="section-content">
            <h2 class="section-header">Baked Fresh For You, Straight From The Oven</h2>
            <p class="section-text">
                From our oven to your doorstep, each bite is a testament to our commitment to
                quality and taste with every order. Experience the joy of indulging in bakery treats that are both
                comforting and delicious, making every moment a celebration of flavor.
            </p>
            <a href="" class="secondary-btn btn">
                Read More
                <span class="icon" data-icon="arrowRight"></span>
            </a>
        </div>
    </section>`;
};

function router() { };

function renderApp() {
    $("site").innerHTML = homePage();
    $("siteHeader").append(NavBar(config));
    $("siteFooter").append(Footer(config));
    initializeIcons();
    initializeActions(document, actions);
};

renderApp();