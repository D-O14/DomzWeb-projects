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

const icons = {
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide dashboard">
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>`,
    receipt: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide receipt">
            <path d="M13 16H8" />
            <path d="M14 8H8" />
            <path d="M16 12H8" />
            <path
                d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z" />
        </svg>`,
    block: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide block">
            <path
                d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2" />
            <rect x="14" y="2" width="8" height="8" rx="1" />
        </svg>`,
    inventory: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide package">
            <path
                d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
            <path d="M12 22V12" />
            <polyline points="3.29 7 12 12 20.71 7" />
            <path d="m7.5 4.27 9 5.15" />
        </svg>`,
    settings: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide cog">
            <path d="M11 10.27 7 3.34" />
            <path d="m11 13.73-4 6.93" />
            <path d="M12 22v-2" />
            <path d="M12 2v2" />
            <path d="M14 12h8" />
            <path d="m17 20.66-1-1.73" />
            <path d="m17 3.34-1 1.73" />
            <path d="M2 12h2" />
            <path d="m20.66 17-1.73-1" />
            <path d="m20.66 7-1.73 1" />
            <path d="m3.34 17 1.73-1" />
            <path d="m3.34 7 1.73 1" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="12" r="8" />
        </svg>`,
    question: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide question">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
        </svg>`,
    profile: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide user">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
        </svg>`,
    barChart: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide bar-chart">
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="M7 16h8" />
            <path d="M7 11h12" />
            <path d="M7 6h3" />
        </svg>`,
    store: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide store">
            <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
            <path
                d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244" />
            <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
        </svg>`,
}

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
    try {
        route.render();   
    } catch (err) {
        console.log(err)
    }
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