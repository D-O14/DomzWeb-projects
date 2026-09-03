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

const button = document.querySelector("button");
button.addEventListener("pointerdown", () => {
    setTimeout(() => {
        document.body.style.background = "red";
    }, 2000);
});
initializeIcons(document);