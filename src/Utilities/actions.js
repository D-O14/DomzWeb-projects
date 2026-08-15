//import "../Components/toast/toast.js";

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