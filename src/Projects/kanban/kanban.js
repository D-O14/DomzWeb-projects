import "./kanban.css";

class KanbanAPI {
    static getItems(columnId) {
        const data = read();
        const column = data.find(column => column.id === columnId);
        if (!column) return [];
        return column.items;
    };

    static insertItem(columnId, content) {
        const data = read();
        const column = data.find(column => column.id === columnId);
        const item = { id: Math.floor(Math.random() * 100000), content: content };
        if (!column) { throw new Error("Column does not exist!") };
        column.items.push(item);
        save(data);
        return item;
    };

    static updateItem(itemId, newProps) {
        const data = read();
        const [item, currentColumn] = (() => {
            for (const column of data) {
                const item = column.items.find(item => item.id === itemId);
                if (item) { return [item, column] };
                console.log(item);
                console.log(currentColumn);
                console.log(column);
                console.log(item);
            };
        })();
        if (!item) { throw new Error("Item Not Found!") };
        item.content = newProps.content === undefined ? item.content : newProps.content;
        if (newProps.columnId !== undefined && newProps.position !== undefined) {
            const target = data.find(column => column.id === newProps.columnId);
            if (!target) { throw new Error("Target Column not found!") };
            currentColumn.items.splice(currentColumn.items.indexOf(item), 1);
            target.items.splice(newProps.position, 0, item);
        };
        save(data);
    };

    static deleteItem(itemId) {
        const data = read();
        for (const column of data) {
            const item = column.items.find(item => item.id === itemId);
            if (item) { column.items.splice(column.items.indexOf(item), 1) };
        };
        save(data);
    }
};

class Kanban {
    constructor(root) {
        this.root = root;
        Kanban.columns().forEach(column => {
            const columnView = new Column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        });
    };

    static columns() {
        return [
            { id: 1, title: "Not Started" },
            { id: 2, title: "In Progress" },
            { id: 3, title: "Completed" },
        ]
    }
};

class Column {
    constructor(id, title) {
        const drop = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban-title");
        this.elements.items = this.elements.root.querySelector(".kanban-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban-btn");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(drop);

        this.elements.addItem.addEventListener("click", () => { 
            const newItem = KanbanAPI.insertItem(id, "");
            this.renderItem(newItem);
        });

        KanbanAPI.getItems(id).forEach(item => { this.renderItem(item) });
    };

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `<div class="kanban-column">
                <div class="kanban-title"></div>
                <div class="kanban-items"></div>
                <button class="kanban-btn" type="button">+ Add</button>
            </div>`
        ).children[0];
    };

    renderItem(data) { 
        const item = new Item(data.id, data.content);
        this.elements.items.appendChild(item.elements.root);
    };
};

class Item { 
    constructor(id, content) {
        const drop = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;
        this.elements.root.appendChild(drop);

        this.elements.input.addEventListener("blur", () => { onBlur() });
        this.elements.root.addEventListener("dblclick", () => { 
            const check = confirm("Are you sure you want to delete this item?");
            if (check) {
                KanbanAPI.deleteItem(id);
                this.elements.input.removeEventListener("blur", () => { onBlur() });
                this.elements.root.parentElement.removeChild(this.elements.root);
            };
        });
        this.elements.root.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", id) });
        this.elements.input.addEventListener("drop", (e) => { e.preventDefault() });

        const onBlur = () => { 
            const newContent = this.elements.input.textContent.trim();
            if (newContent === this.content) return;
            this.content = newContent;
            KanbanAPI.updateItem(id, { content: this.content });
        };

    };

    static createRoot() {
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(
            `<div class="kanban-item" draggable="true">
                <div class="kanban-input" contenteditable></div>
            </div>`
        ).children[0];
    }
};

class DropZone {
    static createDropZone() {
        const range = document.createRange();
        range.selectNode(document.body);
        const dropZone = range.createContextualFragment(
            `<div class="kanban-dropzone"></div>`
        ).children[0];

        dropZone.addEventListener("dragover", (e) => { 
            e.preventDefault();
            dropZone.classList.add("active");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("active");
        });

        dropZone.addEventListener("drop", (e) => {
            e.preventDefault();
            dropZone.classList.remove("active");

            const columnElem = dropZone.closest(".kanban-column");
            const columnId = Number(columnElem.dataset.id);
            const dropInColumns = Array.from(columnElem.querySelectorAll(".kanban-dropzone"));
            const droppedIndex = dropInColumns.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const dropped = document.querySelector(`[data-id="${ itemId }"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban-item") ?
                dropZone.parentElement : dropZone;
            if (dropped.contains(dropZone)) return;
            insertAfter.after(dropped);
            KanbanAPI.updateItem(itemId, {
                columnId, 
                position: droppedIndex
            })

            console.log(dropInColumns);
            console.log(droppedIndex);
            console.log(dropped);
        })

        return dropZone;
    }
}

function read() {
    const kanbanData = JSON.parse(localStorage.getItem("kanban-data")) ||
    [ { id: 1, items: [] }, { id: 2, items: [] }, { id: 3, items: [] } ];
    return kanbanData;
}

function save(data) { localStorage.setItem("kanban-data", JSON.stringify(data)) };

new Kanban(document.querySelector(".kanban"));