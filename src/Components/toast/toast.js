import "./toast.css";
import { createTemplate, createStyles } from "@utils/component.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const template = createTemplate(
    `<div class="toast">
    <span class="icon"></span>
    <div>
        <strong class="status"></strong>
        <p class="toast-msg"></p>
    </div>
    <button class="close-btn">

    </button>      
</div>`
);

const variants = {
    success: { icon: icons.check },
    error: { icon: icons.error },
    warning: { icon: icons.warning },
    message: { icon: icons.message }
};

class toast{
    constructor() {
        super();
    }
}

const activeToasts = [];
const buttons = document.querySelectorAll(".btn");
const template = document.querySelector("template");
const toasts = document.querySelector(".toasts");

const toastIcons = {
    //success: ,
    //error: icons.error,
    //warning: icons.warning,
    //message: icons.message,
};
 
function showToast(status, icon, message) {
    const toast = template.content.cloneNode(true);
    const notif = toast.querySelector(".toast");
    notif.classList.add(status);
    toast.querySelector(".status").textContent = `${ status }`;
    toast.querySelector(".toast-msg").textContent = `${ message }`;
    toast.querySelector(".icon").innerHTML = `${ icon }`;
    const closeBtn = toast.querySelector(".close-btn");
    closeBtn.innerHTML = `${icons.close}`;
    closeBtn.addEventListener("click", () => { notif.remove() });
    toasts.append(toast);
    activeToasts.push(notif);
    console.log(activeToasts);
    if (activeToasts.length > 4) {
        const oldToast = activeToasts.shift();
        oldToast.remove();
    };
};

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const status = button.dataset.status;
        showToast(status, toastIcons[status], `This is a test ${status} toast`);
    });
});