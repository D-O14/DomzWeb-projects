import "./expo.css";
import { gsap } from "gsap";
import { scaleRotate } from "./Utilities/animation";
import { enableDrag } from "@utils/utilities";

const boxes = document.querySelectorAll(".box");
boxes.forEach(box => { scaleRotate(box) });


/*const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(draggable => {
    draggable.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const dragged = document.getElementById(draggedId);
        const target = e.currentTarget;
        if (dragged === target) return;
        const targetLeft = target.style.left;
        const targetTop = target.style.top;
        const draggedLeft = dragged.style.left;
        const draggedTop = dragged.style.top;
        target.style.left = draggedLeft;
        target.style.top = draggedTop;
        dragged.style.left = targetLeft;
        dragged.style.top = targetTop;
        console.log(`${draggedId} switched with ${target}`);
    });
});

for (const dropzone of dropzones) {
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("over") });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("over") });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        const dropzoneRect = dropzone.getBoundingClientRect();
        const x = e.clientX - dropzoneRect.left;
        const y = e.clientY - dropzoneRect.top;
        const droppedId = e.dataTransfer.getData("text/plain");
        const dropped = document.getElementById(droppedId);
        dropzone.classList.remove("over");
        dropped.style.left = `${x}px`;
        dropped.style.top = `${y}px`;
        dropzone.appendChild(dropped);
    });
};

enableDrag(document);*/
