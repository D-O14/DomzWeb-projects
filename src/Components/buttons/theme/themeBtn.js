import "./themeBtn.css";
import { icons } from "@assets/Icons/icons.js";
import { createStyle, createTemplate } from "@tilities/component.js";

const template = createTemplate( `<button>${ icons.moon }</button>` );
const theme = template.content.cloneNode(true);
const button = theme.querySelector("button");

class ThemeBtn extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./themeBtn.css", import.meta.url);
        shadow.append(style);
        shadow.append(button);
    }
}

customElements.define("theme-btn", ThemeBtn);
export default ThemeBtn;

const themeBtn = document.querySelector("theme-btn");