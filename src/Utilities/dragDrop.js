import { read, save } from "./database";
const dragItems = read("draggableItems");

document.addEventListener("DOMContentLoaded", () => { getPositions(dragItems) });

export function enableDrag(root) {
    const dragItems = root.querySelectorAll("[draggable='true']");
    dragItems.forEach(draggable => {
        draggable.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", draggable.id) });
        draggable.addEventListener("dragover", (e) => { e.preventDefault() });
        draggable.addEventListener("dragleave", (e) => { e.preventDefault() });
    });
};

export function enableDrop(dropzone, OnDrop) {
    dropzone.addEventListener("dragover", (e) => { e.preventDefault() });
    dropzone.addEventListener("dragleave", (e) => { e.preventDefault() });
    dropzone.addEventListener("drop", (e) => { OnDrop(e) });
};

export function switchPositon(e) {
    e.preventDefault();
    const dragged = getDraggedElement(e);
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
};

export function changeOnDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    const dropped = getDraggedElement(e);
    const rect = dropzone.getBoundingClientRect();
    const axis = {
        xAxis: e.clientX - rect.left,
        yAxis: e.clientY - rect.top
    };
    dropped.style.left = `${ axis.xAxis }px`;
    dropped.style.top = `${ axis.yAxis }px`;
    dropzone.appendChild(dropped);
    savePosition(dropped, axis);
};

/* Helpers */

function getDraggedElement(e) {
    const id = e.dataTransfer.getData("text/plain");
    return document.getElementById(id);
};

function savePosition(draggable, axis) {
    const position = dragItems.find(dragItem => dragItem.id === draggable.id);
    if (position) {
        position.top = axis.yAxis;
        position.left = axis.xAxis;
    } else { dragItems.push({ id: draggable.id, top: axis.yAxis, left: axis.xAxis }) };
    save("draggableItems", dragItems);
};

function getPositions(items) {
    items.forEach(dragItem => {
        const draggable = document.getElementById(dragItem.id);
        if (!draggable) return;
        draggable.style.left = `${ dragItem.left }px`;
        draggable.style.top = `${ dragItem.top }px`;
    });
}