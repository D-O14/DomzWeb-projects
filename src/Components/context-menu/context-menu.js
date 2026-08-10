import "./context-menu.css";
import { icons } from "@assets/Icons/icons.js";
import { copy, deleteItem, share } from "@utils/actions.js";
import { createTemplate, createStyle } from "@utils/component.js";

const template = createTemplate(
    `<menu class="menu menu-hidden" role="menu" aria-label="Context Menu">
        <ul class="menu-list primary" role="group" aria-label="Primary Actions"></ul>
        <ul class="menu-list secondary" role="group" aria-label="Secondary Actions"></ul>
        <ul class="menu-list danger" role="group" aria-label="Dangerous Actions"></ul>
    </menu>
    <li class="menu-item" role="none">
        <button class="menu-btn" role="menuitem">

        </button>
    </li>`
);

const card = document.querySelector(".card");
const cardTxt = card.querySelector("p");
const target = card.textContent;
const menuItem = template.content.cloneNode(true);
const menu = menuItem.querySelector("menu");
const url = location.href;

const groups = {
    danger: menuItem.querySelector(".danger"),
    primary: menuItem.querySelector(".primary"),
    secondary: menuItem.querySelector(".secondary"),
};

const shareData = {
    title: "Card Title",
    text: target,
    url: crypto.randomUUID(),
};

const menuItems = [
    { label: "Share", icon: icons.share, section: "primary", action: () => { share(shareData) } },
    { label: "Edit", icon: icons.edit, section: "primary" },
    { label: "Copy Link", icon: icons.link, section: "secondary", className: "copy-link", action: () => { copy(url) } },
    { label: "Move to", icon: icons.folder, section: "secondary" },
    { label: "Copy", icon: icons.copy, section: "secondary", action: () => { copy(target) } },
    { label: "Archive", icon: icons.archive, section: "secondary" },
    { label: "View Details", icon: icons.exclaimOutline, section: "secondary" },
    { label: "Export", icon: icons.export, section: "secondary", className: "download" },
    { label: "Delete", icon: icons.delete, section: "danger", className: "delete", action: () => { deleteItem(card) } },
];

class ContextMenu extends HTMLElement {
    constructor() {
        super();
        this.lastFocusedIndex = 0;
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./context-menu.css", import.meta.url);
        shadow.append(style);
        shadow.append(menu);

        menu.addEventListener("keydown", (e) => {
            e.preventDefault();
            if (e.key === "ArrowDown") { // Next Item
                this.moveFocus(1)
            }
            if (e.key === "ArrowUp") { // Previous Item
                this.moveFocus(-1)
            }
            if (e.key === "Enter") { // Activate
                const menuBtn = this.shadowRoot.activeElement;
                menuBtn.click();
            } if (e.key === "Escape") { // Close
                menu.classList.remove("menu-shown");
                menu.classList.add("menu-hidden");
            }
        });

        menu.addEventListener("focusin", e => {
            const menuLi = e.target.closest("li");
            if (!menuLi) return;
            menu.querySelectorAll("li.focused").forEach(li => li.classList.remove("focused"));
            menuLi.classList.add("focused");
        })
    }

    render(items) {
        items.forEach((item, index) => {
            const menuItem = template.content.cloneNode(true);
            const menuBtn = menuItem.querySelector(".menu-btn");
            const menuLi = menuBtn.closest(".menu-item");
            menuBtn.tabIndex = index === 0 ? 0 : -1;
            menuBtn.addEventListener("click", (e) => {
                item.action();
                menu.classList.remove("menu-shown");
                menu.classList.add("menu-hidden");
            });
            if (item.className) { menuLi.classList.add(item.className) };
            menuBtn.innerHTML = `${ item.icon }${ item.label }`;
            groups[item.section].append(menuItem);
        });
    };

    show(menu) {
        const buttons = [...menu.querySelectorAll(".menu-btn")];
        menu.classList.remove("menu-hidden");
        menu.classList.add("menu-shown");
        const index = Math.min(this.lastFocusedIndex, buttons.length - 1);
        buttons[index].focus();
        buttons[this.lastFocusedIndex].focus();
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

    moveFocus(direction) {
        const buttons = [...menu.querySelectorAll(".menu-btn")];
        const current = this.shadowRoot.activeElement;
        const currentIndex = buttons.indexOf(current);
        const nextIndex = (currentIndex + direction + buttons.length) % buttons.length;
        current.tabIndex = -1;
        buttons[nextIndex].tabIndex = 0;
        buttons[nextIndex].focus();
        this.lastFocusedIndex = nextIndex;
    }
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