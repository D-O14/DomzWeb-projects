const menu = document.querySelector(".menu");
const copyLink = document.querySelector(".copy-link");
const url = location.href;

copyLink.addEventListener("pointerdown", () => {
    navigator.clipboard.writeText(url);
    console.log(`Url:${ url } copied to clipboard`);
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    menu.classList.remove("context-hidden");
    menu.classList.add("context-shown");
});

document.addEventListener("pointerdown", (e) => {
    if (!menu.contains(e.target)) {
        menu.classList.remove("context-shown");
        menu.classList.add("context-hidden");
    };
});

document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Escape" && menu.classList.contains("context-shown")) {
        menu.classList.remove("context-shown");
        menu.classList.add("context-hidden");
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        location.reload();
        console.log("refreshed");
    };
});