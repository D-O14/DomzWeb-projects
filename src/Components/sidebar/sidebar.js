const icons = {
    sidebar: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-panel-right-icon lucide-panel-right">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>
    </svg>`,
}

const links = document.querySelectorAll("a");
/*links.forEach((a) => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
    })
});*/

const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    closeMenu();
});

function closeMenu() {
    const shownDropdowns = Array.from(sidebar.getElementsByClassName("show"));
    shownDropdowns.forEach(shown => { shown.classList.remove("show") });
}

/*const subMenu = document.querySelectorAll(".sub-menu");
subMenu.forEach(subMenu => {
    subMenu.addEventListener("click", () => {
        if (sidebar.classList.contains("collapsed")) {
            sidebar.classList.remove("collapsed");
        }
    })
})*/

function toggleMenu(button) {
    const subMenu = button.nextElementSibling;
    if (!subMenu.classList.contains("show")) { closeMenu() };
    subMenu.classList.toggle("show");
    if (sidebar.classList.contains("collapsed")) {
        sidebar.classList.toggle("collapsed");
    }
}