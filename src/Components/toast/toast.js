import "./toast.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const activeToasts = []; 
const buttons = document.querySelectorAll(".btn");
const template = document.querySelector("template");
const toasts = document.querySelector(".toasts");

const toastIcons = {
    success: icons.check,
    error: icons.error,
    warning: icons.warning,
    message: icons.message,
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