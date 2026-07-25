import { icons } from "../../../Assets/Icons/icons.js"; 

const app = document.getElementById("app");
const dashboardTemplate = document.getElementById("dashboard-template");
const ordersTemplate = document.getElementById("orders-template");
const settingsTemplate = document.getElementById("settings-template");
const productsTemplate = document.getElementById("products-template");
const storeTemplate = document.getElementById("store-template");
const inventoryTemplate = document.getElementById("inventory-template");
const helpTemplate = document.getElementById("help-template");
const accountsTemplate = document.getElementById("accounts-template");
const analyticsTemplate = document.getElementById("analytics-template");

const currentPage = window.location.pathname.split("/").pop();
const linkTemplate = document.createElement("template");
linkTemplate.className = "link-template";
linkTemplate.innerHTML = `
    <li class="link">
        <a href="">
            <span class="icon"></span>
            <span class="text"></span>
        </a>
    </li>
`;
const sidebarTemplate = document.createElement("template");
sidebarTemplate.className = "sidebar-template";
sidebarTemplate.innerHTML = `
        <nav class="sidebar">
            <li class="sidebar-logo">
                <span class="logo">DomzWeb</span>
                <button id="toggle-btn" class="toggle-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="lucide panel">
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M9 3v18" />
                    </svg>
                </button>
            </li>
            <div class="active-indicator"></div>
            <ul class="menu-dashboard"></ul>
            <ul class="menu-dropdown"></ul>
            <ul class="menu-actions"></ul>
            </nav>
`

const sidebarLinks = [
    { title: "Dashboard", icon: icons.dashboard, path: "/DomzWeb-projects/Dashboard", className: "active", menu: "dashboard" },
    { title: "Orders", icon: icons.receipt, path: "/DomzWeb-projects/Orders", menu: "dashboard" },
    { title: "Products", icon: icons.block, path: "/DomzWeb-projects/Products", menu: "dashboard" },
    { title: "Inventory", icon: icons.inventory, path: "/DomzWeb-projects/Inventory", menu: "dashboard" },
    { title: "Online Store", icon: icons.store, path: "/DomzWeb-projects/Store", menu: "dashboard" },
    { title: "Analytics", icon: icons.barChart, path: "/DomzWeb-projects/Analytics", menu: "dropdown" },
    { title: "Settings", icon: icons.settings, path: "/DomzWeb-projects/Settings", menu: "actions" },
    { title: "Help & Support", icon: icons.question, path: "/DomzWeb-projects/Help&Support", menu: "actions" },
    { title: "Accounts", icon: icons.profile, path: "/DomzWeb-projects/Accounts", menu: "actions" },
];

const routes = {
    "/DomzWeb-projects/Dashboard": {
        render: showDashboard,
        title: "Dashboard"
    },
    "/DomzWeb-projects/Orders": {
        render: showOrders,
        title: "Orders"
    },
    "/DomzWeb-projects/Settings": {
        render: showSettings,
        title: "Settings"
    },
    "/DomzWeb-projects/Store": {
        render: showStore,
        title: "Online Store"
    },
    "/DomzWeb-projects/Accounts": {
        render: showAccounts,
        title: "Your Accounts"
    },
    "/DomzWeb-projects/Analytics": {
        render: showAnalytics,
        title: "Analytics"
    },
    "/DomzWeb-projects/Help&Support": {
        render: showHelp,
        title: "Help & Support"
    },
    "/DomzWeb-projects/Products": {
        render: showProducts,
        title: "Products"
    },
    "/DomzWeb-projects/Inventory": {
        render: showInventory,
        title: "Inventory"
    },
}

function renderPage(template) {
    const page = template.content.cloneNode(true);
    app.replaceChildren(page);
}

function showDashboard() { renderPage(dashboardTemplate) };
function showOrders() { renderPage(ordersTemplate) };
function showSettings() { renderPage(settingsTemplate) };
function showProducts() { renderPage(productsTemplate) };
function showInventory() { renderPage(inventoryTemplate) };
function showStore() { renderPage(storeTemplate) };
function showAccounts() { renderPage(accountsTemplate) };
function showAnalytics() { renderPage(analyticsTemplate) };
function showHelp() { renderPage(helpTemplate) };

function router() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/DomzWeb-projects/"];
    document.title = route.title;
    document.startViewTransition(() => {
        route.render();
    })
}

window.addEventListener("popstate", () => { router() });
//router();

function sideBar(array, template, menus) {
    array.forEach(arr => {
        const item = template.content.cloneNode(true);
        const list = item.querySelector("li");
        const anchor = item.querySelector("a");
        const icon = anchor.querySelector(".icon");
        anchor.href = arr.path;
        icon.innerHTML = arr.icon;
        if (arr.className) { list.classList.add(arr.className) };
        item.querySelector(".text").textContent = arr.title;
        menus[arr.menu].append(item)
    });
}

class AppSidebar extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("link");
        style.rel = "preload";
        style.as = "style";
        style.onload = function () { this.rel = "stylesheet" };
        style.href = "sidebar.css";
        const sidebar = sidebarTemplate.content.cloneNode(true);
        shadow.append(style);
        shadow.append(sidebar);

        const nav = shadow.querySelector(".sidebar");
        const indicator = shadow.querySelector(".active-indicator");
        const toggleBtn = shadow.querySelector(".toggle-btn");
        const dashboardMenu = shadow.querySelector(".menu-dashboard");
        const dropdownMenu = shadow.querySelector(".menu-dropdown");
        const actionsMenu = shadow.querySelector(".menu-actions");

        const menus = {
            dashboard: dashboardMenu,
            dropdown: dropdownMenu,
            actions: actionsMenu,
        }

        sideBar(sidebarLinks, linkTemplate, menus);

        /*const active = shadow.querySelector(".active");
        indicator.style.top = active.offsetTop + "px";
        indicator.style.height = active.offsetHeight + "px";*/

        const anchors = shadow.querySelectorAll("a");
        anchors.forEach(a => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                const href = a.getAttribute("href");
                history.pushState({}, "", href);
                router();
            });
        })

        const links = shadow.querySelectorAll(".link");
        links.forEach(link => {
            link.classList.remove("active");
            const href = link.querySelector("a").getAttribute("href");
            if (href === currentPage) {
                link.classList.add("active");
                indicator.style.top = `${ link.offsetTop }px`;
                indicator.style.height = `${ link.offsetHeight }px`;
            }

            link.addEventListener("click", () => {
                links.forEach(link => { link.classList.remove("active") });
                link.classList.add("active");
                indicator.style.top = `${ link.offsetTop }px`;
                indicator.style.height = `${ link.offsetHeight }px`;
                indicator.classList.add("moving");
                setTimeout(() => {
                    indicator.classList.remove("moving");
                }, 300);
            });
        })

        toggleBtn.addEventListener("click", () => {
            nav.classList.toggle("collapsed");
        });
    }
}

customElements.define("app-sidebar", AppSidebar);
export default AppSidebar;