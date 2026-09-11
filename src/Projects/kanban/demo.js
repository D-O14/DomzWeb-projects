import "./demo.css";

const kanbanData = JSON.parse(localStorage.getItem("kanban-demo")) ||
    [{ id: 1, title: "Not Started", items: [] }, { id: 2, title: "In Progress", items: [] }, { id: 3, title: "Completed", items: [] }];

const kanban = document.querySelector(".kanban");
const itemTemplate = document.querySelector(".item-template");
const columnTemplate = document.querySelector(".column-template");

function addItem(columnId, content) {
    const column = kanbanData.find(column => column.id === columnId);
    if (!column) { throw new Error("Column does not exist!") };
    const item = { id: crypto.randomUUID(), content: content };
    column.items.push(item);
    save(kanbanData);
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
    save(kanbanData);
}

function deleteItem(itemId) {
    for (const column of kanbanData) {
        const item = column.items.find( item => item.id === itemId );
        if (item) { column.items.splice(column.items.indexOf(item), 1); break };
    }
    save(kanbanData);
}

function renderItem(itemData, columnElement) {
    const clone = itemTemplate.content.cloneNode(true);
    const item = clone.querySelector(".kanban-item");
    const input = clone.querySelector(".kanban-input");
    const id = itemData.id;

    item.dataset.id = id;
    input.textContent = itemData.content;

    item.addEventListener("dblclick", () => {
        const check = confirm("Are you sure you want to delete this item?");
        if (check) {
            deleteItem(id);
            item.remove();
        };
    });
    input.addEventListener("blur", () => {
        const newContent = input.textContent.trim();
        if (newContent === itemData.content) return;
        itemData.content = newContent;
        updateItem(id, { content: newContent });
    });

    columnElement.append(item);
}

function renderColumn(columnData) {
    const clone = columnTemplate.content.cloneNode(true);
    const column = clone.querySelector(".kanban-column");
    const title = clone.querySelector(".kanban-title");
    const items = clone.querySelector(".kanban-items");
    const button = clone.querySelector(".kanban-btn");

    column.dataset.id = columnData.id;
    title.textContent = columnData.title;

    columnData.items.forEach(item => { renderItem(item, items) });
    button.addEventListener("click", () => {
        const newItem = addItem(columnData.id, "");
        renderItem(newItem, items);
    });
    return column;
}

function renderKanban(data) {
    kanban.replaceChildren();
    data.forEach(columnData => {
        const column = renderColumn(columnData);
        kanban.append(column);
    });
}

function save(data) { localStorage.setItem("kanban-demo", JSON.stringify(data)) };

renderKanban(kanbanData);