import "./button.css";
import { createIcons, icons } from "lucide";
import { createRipple } from "@utils/button";
import { createStyle, createTemplate } from "@utils/component";

const template = createTemplate(
    `
    <button part="button">
        <slot name="text">
            
        </slot>
    </button>
    `
);

const buttonComponent = template.content.cloneNode(true);

function createEvent(button, eventName) {
    button.dispatchEvent(new CustomEvent(eventName, {
        detail: { button: button },
        bubbles: true,
        composed: true
    }));
}

export default class MyButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./button.css", import.meta.url);
        this.button = buttonComponent.querySelector("button");
        shadow.append(style, buttonComponent);
        this.button.addEventListener("click", (e) => {
            createRipple(e, this.button);
            createEvent(this, "onClick");
        });
        this.button.addEventListener("mouseover", () => { createEvent(this, "onHover") });
        this.button.addEventListener("mouseout", () => { createEvent(this, "hoverOut") });
    }

    connectedCallback() {
        const className = this.getAttribute("class") ?? "button";
        const identification = this.getAttribute("id") ?? "button";
        const ariaLabel = this.getAttribute("aria-label") ?? "";
        this.button.classList.add(className);
        this.button.setAttribute("id", identification);
        this.button.setAttribute("aria-label", ariaLabel);
    }
};

createIcons({ icons });
customElements.define("my-button", MyButton);