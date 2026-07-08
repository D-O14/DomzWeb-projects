const menu = document.querySelector(".menu");
const primaryMenu = document.querySelector(".primary");
const secondaryMenu = document.querySelector(".secondary");
const dangerMenu = document.querySelector(".danger");
const template = document.querySelector("template")
const url = location.href;

const icons = {
    share: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-share2-icon lucide-share-2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
</svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil">
    <path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
    <path d="m15 5 4 4" />
</svg>`,
    link: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-link-icon lucide-link">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
</svg>`,
    folder: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-folder-plus-icon lucide-folder-plus">
    <path d="M12 10v6" />
    <path d="M9 13h6" />
    <path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
</svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-icon lucide-copy">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>`,
    archive: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-archive-icon lucide-archive">
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
</svg>`,
    private: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock-icon lucide-lock">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
</svg>`,
    download: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download">
    <path d="M12 15V3" />
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
</svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide trash">
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
</svg>`,
    message: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke = "currentColor" 
stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon message">
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path d="M8 9h8" />
<path d="M8 13h6" />
<path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12" />
</svg>`
};

groups = {
    primary: primaryMenu,
    secondary: secondaryMenu,
    danger: dangerMenu,
};

menuItems = [
    { label: "Share", icon: icons.share, section: "primary" },
    { label: "Edit", icon: icons.edit, section: "primary" },
    { label: "Copy Link", icon: icons.link, section: "secondary", className: "copy-link", action: () => { copy(url) } },
    { label: "Move to", icon: icons.folder, section: "secondary" },
    { label: "Copy to", icon: icons.copy, section: "secondary" },
    { label: "Archive", icon: icons.archive, section: "secondary" },
    { label: "Make Private", icon: icons.private, section: "secondary" },
    { label: "Download", icon: icons.download, section: "secondary", className: "download" },
    { label: "Delete", icon: icons.delete, section: "danger", className: "delete" },
];

menuItems.forEach(menuItem => {
    const item = template.content.cloneNode(true);
    const menuBtn = item.querySelector(".menu-btn");
    menuBtn.addEventListener("click", () => { menuItem.action() });
    if (menuItem.className) { menuBtn.classList.add(menuItem.className) };
    menuBtn.innerHTML = `${ menuItem.icon }${ menuItem.label }`;
    groups[menuItem.section].append(item);
});

function copy(text) {
    navigator.clipboard.writeText(text);
    console.log(`${ text } copied to clipboard`);
};

function showMenu() {
    menu.classList.remove("context-hidden");
    menu.classList.add("context-shown");
}

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showMenu();
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
    } else if (e.ctrlKey && e.key.toLowerCase() === "m") {
        showMenu();
    };
});