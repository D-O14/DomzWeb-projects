import "./demo.css";

const kanbanData = JSON.parse(localStorage.getItem("kanban-data")) ||
    [{ id: 1, title: "Not Started", items: [] }, { id: 2, title: "In Progress", items: [] }, { id: 3, title: "Completed", items: [] }];

const kanbanTemplate = document.querySelector(".kanban-template");

function getItems(columnId) {
    const column = kanbanData.find(column => column.id === columnId);
    if (!column) return [];
    return column.items;
}

function addItem(columnId, content) { 
    const column = kanbanData.find(column => column.id === columnId);
    const item = { id: Math.floor(Math.random() * 100000), content: content };
    if (!column) { throw new Error("Column does not exist!") };
    column.items.push(item);
    save(kanbanData);
    return item;
};

function updateItem(itemId, newProps) {
    for (const column of kanbanData) { 
        const item = column.items.find(item => item.id === itemId);
        if (item) { return [item, column] };
        if (!item) { throw new Error("Item Not Found!") };
        item.content = newProps.content === undefined ? item.content : newProps.content;
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            const target = kanbanData.find(column => column.id === newProps.columnId);
            if (!target) { throw new Error("Target Column not found!") };
            column.items.splice(column.items.indexOf(item), 1);
            target.items.splice(newProps.position, 0, item);
        };
        save(kanbanData);
    };
}

function deleteItem(itemId) { 
    kanbanData.forEach(column => {
        const itemToDelete = column.items.find(item => item.id === itemId);
        if (itemToDelete) { return column.items.filter(item => { !item.id === itemId }) };
    });
    /*for (const column of kanbanData) {
        const item = column.items.find(item => item.id === itemId);
        if (item) { column.items.splice(column.items.indexOf(item), 1) };
    }*/
    save(kanbanData);
};

function renderKanban() {
    kanbanData.forEach(column => {
        const kanbanClone = kanbanTemplate.content.cloneNode(true);
        //const kanbanColumn = kanbanClone.querySelector(".kanban-column");
        const kanbanBtn = kanbanClone.querySelector(".kanban-btn");
        const kanbanItem = kanbanClone.querySelector(".kanban-item");
        const kanbanInput = kanbanClone.querySelector(".kanban-input");
        const columnItems = column.items;
        kanbanBtn.addEventListener("click", () => {
            const newItem = addItem(id, "");
            renderItems(columnItems, kanbanInput)
        });
        kanbanInput.addEventListener("blur", () => { onBlur() });
        kanbanItem.addEventListener("dblclick", () => {
            const check = confirm("Are you sure you want to delete this item?");
            if (check) {
                //deleteItem(id);
                kanbanInput.removeEventListener("blur", () => { onBlur() });
                kanbanItem.parentElement.removeChild(kanbanItem);
            };
        });
        this.elements.root.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", id) });
        this.elements.input.addEventListener("drop", (e) => { e.preventDefault() });
        renderItems(columnItems, kanbanInput)
        kanbanClone.querySelector(".kanban-title").textContent = column.title;
    })
}

function save(data) { localStorage.setItem("kanban-items", JSON.stringify(data)) };
function renderItems(items, input) { items.forEach(item => { input.textContent = item.content }) };