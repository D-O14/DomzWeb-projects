import "./confirm-dialog.css";
import { createStyle } from "@utils/component.js";
import { createTemplate } from "../../Utilities/component";

const danger = document.getElementById("delete");
const cancel = document.getElementById("cancel");
const dismiss = document.getElementById("dismiss");
const close = document.getElementById("close");

const template = createTemplate(
    `<dialog>
        <div class="dialog">
            <div class="dialog-header">
                <h1 class="dialog-heading">Deactivate Account?</h1>
                <button id="close" class="close">X</button>
            </div>
            <p>Are you sure you want to deactivate your account? By doing this you will
                lose all of your saved data and will not be able to retrieve it.
            </p>
        </div>
        <menu>
            <button id="cancel" class="cancel">Cancel</button>
            <button id="dismiss" class="dismiss">Deactivate</button>
        </menu>
    </dialog>`
);


class confirmDialog extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const dialog = document.querySelector("dialog");
        const style = createStyle("./confirm-dialog.css", import.meta.url);
        shadow.append(style);
        shadow.append(dialog);
        // this.dispatchEvent(new CustomEvent("dismissed", { detail: { close: close() } }));
    }
}

danger.addEventListener("click", () => {
    dialog.showModal();
});

close.onclick = () => {
    dialog.close();
}

cancel.onclick = () => {
    dialog.close();
}

dismiss.addEventListener("click", () => {
    dialog.close();
})