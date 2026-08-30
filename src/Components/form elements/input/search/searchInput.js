import "./searchInput.css";
import searchItems from "@utils/input";
import { createStyle, createTemplate } from "@utils/component";
import { initializeIcons, removeIcon } from "@assets/Icons/icons";

const template = createTemplate(
    `<label for="searchInput">
    <div class="input">
        <span class="icon search" data-icon="search"></span>
        <input id="searchInput" type="search" autocomplete="off" placeholder="Find anything you want..">
        <button class="close-btn" aria-label="clear search button">
            <span class="icon clear" data-icon=""></span>
        </button>
        <code class="shortcut">ctrl + /</code>
    </div>
</label>`
);

export default class SearchInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./searchInput.css", import.meta.url);
        const inputComponent = template.content.cloneNode(true);
        this.input = inputComponent.querySelector(".input");
        this.searchInput = inputComponent.querySelector("input");
        this.inputLabel = inputComponent.querySelector("label");
        this.closeBtn = inputComponent.querySelector(".close-btn");
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

        document.addEventListener("keydown", (e) => {
            if (e.ctrlKey && e.key === "/") {
                this.searchInput.focus();
            }
        });
    }
};

customElements.define("search-input", SearchInput);

function render(items) {
    items.forEach(item => {
        console.log(item);
    });
}