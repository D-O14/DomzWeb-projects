import "./themeBtn.css";
import { icons } from "@assets/Icons/icons.js";
import { createStyle, createTemplate } from "@utils/component.js";

const template = createTemplate(`<button>${ icons.moon }</button>`);
const theme = template.content.cloneNode(true);
const button = theme.querySelector("button");

class ThemeBtn extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./themeBtn.css", import.meta.url);
        shadow.append(style);
        shadow.append(button);
    }

    themeSwitch() {
        button.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            const isDark = body.classList.contains("dark-mode");
            isDark ? button.innerHTML = icons.sun : button.innerHTML = icons.moon;
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }
}

customElements.define("theme-btn", ThemeBtn);
export default ThemeBtn;

const themeBtn = document.querySelector("theme-btn");
//themeBtn.addEventListener("click", () => { themeBtn.themeSwitch() });