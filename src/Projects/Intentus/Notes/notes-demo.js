import "./notes-demo.css";
import { initializeIcons } from "@assets/Icons/icons.js";
/*import ContextMenu from "@components/context-menu/context-menu.js";

const items = [
    { label: "Edit", icon: icons.edit, section: "primary" },
    { label: "Move to", icon: icons.folder, section: "secondary" },
    { label: "Archive", icon: icons.archive, section: "secondary" },
    { label: "View Details", icon: icons.exclaimOutline, section: "secondary" },
    { label: "Export", icon: icons.export, section: "secondary", className: "download" },
];

const contextMenu = document.querySelector("context-menu");
contextMenu.render(items);

const addNoteBtn = document.getElementById("addNoteBtn");
const cancelBtn = document.getElementById("cancelBtn");
const closeBtn = document.getElementById("closeBtn");
const saveBtn = document.getElementById("saveBtn");

addNoteBtn.addEventListener("click", () => { dialog.showModal() });
saveBtn.addEventListener("click", () => { dialog.close() });

closeBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    dialog.close();
});*/

const sortRow = document.querySelector(".sort-row");
const filterRow = document.querySelector(".filter-row");
const filterBtn = document.querySelector(".filter-btn");
const sortBtn = document.querySelector(".sort-btn");
filterBtn.addEventListener("click", () => { toggleClass(filterRow) });
sortBtn.addEventListener("click", () => { toggleClass(sortRow) });

const filterChips = document.querySelectorAll(".filter-chip");
const sortChips = document.querySelectorAll(".sort-chip");

function applyState(chips) { 
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            chips.forEach(chip => {
                const activeIcon = chip.querySelector(".icon");
                chip.classList.remove("active");
                activeIcon.dataset.icon = "";
                activeIcon.textContent = "";
                initializeIcons(chip);
            });
            chip.classList.add("active");
            const activeIcon = chip.querySelector(".icon");
            activeIcon.dataset.icon = "tick";
            initializeIcons(chip);
        });
    });  
};

function toggleClass(item) { item.classList.toggle("visible") };

applyState(filterChips);
applyState(sortChips);
initializeIcons(document);