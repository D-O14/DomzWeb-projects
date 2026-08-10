export function copy(text) {
    navigator.clipboard.writeText(text);
    console.log(`${ text } copied to clipboard`);
};

export function deleteItem(element) {
    element.classList.add("deleted");
    setTimeout(() => {
        element.remove();
        console.log("deleted");
    }, 500);
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