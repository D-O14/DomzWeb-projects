import { createTemplate, createStyle } from "@utils/component.js";

const template = createTemplate(
    `<label for="checkbox">
        <span class="custom-checkbox" part="checkbox"></span>
        <input type="checkbox" class="checkbox" id="checkbox">
    </label>`
);

export default class checkBox extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const checkbox = template.content.cloneNode(true);
        const style = createStyle("./checkbox.css", import.meta.url);
        shadow.append(style, checkbox);

        this.check = shadow.querySelector(".checkbox");
        this.customCheck = shadow.querySelector(".custom-checkbox");
        this.check.addEventListener("click", () => {
            this.check.checked === true ? this.customCheck.classList.add("checked") :
                this.customCheck.classList.remove("checked");
        });
    };

    connectedCallback() { 
        
    };
};

customElements.define("check-box", checkBox);