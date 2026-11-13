import "./cravory.css";
import { config } from "./modules/config";
import { Button } from "@components/button/button.js";
import { Input } from "@components/form/input/input.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import { $, parseHTML, initializeActions } from "@utils/DOM.js";

const actions = {};
const pages = {};

function NavBar(config) { return parseHTML(``) };

function Footer(config) {
    return `
    <div class="footer-grid">
    <div>
        <h2>${ config.brandName }</h2>
        <p class="footer-content">
            Cravory, your ultimate destination for artisanal delights delivered right to your doorstep. Explore our curated
            selection of handcrafted pastries, breads, and cakes, crafted with care and delivered fresh to you.
        </p>
    </div>

    <div>
        <h4>Get in Touch</h4>
        <div class="contact">
            <a href="#">
                <span class="icon" data-icon="location"></span>
                <span>${ config.address }</span>
            </a>
            <a href="#">
                <span class="icon" data-icon="email"></span>
                <span>${ config.contact.email }</span>
            </a>
            <a href="#">
                <span class="icon" data-icon="phone"></span>
                <span>${ config.contact.phoneNumber }</span>
            </a>
        </div>
    </div>

    <div>
        <h4>Links</h4>
        <div>
            ${ config.links.map(link => {
            return `
                <a href="${ link.path }">${ link.anchor }</a>
            `}).join("") }
        </div>
    </div>

    <div>
        <menu>
        ${ config.socials.map(social => {
                return `
            <a href="${ social.path }" title="${ social.name }" aria-label="Link to cravory's ${ social.name } account">
                <span class="icon" data-icon="${ social.icon }"></span>
            </a>
        `}).join("") }
        </menu>
        <p class="footer-contact-info">
            Join our community and transform your 
            space with the beauty of plants.
        </p>
    </div>
    </div>`
};

function Slider(config) {
    return `
    ${ config.categories.filter(category => category.featured).map((category) => `
        <div class="category">
            <a href="#/products-page?category=${ category.id }" class="category-img" data-category="${ category.id }"> 
                <img class="category-display-img" src="${ category.img }" alt="">
            </a>
            <span class="category-name">${ category.name }</span>
        </div>`).join("") }`;
};

function ProductCard(config) { return parseHTML(``) };
function TestimonialCard(config) { return parseHTML(``) };
function TestimonialSlider(config) { return parseHTML(``) };

function homePage() {
    return `
    <section class="hero-section two-column" id="hero">
        <div class="hero-content">
            <h1 class="hero-header">Freshly Baked Delights, Every Day</h1>
            <p class="hero-text">
                Discover the magic of freshly baked goodness. Handcrafted with love and the finest
                ingredients. Delight in every bite, every day
            </p>
            <menu class="hero-actions">
                <a href="#/page/products-page" class="btn main-hero-btn">Shop Now</a>
                <a href="#/page/branches" class="btn secondary-hero-btn">Explore nearest store</a>
            </menu>
        </div>
        <figure class="hero-img">
            <img src="${ config.heroImg }" alt="">
        </figure>
    </section>
    
    <section class="categories-section" id="categories">
        <h2 class="section-header">Explore Products of different variations</h2>
        <div class="categories">
            ${ Slider(config) }
        </div>
    </section>
    
    <section class="two-column form-section" id="form">
        <div class="section-content">
            <h2>Daily Dough</h2>
            <p class="section-text">
                Subscribe and experience the convenience of freshly baked goods delivered
                right to your doorstep every day.
            </p>
            <a href="" class="btn">Learn More</a>
        </div>
        <figure class="section-img">
            <img src="." alt="">
        </figure>
    </section>
    
    <section class="about-section" id="about">
        <div class="section-content">
            <h2>Baked Fresh For You, Straight From The Oven</h2>
            <p class="section-text">
                From our oven to your doorstep, each bite is a testament to our commitment to
                quality and taste with every order. Experience the joy of indulging in bakery treats that are both
                comforting and delicious, making every moment a celebration of flavor.
            </p>
            <a href="" class="btn">Read More</a>
        </div>
        <figure class="section-img">
            <img src="." alt="">
        </figure>
    </section>`;
};

function router() { };

function renderApp() {
    $("site").innerHTML = homePage();
    $("siteHeader").append(NavBar(config));
    $("siteFooter").innerHTML = Footer(config);
    initializeIcons();
    initializeActions();
};

renderApp();