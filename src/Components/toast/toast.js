const activeToasts = []; 
//const button = document.querySelector("button");
const buttons = document.querySelectorAll(".btn");
const template = document.querySelector("template");
const toasts = document.querySelector(".toasts");

const icons = {
    message: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide message">
    <path
        d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
    <path d="M8 12h.01" />
    <path d="M12 12h.01" />
    <path d="M16 12h.01" />
</svg>`,
    warning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-triangle-alert-icon lucide-triangle-alert">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
    </svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x">
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
</svg>`,
    checkmark: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check">
    <path d="M20 6 9 17l-5-5" />
</svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
</svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
class="lucide lucide-circle-check-icon lucide-circle-check">
<circle cx="12" cy="12" r="10" />
<path d="m9 12 2 2 4-4" />
</svg>`, 
    delete: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide trash">
<path d="M10 11v6" />
<path d="M14 11v6" />
<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
<path d="M3 6h18" />
<path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>`,
};

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
    closeBtn.addEventListener("click", () => {
        notif.remove();
    });
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