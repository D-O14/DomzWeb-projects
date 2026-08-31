//import "./loaderBtn.css";
import "../regular/button";
import { showLoader } from "@utils/actions";
//import { icons } from "@assets/Icons/icons.js";

const button = document.querySelector("my-button");
button.addEventListener("onClick", (e) => { showLoader(e.detail.button) });

//import { createStyle, createTemplate } from "@tilities/component.js";

//const template = createTemplate(`<button>${ icons.bounce }</button>`);
///const loader = template.content.cloneNode(true);
//const button = loader.querySelector("button");

/*class LoaderBtn extends HTMLElement{
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./loaderBtn.css", import.meta.url);
        shadow.append(style, button);
    }
}

customElements.define("loader-btn", LoaderBtn);
export default LoaderBtn;*/

//const loaderBtn = document.querySelector("loader-btn");