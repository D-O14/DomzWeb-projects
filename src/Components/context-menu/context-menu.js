import "./context-menu.css";
import { copy } from "@utils/utilities.js";
import { icons } from "@assets/Icons/icons.js";
import { createStyle, createTemplate } from "@utils/component.js";

const template = createTemplate(
    `<menu class="menu menu-hidden" role="menu">
        <ul class="menu-list primary" role="group"></ul>
        <ul class="menu-list secondary" role="group"></ul>
        <ul class="menu-list danger" role="group"></ul>
    </menu>
    <li class="menu-item" role="item">
        <button class="menu-btn">

        </button>
    </li>`
);

const card = document.querySelector(".card");
const menuItem = template.content.cloneNode(true);
const menu = menuItem.querySelector("menu");
const url = location.href;

const groups = {
    danger: menuItem.querySelector(".danger"),
    primary: menuItem.querySelector(".primary"),
    secondary: menuItem.querySelector(".secondary"),
};

const menuItems = [
    { label: "Share", icon: icons.share, section: "primary" },
    { label: "Edit", icon: icons.edit, section: "primary" },
    { label: "Copy Link", icon: icons.link, section: "secondary", className: "copy-link", action: () => { copy(url) } },
    { label: "Move to", icon: icons.folder, section: "secondary" },
    { label: "Copy", icon: icons.copy, section: "secondary" },
    { label: "Archive", icon: icons.archive, section: "secondary" },
    { label: "View Details", icon: icons.exclaimOutline, section: "secondary" },
    { label: "Download", icon: icons.download, section: "secondary", className: "download" },
    { label: "Delete", icon: icons.delete, section: "danger", className: "delete" },
];

class ContextMenu extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./context-menu.css", import.meta.url);
        shadow.append(style);
        shadow.append(menu);

        menu.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") { // Next Item
                const buttons = [...menu.querySelectorAll(".menu-btn")];
                const current = this.shadowRoot.activeElement;
                const menuLi = current.closest("li");
                const currentIndex = buttons.indexOf(current);
                const nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
                if (current.hasAttribute("class")) { menuLi.classList.add("focused") };
                current.addEventListener("blur", () => { menuLi.classList.remove("focused") });
            }
            if (e.key === "ArrowUp") { // Previous Item
                const buttons = [...menu.querySelectorAll(".menu-btn")];
                const current = this.shadowRoot.activeElement;
                const menuLi = current.closest("li");
                const currentIndex = buttons.indexOf(current);
                const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[prevIndex].focus();
                if (current.hasAttribute("class")) { menuLi.classList.add("focused") };
                current.addEventListener("blur", () => { menuLi.classList.remove("focused") });
            }
            if (e.key === "Enter") { // Activate
                const menuBtn = this.shadowRoot.activeElement;
                const menuLi = menuBtn.closest("li");
                menuBtn.click();
                if (menuBtn.hasAttribute("class")) { menuLi.classList.add("focused") };
                menuBtn.addEventListener("blur", () => { menuLi.classList.remove("focused") });
            } if (e.key === "Escape") { // Close
                this.close(menu, e);
            }
        });
    }

    render(items) {
        items.forEach(item => {
            const menuItem = template.content.cloneNode(true);
            const menuBtn = menuItem.querySelector(".menu-btn");
            const menuLi = menuBtn.closest(".menu-item");
            menuBtn.addEventListener("click", () => { item.action() });
            if (item.className) { menuLi.classList.add(item.className) };
            menuBtn.innerHTML = `${ item.icon }${ item.label }`;
            groups[item.section].append(menuItem);
        });
    };

    show(menu) {
        menu.classList.remove("menu-hidden");
        menu.classList.add("menu-shown");
    };

    position(menu, e) {
        const { clientX, clientY } = e;
        const menuWidth = menu.offsetWidth;
        const menuHeight = menu.offsetHeight;
        const left = clientX + menuWidth > window.innerWidth ? clientX - menuWidth : clientX;
        const top = clientY + menuHeight > window.innerHeight ? clientY - menuHeight : clientY;
        menu.style.left = `${ left }px`;
        menu.style.top = `${ top }px`;
        //menu.style.transformOrigin = "top left";
    };

    close(menu, e) {
        if (!e.composedPath().includes(menu)) {
            menu.classList.remove("menu-shown");
            menu.classList.add("menu-hidden");
        };
    };
};

customElements.define("context-menu", ContextMenu);
export default ContextMenu;

const contextMenu = document.querySelector("context-menu");
contextMenu.render(menuItems);

card.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    contextMenu.show(menu);
    contextMenu.position(menu, e);
});

document.addEventListener("pointerdown", (e) => { contextMenu.close(menu, e) });
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Escape" && menu.classList.contains("menu-shown")) { contextMenu.close(menu, e) };
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") { location.reload() };
    if (e.shiftKey && e.key === "F10") { contextMenu.show(menu) };
});