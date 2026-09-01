import "./tooltip.css";
//import "../buttons/regular/button";
import { Bubbles, createIcons, icons } from "lucide";
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
        
        if (!tooltip.classList.contains("revealed")) {
            this.dispatchEvent(new CustomEvent("reveal", {
                detail: { tooltip: tooltip },
                bubbles: true,
                composed: true,
            }));
        };
    }

    connectedCallback() {
        const className = tooltip.getAttribute("class");
        this.classList.add(className);
    }
}

/*if (myButton) {
    myButton.addEventListener("onClick", (e) => {
        const text = myButton.querySelector(".text");
        tooltip.classList.toggle("revealed");
        if (tooltip.classList.contains("revealed")) {
            text.innerHTML = "Hide Tooltip <i data-lucide='eye'></i>";
        } else {
            text.innerHTML = "Reveal Tooltip <i data-lucide='eyeClosed'></i>";
        }
        createIcons({ icons });
    });
};*/

if (myButton) {
    myButton.addEventListener("onHover", () => { tooltip.classList.add("revealed") })
}
//myButton.addEventListener("onLeave", () => { tooltip.classList.remove("revealed") });
//myButton.addEventListener("hoverOut", () => { tooltip.classList.remove("revealed") });

customElements.define("tool-tip", Tooltip);
createIcons({ icons });