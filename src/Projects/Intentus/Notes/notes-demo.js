import "./notes-demo.css";
import { defaultFunc } from "@utils/button";
import { applyState } from "@utils/utilities";
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

const filterTemplate = document.getElementById("filterTemplate");
const filterRow = document.querySelector(".filter-row");

const filterChips = [
    { label: "All", func: () => { defaultFunc() }, className: "use" },
    { label: "Today", func: () => { defaultFunc() } },
    { label: "Yesterday", func: () => { defaultFunc() } },
    { label: "This Week", func: () => { defaultFunc() } },
    { label: "Older", func: () => { defaultFunc() } },
];


const items = [
    { id: 0, title: "Morning Post", createdAt: "2026-09-05T08:00:00" },
    { id: 1, title: "Something", createdAt: "2026-09-04T08:00:00" },
    { id: 2, title: "Yesterday's News", createdAt: "2026-09-04T15:30:00" },
    { id: 3, title: "Evening Update", createdAt: "2026-09-05T18:15:00" }
];

const now = new Date().toISOString().slice(0, 10);
const today = now;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
console.log(today);
console.log(yesterday.toISOString().slice(0, 10));

function renderChips(chips, template, row) {
    chips.forEach(chip => {
        const clone = template.content.cloneNode(true);
        const btn = clone.querySelector("button");
        if (chip.className) {
            btn.innerHTML =
                `${ chip.label }
        <span class="icon" data-icon="tick"></span>`;
            btn.classList.add(chip.className)
        } else {
            btn.innerHTML =
                `${ chip.label }
        <span class="icon" data-icon=""></span>`;
        }
        btn.addEventListener("click", () => {
            chip.func();
            const activeBtn = row.querySelector(".use");
            const activeIcon = activeBtn.querySelector(".icon");
            const icon = btn.querySelector(".icon");
            applyState(activeIcon, true, "");
            applyState(icon, false, "tick");
            activeBtn.classList.remove("use");
            btn.classList.add("use");
            initializeIcons(btn);
        });
        initializeIcons(row);
        row.append(clone);
    });
}


renderChips(filterChips, filterTemplate, filterRow);
initializeIcons(document);