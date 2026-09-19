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
    const targetPositions = { left: target.style.left, top: target.style.top };
    const draggedPositions = { left: dragged.style.left, top: dragged.style.top };
    target.style.left = draggedPositions.left;
    target.style.top = draggedPositions.top;
    dragged.style.left = targetPositions.left;
    dragged.style.top = targetPositions.top;
    savePosition(dragged, draggedPositions);
    savePosition(target, targetPositions);
};

export function changeOnDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    const dropped = getDraggedElement(e);
    const rect = dropzone.getBoundingClientRect();
    const positions = {
        left: e.clientX - rect.left,
        top: e.clientY - rect.top
    };
    dropped.style.left = `${ positions.left }px`;
    dropped.style.top = `${ positions.top }px`;
    dropzone.appendChild(dropped);
    savePosition(dropped, positions);
};

/* Helpers */

function getDraggedElement(e) {
    const id = e.dataTransfer.getData("text/plain");
    return document.getElementById(id);
};

function savePosition(draggable, positions) {
    if (draggable.dataset.persistPosition !== "true") return;
    const position = dragItems.find(dragItem => dragItem.id === draggable.id);
    if (position) {
        position.top = positions.top;
        position.left = positions.left;
    } else { dragItems.push({ id: draggable.id, top: positions.top, left: positions.left }) };
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

function removePosition(id) {
    const items = read("draggableItems");
    const persistent = items.filter(item => item.id !== id);
    save("draggableItems", persistent);
}