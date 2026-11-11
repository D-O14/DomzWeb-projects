import "./toast.css";
import { createTemplate, createStyle } from "@utils/component.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const template = createTemplate(
    `<div class="toast" role="alert">
        <span class="icon"></span>
        <div class="content">
            <strong class="status"></strong>
            <p class="toast-msg"></p>
        </div>
        <button class="close" aria-label="close">
            <span class="icon .toast-icon" data-icon="dismiss"></span>
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
const button = document.querySelector(".show");

export default class Toast extends HTMLElement {
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

const toastNotif = document.querySelector("toast-notif");
if (button) {
    button.addEventListener("click", () => {
        toastNotif.showToast({
            status: "success",
            message: "Toast created successfully",
        });
    });   
}

/*function Toast(config = {}) {
    const state = { timerId: null, duration: config.duration ?? 2000 };
    const lifecycles = {
        notify(element) {
            element.classList.add("notify");
            clearTimeout(state.timerId);
            state.timerId = setTimeout(() => { element.classList.remove("notify") }, config.duration);
        },

        destroy(element) {
            element.className = "";
            clearTimeout(state.timerId);
            element.classList.remove("notify");
            removeIcon(element.querySelector(".toast-icon"));
            element.querySelector(".content").textContent = null;
            element.remove();
        },
    };

    const manager = query(".toast-manager");
    const toast = parseHTML(
        `<div class="toast ${ config.type }-toast" id="toast" role="status" aria-live="polite">
        <span class="icon toast-icon" data-icon="${ config.icon }"></span>
        <p class="content">${ config.content }</p>
    </div>`);

    manager.append(toast);
    initializeIcons(manager);
    lifecycles.notify(manager);

    return toast;
};

function ToastManager() {
    const toastManager = parseHTML(`<div class="toast-manager"></div>`);
    return toastManager;
};*/