/*const icons = {
    panel-right: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-panel-right-icon lucide-panel-right">
    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>
    </svg>`,
}*/


const subMenu = document.querySelectorAll(".sub-menu");
const toggleBtn = document.querySelector(".toggle-btn");
const links = document.querySelectorAll(".link");
const sidebar = document.querySelector(".sidebar");
const dropDownBtn = document.querySelectorAll(".dropdown-btn");

dropDownBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
        const item = btn.closest("li");
        const subMenu = item.querySelector(".sub-menu");
        if (subMenu.classList.contains("open")) {
            subMenu.classList.remove("open");
            subMenu.style.height = "0px";
        } else {
            closeMenu();
            subMenu.classList.add("open");
            subMenu.style.height = subMenu.scrollHeight + "px";
        } if (sidebar.classList.contains("collapsed")) {
            sidebar.classList.toggle("collapsed");
        }
    })
})

links.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        links.forEach(link => { link.classList.remove("active") })
        link.classList.add("active");
    })
})

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    closeMenu();
});

function closeMenu() {
    const shownDropdowns = Array.from(sidebar.getElementsByClassName("open"));
    shownDropdowns.forEach(shown => {
        shown.classList.remove("open");
        shown.style.height = "0px";
    });
}