import "./confirm-dialog.css";
import { createTemplate, createStyle } from "@utils/component.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const template = createTemplate(
    `<dialog aria-labelledby="alert-title" aria-describedby="alert-desc">
<div class="dialog">
    <div class="content">
        <span class="icon" data-icon=""></span>
        <h1 class="heading" id="alert-title"></h1>
        <p class="message" id="alert-desc"></p>
    </div>
    <menu>
        <button class="dismissBtn hover:bg-gray-200 border-gray-400 rounded-md pr-4 pl-4">Cancel</button>
        <button class="confirmBtn hover:bg-red-800 rounded-md pr-4 pl-4"></button>
    </menu>
</div>
</dialog>
`
);

const variants = {
    delete: {
        className: "danger",
        role: "alertdialog",
        folder: {
            title: "Are you sure you want to delete this folder?",
            message: "This action cannot be undone",
            confirmText: "Delete",
            icon: icons.delete,
        },
        files: {
            title: "Delete these files?",
            message: "The selected files will be permanently deleted from your device and cannot be recovered.",
            confirmText: "Delete",
            icon: icons.exclaimFilled,
        },
        account: {
            title: "Deactivate Account?",
            message: `Are you sure you want to deactivate your account? By doing this you will
            lose all of your saved data and will not be able to retrieve it.`,
            confirmText: "Deactivate",
            icon: icons.exclaimOutline,
        },
    },
    archive: {
        className: "confirm",
        title: "Archive this item?",
        message: `This item will be stored in your archives, and is retrievable.`,
        confirmText: "Archive",
        icon: icons.archive,
    },
    logout: {
        className: "danger",
        title: "Log out of account?",
        message: `This account will automatically be deleted afteer 30 days without login. 
        You can log back in any time before then.`,
        confirmText: "Logout",
        icon: icons.logout,
    },
    sync: {
        className: "confirm",
        title: "Sync your data across all your devices?",
        message: `Your data will be synchronized across all devices with your account logged in.`,
        confirmText: "Sync Data",
        icon: icons.refresh,
    },
    settings: {
        className: "update",
        title: "Save all changes to your settings?",
        message: `These features may impact your experience or workflow.`,
        confirmText: "Save Settings",
        icon: icons.gear,
    }
}

const dangerBtn = document.getElementById("danger");

class ConfirmDialog extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./confirm-dialog.css", import.meta.url);
        const tailwindcss = createStyle("../../../Styles/tailwindcss/output.css", import.meta.url);
        const modal = template.content.cloneNode(true);
        const confirmBtn = modal.querySelector(".confirmBtn");
        const cancelBtn = modal.querySelector(".dismissBtn");
        const dialog = modal.querySelector("dialog");
        shadow.append( tailwindcss, style, dialog);
        this.dialog = shadow.querySelector("dialog");

        this.dialog.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.close();   
            }
        });

        confirmBtn.addEventListener("click", () => { this.close() });
        cancelBtn.addEventListener("click", () => { this.close() })
    }

    connectedCallback() {
        const variant = this.getAttribute("variant");
        const item = this.getAttribute("item");
        this.setVariant(variant, item);
    }

    show() {
        this.dialog.showModal();
        this.dialog.classList.add("open");
        this.cancelBtn = this.dialog.querySelector(".dismissBtn");
        this.cancelBtn.focus();
    };

    close() {
        this.dialog.classList.remove("open");
        this.dialog.classList.add("closing");
        setTimeout(() => {
            this.dialog.close();
            setTimeout(() => {
                this.dialog.classList.remove("closing");
            }, 400)
        }, 300);
    };

    setVariant(variantName, item) {
        const variant = variants[variantName];
        if (!variant) { console.warn(`Unknown variant: ${ variantName }`); return; };
        const config = item ? variant[item] ?? variant : variant;
        if (config.role) { this.dialog.setAttribute("role", config.role) };
        this.dialog.querySelector(".heading").textContent = config.title;
        this.dialog.querySelector(".message").textContent = config.message;
        this.dialog.querySelector(".confirmBtn").textContent = config.confirmText;
        this.dialog.querySelector(".icon").innerHTML = config.icon;
        this.dialog.className = config.className ?? variant.className;
    }
};

customElements.define("confirm-dialog", ConfirmDialog);
export default ConfirmDialog;

const confirmDialog = document.querySelector("confirm-dialog");

if (dangerBtn) { dangerBtn.addEventListener("click", () => { confirmDialog.show() }) };