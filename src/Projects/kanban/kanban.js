import "./kanban.css";
import { save } from "../../Utilities/database";

const kanbanData = JSON.parse(localStorage.getItem("kanban-data")) ||
    [{ id: 1, title: "Not Started", items: [] }, { id: 2, title: "In Progress", items: [] }, { id: 3, title: "Completed", items: [] }];

const kanban = document.querySelector(".kanban");
const itemTemplate = document.querySelector(".item-template");
const columnTemplate = document.querySelector(".column-template");
const dropzoneTemplate = document.querySelector(".dropzone-template");

function addItem(columnId, content) {
    const column = kanbanData.find(column => column.id === columnId);
    if (!column) { throw new Error("Column does not exist!") };
    const item = { id: crypto.randomUUID(), content: content };
    column.items.push(item);
    save("kanban-data", kanbanData);
    return item;
};

function updateItem(itemId, newProps) {
    const [item, currentColumn] = (() => {
        for (const column of kanbanData) {
            const item = column.items.find(item => item.id === itemId);
            if (item) { return [item, column] };
        };
    })();
    if (!item) { throw new Error("Item Not Found!") };
    item.content = newProps.content === undefined ? item.content : newProps.content;
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
        const target = kanbanData.find(column => column.id === newProps.columnId);
        if (!target) { throw new Error("Target Column not found!") }
        currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
        target.items.splice(newProps.position, 0, item);
    };
    save("kanban-data", kanbanData);
}

function deleteItem(itemId) {
    for (const column of kanbanData) {
        const item = column.items.find(item => item.id === itemId);
        if (item) { column.items.splice(column.items.indexOf(item), 1); break };
    }
    save("kanban-data", kanbanData);
}

function renderItem(itemData, columnElement) {
    const clone = itemTemplate.content.cloneNode(true);
    const item = clone.querySelector(".kanban-item");
    const input = clone.querySelector(".kanban-input");
    const dropzone = renderDropzone();
    const id = itemData.id;

    item.dataset.id = id;
    item.appendChild(dropzone);
    input.textContent = itemData.content;

    item.addEventListener("dblclick", () => {
        const check = confirm("Are you sure you want to delete this item?");
        if (check) { deleteItem(id); item.remove() };
    });

    item.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", id) });

    input.addEventListener("blur", () => {
        const newContent = input.textContent.trim();
        if (newContent === itemData.content) return;
        itemData.content = newContent;
        updateItem(id, { content: newContent });
    });

    input.addEventListener("drop", (e) => { e.preventDefault() });

    columnElement.append(item);
}

function renderColumn(columnData) {
    const clone = columnTemplate.content.cloneNode(true);
    const column = clone.querySelector(".kanban-column");
    const title = clone.querySelector(".kanban-title");
    const items = clone.querySelector(".kanban-items");
    const button = clone.querySelector(".kanban-btn");
    const dropzone = renderDropzone();

    items.appendChild(dropzone);
    column.dataset.id = columnData.id;
    title.textContent = columnData.title;

    columnData.items.forEach(item => { renderItem(item, items) });
    button.addEventListener("click", () => {
        const newItem = addItem(columnData.id, "");
        renderItem(newItem, items);
    });
    return column;
}

function renderDropzone() {
    const clone = dropzoneTemplate.content.cloneNode(true);
    const dropzone = clone.querySelector(".kanban-dropzone");
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("active") });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("active") });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("active");
        const column = dropzone.closest(".kanban-column");
        const columnId = Number(column.dataset.id);
        const itemId = e.dataTransfer.getData("text/plain");
        const dropInColumns = column.querySelectorAll(".kanban-dropzone");
        const droppedIndex = [...dropInColumns].indexOf(dropzone);
        const dropped = document.querySelector(`[data-id="${ itemId }"]`);
        const insertAfter = dropzone.parentElement.classList.contains("kanban-item") ?
            dropzone.parentElement : dropzone;
        if (dropped.contains(dropzone)) return;
        insertAfter.after(dropped);

        updateItem(itemId, { columnId: columnId, position: droppedIndex });
    });
    return dropzone;
}

function renderKanban(data) {
    kanban.replaceChildren();
    data.forEach(columnData => {
        const column = renderColumn(columnData);
        kanban.append(column);
    });
}

renderKanban(kanbanData);