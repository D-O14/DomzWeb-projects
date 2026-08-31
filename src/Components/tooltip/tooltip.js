import "./tooltip.css";
import "../buttons/regular/button";
import { createIcons, icons } from "lucide";
import { createStyle, createTemplate } from "@utils/component";

const myButton = document.querySelector("my-button");
const template = createTemplate(
    `
    <div part="tooltip" class="tooltip">
        <slot name="info"></slot>
    </div>
    `
);
const tooltipComponent = template.content.cloneNode(true);
const tooltip = tooltipComponent.querySelector(".tooltip");

export default class Tooltip extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./tooltip.css", import.meta.url);
        shadow.append(style, tooltip);
    }

    /*connectedCallback() {
        const className = tooltip.getAttribute("class");
        this.classList.add(className);
    }*/
}

myButton.addEventListener("onHover", () => { tooltip.classList.add("revealed") });
myButton.addEventListener("hoverOut", () => { tooltip.classList.remove("revealed") });

customElements.define("tool-tip", Tooltip);
createIcons({ icons });