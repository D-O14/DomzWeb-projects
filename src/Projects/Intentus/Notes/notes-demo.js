import "./notes-demo.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";
import ContextMenu from "@components/context-menu/context-menu.js";

const items = [
    { label: "Edit", icon: icons.edit, section: "primary" },
    { label: "Move to", icon: icons.folder, section: "secondary" },
    { label: "Archive", icon: icons.archive, section: "secondary" },
    { label: "View Details", icon: icons.exclaimOutline, section: "secondary" },
    { label: "Export", icon: icons.export, section: "secondary", className: "download" },
];

const contextMenu = document.querySelector("context-menu");
contextMenu.render(items);