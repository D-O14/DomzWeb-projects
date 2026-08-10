import "./loaderBtn.css";
import { icons } from "@assets/Icons/icons.js";
import { createStyle, createTemplate } from "@tilities/component.js";

const template = createTemplate(`<button>${ icons.bounce }</button>`);
const loader = template.content.cloneNode(true);
const button = loader.querySelector("button");

class LoaderBtn extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./loaderBtn.css", import.meta.url);
        shadow.append(style);
        shadow.append(button);
    }
}

customElements.define("loader-btn", LoaderBtn);
export default LoaderBtn;

const loaderBtn = document.querySelector("loader-btn");