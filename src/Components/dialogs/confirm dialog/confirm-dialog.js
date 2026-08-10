import "./confirm-dialog.css";
//import "@styles/tailwindcss/output.css";
import { createTemplate, createStyle } from "@utils/component.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const template = createTemplate(
    `<dialog>
    <div class="dialog">
        <div class="header">
            <span class="icon" data-icon="exclaimOutline"></span>
        </div>
        <div class="content">
            <h1 class="dialog-heading">Deactivate Account?</h1>
            <p>Are you sure you want to deactivate your account? By doing this you will
                lose all of your saved data and will not be able to retrieve it.
            </p>
        </div>
    </div>
    <menu>
        <button id="cancel" class="cancel">Cancel</button>
        <button id="delete" class="delete">Deactivate</button>
    </menu>
</dialog>`
);

const modal = template.content.cloneNode(true);
const dialog = modal.querySelector("dialog");
const dangerBtn = document.getElementById("danger");
const deleteBtn = modal.querySelector("#delete");
const cancelBtn = modal.querySelector("#cancel");

class ConfirmDialog extends HTMLElement{
    constructor(){
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./confirm-dialog.css", import.meta.url);
        shadow.append(style);
        shadow.append(dialog);
        initializeIcons(dialog);
    }

    show() {
        dialog.showModal();
        dialog.classList.add("open");
    };
    
    close() {
        dialog.classList.remove("open");
        dialog.classList.add("closing");
        setTimeout(() => {
            dialog.close();
            setTimeout(() => {
                dialog.classList.remove("closing");
            }, 400)
        }, 300);
    };
};

customElements.define("confirm-dialog", ConfirmDialog);
export default ConfirmDialog;

const confirmDialog = document.querySelector("confirm-dialog");

if (dangerBtn) {
    dangerBtn.addEventListener("click", () => { confirmDialog.show() });   
}
if (deleteBtn) {
    deleteBtn.addEventListener("click", () => { confirmDialog.close() });   
}
if (cancelBtn) {
    cancelBtn.addEventListener("click", () => { confirmDialog.close() });   
}