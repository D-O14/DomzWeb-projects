//import "../Components/toast/toast.js";
import { initializeIcons } from "../Assets/Icons/icons";

export function copy(text, toast) {
    navigator.clipboard.writeText(text);
    toast.showToast({
        status: "success",
        message: "Content copied successfully!",
    });
};

export function deleteItem(element) {
    element.classList.add("deleted");
    element.addEventListener("transitionend", () => { element.remove() });
}

export function edit(element) {
    element.classList.add("editing");
    element.setAttribute("contenteditable", true);
};

export async function share(data) {
    if (navigator.share) {
        try {
            await navigator.share(data);
            console.log("Shared Successfully!");
        } catch {
            console.log("Error sharing! Text copied to clipboard instead");
        }
    } else {
        try {
            await navigator.clipboard.writeText(data.url)
        } catch (error) {
            console.error("Couldn't copy text:", error);
        }
    }
}

export function showLoader(btn) {
    const icon = btn.querySelector(".icon");
    btn.classList.add("loading");
    icon.dataset.icon = "bounce";
    initializeIcons(btn);
}

export function hideLoader(btn) {
    const icon = btn.querySelector(".icon");
    btn.classList.remove("loading");
    icon.dataset.icon = "";
    icon.textContent = "";
}

export function closeDialog(dialog) {
    dialog.classList.remove("open");
    dialog.classList.add("closing");
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove("closing");
    }, 400);
}

export function drawPaths(paths) {
    paths.forEach(path => {
        if (path) {
            path.classList.add("draw");
            const pathLength = path.getTotalLength();
            const dashArray = path.style.strokeDasharray = pathLength;
            const dashOffset = path.style.strokeDashoffset = pathLength;
        };
    });
};

export function animateIcon(btn) { 
    const icon = btn.querySelector(".icon");
    icon.classList.add("animate");
    void icon.offsetWidth;
    icon.classList.add("animate");
};

export function animateIcons(btn) { 
    const animation = btn.dataset.iconAnimation;
    const icon = btn.querySelector("svg");
    icon.classList.add(`icon-${ animation }`);
    icon.addEventListener("animationend", () => {
        icon.classList.remove(`icon-${ animation }`)
    }, { once: true });
};


export function createRipple(e, btn) {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    const ripple = document.createElement("span");
    ripple.style.left = `${ x }px`;
    ripple.style.top = `${ y }px`;
    btn.append(ripple);
    btn.classList.add("active");
    setTimeout(() => { btn.classList.remove("active") }, 300);
    setTimeout(() => { ripple.remove() }, 600);
}