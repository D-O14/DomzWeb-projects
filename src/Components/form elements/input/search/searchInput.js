import "./searchInput.css";
import { createStyle, createTemplate } from "@utils/component";
import { initializeIcons, removeIcon } from "@assets/Icons/icons";

const template = createTemplate(
    `<label for="searchInput">
    <div class="input" part="container">
        <slot name="icon">
            <span class="icon search-icon" data-icon="search"></span>
        </slot>
        <input part="input" id="searchInput" type="search" autocomplete="off">
        <button class="close-btn" aria-label="clear search button">
            <span class="icon clear" data-icon=""></span>
        </button>
        <kbd class="shortcut">ctrl + /</kbd>
    </div>
</label>`
);

export default class SearchInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./searchInput.css", import.meta.url);
        const inputComponent = template.content.cloneNode(true);
        //this.searchIcon = inputComponent.querySelector("slot[name='icon']");
        this.closeBtn = inputComponent.querySelector(".close-btn");
        this.searchInput = inputComponent.querySelector("input");
        this.inputLabel = inputComponent.querySelector("label");
        this.input = inputComponent.querySelector(".input");
        this.icon = this.closeBtn.querySelector(".icon");
        initializeIcons(this.inputLabel);
        shadow.append(style, this.inputLabel);

        this.searchInput.addEventListener("input", () => {
            this.dispatchEvent(
                new CustomEvent("search", {
                    detail: { input: this.searchInput },
                    bubbles: true
                })
            )
            if (!this.icon) return;
            this.icon.dataset.icon = "dismiss";
            initializeIcons(this.closeBtn);
            if (this.searchInput.value.toLowerCase().trim() === "") { removeIcon(this.icon) };
        });

        this.input.addEventListener("blur", () => { removeIcon(this.icon) });

        this.closeBtn.addEventListener("click", () => {
            this.searchInput.value = "";
            removeIcon(this.icon);
        });

        this.shadowRoot.addEventListener("keydown", (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "/") {
                this.searchInput.focus();
            }
        });
    }

    connectedCallback() { 
        const className = this.getAttribute("class");
        //const searchIcon = this.querySelector("span[slot='icon']");
        const placeholder = this.getAttribute("placeholder") ?? "Find anything you want...";
        this.searchInput.placeholder = placeholder;
        /*if (!searchIcon) {
            this.searchIcon.dataset.icon = "search";
            this.searchIcon.className = "icon search-icon"
        }*/
        this.input.classList.add(className);
        initializeIcons(this.shadowRoot);
    };
};

initializeIcons(document);
customElements.define("search-input", SearchInput);