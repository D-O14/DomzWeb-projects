import { initializeIcons } from "../Assets/Icons/icons";
import { query, setClass } from "../expo";

export function copy(text, toast) {
    navigator.clipboard.writeText(text);
    toast.showToast({
        status: "success",
        message: "Content copied successfully!",
    });
};

export function deleteItem(element) {
    setClass(element, "deleted");
    element.addEventListener("transitionend", () => { element.remove() });
}

export function edit(element) {
    setClass(element, "editing");
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
    const icon = query(btn, ".icon");
    setClass(btn, "loading");
    icon.dataset.icon = "bounce";
    initializeIcons(btn);
}

export function hideLoader(btn) {
    const icon = btn.querySelector(".icon");
    setClass(btn, "loading", true);
    icon.dataset.icon = "";
    icon.textContent = "";
}

export function drawPaths(paths) {
    paths.forEach(path => {
        if (path) {
            setClass(path, "draw");
            const pathLength = path.getTotalLength();
            const dashArray = path.style.strokeDasharray = pathLength;
            const dashOffset = path.style.strokeDashoffset = pathLength;
        };
    });
};