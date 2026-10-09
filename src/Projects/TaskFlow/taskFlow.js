import "./taskFlow.css";
import { createIcons, icons } from "lucide";
import { save, read } from "@utils/database";
import { formatDate, formatTime } from "@utils/date";
import { initializeIcons } from "@assets/Icons/icons";
import { enableDrag, enableDrop, changeOnDrop, switchPositon } from "@utils/dragDrop";

let displayed;
let dataCount;
let dateFormat;
let timeFormat;

const kanbanTasks = read("kanban-tasks", [
    { id: 1, title: "To Do", tasks: [], dataColumn: "toDoColumn" },
    { id: 2, title: "In Progress", tasks: [], dataColumn: "progressColumn" },
    { id: 3, title: "Completed", tasks: [], dataColumn: "completedColumn" }
]);

const columnContainer = document.querySelector(".columns");
const kanbanBoard = document.querySelector(".kanban-board");
const taskTemplate = document.querySelector(".task-template");
const emptyTemplate = document.querySelector(".empty-template");
const columnTemplate = document.querySelector(".column-template");
const dropzoneTemplate = document.querySelector(".dropzone-template");

/*function updateTaskCount(column) { 
    const tasks = column.querySelector(".tasks").children;
    const taskCount = column.querySelector(".task=count");
    taskCount.textContent = tasks.length;
};

function observeChanges(columns) { 
    for (const column of columns){
        const observer = new MutationObserver(() => { updateTaskCount(column)});
        observer.observe(column.querySelector(".tasks"), { childList: true });
    };
};*/

function createTask(columnId, content) {
    const column = kanbanTasks.find(column => column.id === columnId);
    if (!column) { throw new Error("Column does not exist!") };
    const task = {
        id: crypto.randomUUID(),
        content: content,
        column: column.dataColumn,
        createdAt: new Date().toISOString(),
        priority: "",
        tags: [],
    };
    column.tasks.push(task);
    save("kanban-tasks", kanbanTasks);
    return task;
};

function updateTask(taskId, newProps) {
    const [task, currentColumn] = (() => {
        for (const column of kanbanTasks) {
            const task = column.tasks.find(task => task.id === taskId);
            if (task) { return [task, column] };
        };
    })();
    if (!task) { throw new Error("Task Not Found!") };
    task.content = newProps.content === undefined ? task.content : newProps.content;
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
        const target = kanbanTasks.find(column => column.id === newProps.columnId);
        if (!target) { throw new Error("Target Column not found!") }
        currentColumn.tasks.splice(currentColumn.tasks.indexOf(task), 1);
        target.tasks.splice(newProps.position, 0, task);
        task.column = target.dataColumn;
    };
    save("kanban-tasks", kanbanTasks);
};

function deleteTask(taskId) {
    for (const column of kanbanTasks) {
        dataCount = column.tasks.length;
        const task = column.tasks.find(task => task.id === taskId);
        if (task) { column.tasks.splice(column.tasks.indexOf(task), 1); break };
        dataCount--;
        console.log(column);
        console.log(`data count of ${ column.dataColumn } is: ${ dataCount }`);
    };
    save("kanban-tasks", kanbanTasks);
};

function renderTask(taskData, columnElement) {
    const clone = taskTemplate.content.cloneNode(true);
    const createdAt = clone.querySelector(".created-at");
    const input = clone.querySelector(".task-input");
    dateFormat = formatDate(taskData.createdAt);
    timeFormat = formatTime(taskData.createdAt);
    const task = clone.querySelector(".task");
    const date = clone.querySelector(".date");
    const dropzone = renderDropzone();
    const id = taskData.id;

    task.dataset.id = id;
    task.appendChild(dropzone);
    input.textContent = taskData.content;
    date.textContent = dateFormat;

    createdAt.addEventListener("click", (e) => { 
        const alarmIcon = createdAt.querySelector(".alarm-icon svg");
        displayed = date.classList.contains("display");
        if (e.target === alarmIcon && !displayed) { 
            date.classList.add("display");
        } else if(e.target === alarmIcon && displayed) {
            date.classList.remove("display");
        };
    });
    date.addEventListener("click", () => {
        date.textContent === dateFormat ? date.textContent = timeFormat :
            date.textContent = dateFormat;
    });
    task.addEventListener("click", (e) => {
        const deleteBtn = task.children[4].querySelector(".delete-task-btn .icon svg");
        if (e.target === deleteBtn) {
            const check = confirm("Are you sure you want to delete this task?");
            if (check) { deleteTask(id); task.remove() };  
        };
    });
    task.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", id) });
    input.addEventListener("blur", () => {
        const newContent = input.textContent.trim();
        if (newContent === taskData.content) return;
        taskData.content = newContent;
        updateTask(id, { content: newContent });
    });
    input.addEventListener("drop", (e) => { e.preventDefault() });

    columnElement.append(task);
};

function renderColumn(columnData) {
    dataCount = columnData.tasks.length;
    const clone = columnTemplate.content.cloneNode(true);
    const column = clone.querySelector(".column");
    const tasks = clone.querySelector(".tasks");
    const taskCount = clone.querySelector(".task-count");
    const addTaskBtn = clone.querySelector(".add-task-btn");
    const columnTitle = clone.querySelector(".title");
    /*const dropzone = renderDropzone();
    tasks.appendChild(dropzone);*/

    column.dataset.id = columnData.id;
    columnTitle.textContent = columnData.title;
    column.dataset.column = columnData.dataColumn;
    taskCount.textContent = dataCount;

    columnData.tasks.forEach(task => { renderTask(task, tasks) });
    addTaskBtn.addEventListener("click", () => {
        const newTask = createTask(columnData.id, "");
        renderTask(newTask, tasks);
        dataCount++;
        console.log(`data count of ${ columnData.dataColumn } is: ${ dataCount }`);
    });
    return column;
};

function renderDropzone() {
    const clone = dropzoneTemplate.content.cloneNode(true);
    const dropzone = clone.querySelector(".dropzone");
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("active") });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("active") });
    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("active");
        const column = dropzone.closest(".column");
        const columnId = Number(column.dataset.id);
        const taskId = e.dataTransfer.getData("text/plain");
        const dropInColumns = column.querySelectorAll(".dropzone");
        const droppedIndex = [...dropInColumns].indexOf(dropzone);
        const dropped = document.querySelector(`[data-id="${ taskId }"]`);
        const insertAfter = dropzone.parentElement.classList.contains("task-input") ?
            dropzone.parentElement : dropzone;
        if (dropped.contains(dropzone)) return;
        insertAfter.after(dropped);
        updateTask(taskId, { columnId: columnId, position: droppedIndex, column: column.dataset.column });
    });
    return dropzone;
};

function renderKanban(data) {
    columnContainer.replaceChildren();
    data.forEach(columnData => {
        const column = renderColumn(columnData);
        columnContainer.append(column);
    });
    createIcons({ icons });
    initializeIcons(kanbanBoard);
};

renderKanban(kanbanTasks);