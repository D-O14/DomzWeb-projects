import "./button.css";
import { createIcons, icons } from "lucide";
import { createRipple } from "@utils/button";
import { createStyle, createTemplate } from "@utils/component";

const template = createTemplate(
    `
    <button part="button" class="glass">
        <slot name="text"></slot>
    </button>
    `
);
const buttonComponent = template.content.cloneNode(true);

export default class MyButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./button.css", import.meta.url);
        this.button = buttonComponent.querySelector("button");
        shadow.append(style, buttonComponent);
        this.button.addEventListener("click", (e) => {
            createRipple(e, this.button);
            this.dispatchEvent(new CustomEvent("onClick", {
                detail: { button: this.button },
                bubbles: true
            }));
        });

    }
};

createIcons({ icons });
customElements.define("my-button", MyButton);