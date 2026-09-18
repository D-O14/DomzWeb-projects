import "./expo.css";
import { enableDrag, enableDrop, changeOnDrop, switchPositon } from "@utils/dragDrop";

const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(draggable => { enableDrop(draggable, switchPositon) });
dropzones.forEach(dropzone => { enableDrop(dropzone, changeOnDrop) });

enableDrag(document);