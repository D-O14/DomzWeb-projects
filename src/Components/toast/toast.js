import "./toast.css";
import { createTemplate, createStyle } from "@utils/component.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const template = createTemplate(
    `<div class="toast">
    <span class="icon"></span>
    <div class="content">
        <strong class="status"></strong>
        <p class="toast-msg"></p>
    </div>
    <button class="close" aria-label="close">
        <span class="icon" data-icon="close"></span>
    </button>      
</div>`
);

const statuses = {
    success: { className: "success", icon: icons.check },
    error: { className: "error", icon: icons.error },
    warning: { className: "warning", icon: icons.warning },
    message: { className: "message", icon: icons.message }
};

const activeToasts = [];
const button = document.querySelector("button");

class Toast extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const toast = template.content.cloneNode(true);
        this.notif = toast.querySelector(".toast");
        const style = createStyle("./toast.css", import.meta.url);
        shadow.append(style, toast);
        initializeIcons(shadow);
    }

    renderToast(options) {
        const { status, icon, message } = options;
        //this.toast = this.notif.cloneNode(true);
        this.closeBtn = this.notif.querySelector(".close");
        this.notif.querySelector(".status").textContent = status;
        this.notif.querySelector(".toast-msg").textContent = message;
        this.notif.querySelector(".icon").innerHTML = icon;
        this.closeBtn.addEventListener("click", () => { this.dismissToast() });
        this.notif.classList.add(status);
    };

    showToast(options) {
        const variant = statuses[options.status];
        if (!variant) { console.warn(`Unknown toast status: ${ options.status }`); return; };
        this.notif.classList.add("visible");
        setTimeout(() => {
            this.notif.classList.add("hide");
            this.notif.classList.remove("visible");
        }, 3000);
        this.renderToast({ ...variant, ...options });
        activeToasts.push(this.notif);
        if (activeToasts.length > 4) {
            const oldToast = activeToasts.shift();
            oldToast.remove();
        };
    }

    dismissToast() {
        this.notif.classList.add("hide");
        setTimeout(() => {
            this.notif.remove();
        }, 300);
    }
}

customElements.define("toast-notif", Toast);
export default Toast;

const toastNotif = document.querySelector("toast-notif");
button.addEventListener("click", () => {
    toastNotif.showToast({
        status: "error",
        message: "Toast creation failure",
    });
});