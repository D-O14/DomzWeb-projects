import "./expo.css";
import { initializeIcons } from "@assets/Icons/icons"
/*import { enableDrag, enableDrop, changeOnDrop, switchPositon } from "@utils/dragDrop";
const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(draggable => { enableDrop(draggable, switchPositon) });
dropzones.forEach(dropzone => { enableDrop(dropzone, changeOnDrop) });

enableDrag(document);*/


const tasks = [
    { id: crypto.randomUUID(), content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Accusantium, facere.", column: "toDoColumn" },
    { id: crypto.randomUUID(), content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Accusantium, facere.", column: "toDoColumn" },
    { id: crypto.randomUUID(), content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Accusantium, facere.", column: "toDoColumn" },
    { id: crypto.randomUUID(), content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Accusantium, facere.", column: "progressColumn" },
    { id: crypto.randomUUID(), content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Accusantium, facere.", column: "completedColumn" },
];

const columns = [
    { id: 1, title: "Not Started", tasks: [], dataColumn: "toDoColumn" },
    { id: 2, title: "In Progress", tasks: [], dataColumn: "progressColumn" },
    { id: 3, title: "Completed", tasks: [], dataColumn: "completedColumn" }
]

const columnContainer = query(document, ".columns");
const taskTemplate = query(document, ".task-template");
const columnTemplate = query(document, ".column-template");

function renderColumns(data) {
    columnContainer.replaceChildren();
    data.forEach(column => {
        const columnClone = columnTemplate.content.cloneNode(true);
        const columnElement = columnClone.querySelector(".column");
        const tasks = columnElement.querySelector(".tasks");
        const taskCount = columnElement.querySelector(".task-count");
        const addTaskBtn = columnElement.querySelector(".add-task-btn");
        columnClone.querySelector(".column-title").textContent = column.title;
        columnElement.dataset.column = column.dataColumn;
        columnElement.id = column.id;
        taskCount.textContent = column.tasks.length;
        column.tasks.forEach(task => { renderTasks(tasks, columnElement) });
        addTaskBtn.addEventListener("click", () => {
            const newTask = addTask(column.id, "");
            renderTasks(tasks, newTask);
        });
        columnContainer.append(columnElement);
    });
};

function renderTasks(parent, taskData) {
    const id = taskData.id;
    const taskItem = taskTemplate.content.cloneNode(true);
    const taskElement = taskItem.querySelector("article");
    const taskContent = taskElement.querySelector(".task-content");
    taskContent.textContent = taskData.content;
    taskElement.dataset.id = id;
    parent.append(taskElement);
};

function addTask(columnId, content) {
    const column = columns.find(column => column.id === columnId);
    if (!column) { throw new Error("Column does not exist!") };
    const newTask = { id: crypto.randomUUID(), content: content, column: column.dataColumn };
    column.tasks.push(newTask);
    return newTask;
};

function query(root, value) {
    const element = root.querySelector(value);
    return element;
};

renderColumns(columns);
initializeIcons(document);