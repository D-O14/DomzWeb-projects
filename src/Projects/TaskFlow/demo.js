import "./demo.css";
//import { formatDate, formatTime } from "@utils/date";
import { initializeIcons } from "@assets/Icons/icons";

let isEmpty;

const state = {
    view: "edited",
    truncated: "",
    displayed: "",
    dateFormat: "",
    timeFormat: "",
};

/*const tasks = [
    {
        id: crypto.randomUUID(), title: "Dashboard Project", content: "Refine Dashboard UI, add draggable API widget and analytics chart.",
        createdAt: new Date().toISOString(), priority: "low",
        tags: ["work", "web dev"], dueDate: null, dueTime: null,
    },
    {
        id: crypto.randomUUID(), title: "Reading", content: "Read for tomorrow's subject tests: maths, civic, english etcetera.",
        createdAt: new Date().toISOString(), priority: "medium",
        tags: ["school", "reading"], dueDate: null, dueTime: null,
    },
    {
        id: crypto.randomUUID(), title: "Piano Practice", content: "Score the song to be sang during choir ministration on Sunday.",
        createdAt: new Date().toISOString(), priority: "high",
        tags: ["church", "activity"], dueDate: null, dueTime: null,
    },
];

const tagTemplate = document.querySelector(".tag-template");
const taskTemplate = document.querySelector(".task-template");

function renderTask(tasks, column) {
    column.replaceChildren();
    tasks.forEach(taskData => { initCard(taskData, column) });
};

function initCard(taskData, column) {
    state.dateFormat = formatDate(taskData.createdAt);
    state.timeFormat = formatTime(taskData.createdAt);

    const id = taskData.id;
    const taskClone = taskTemplate.content.cloneNode(true);
    const task = taskClone.querySelector(".task");
    const menu = task.querySelector("menu");
    const tags = task.querySelector(".tags");
    const date = task.querySelector(".date");
    const input = task.querySelector(".task-input");
    const taskTitle = task.querySelector(".task-title");
    const createdAt = task.querySelector(".created-at");
    const priority = task.querySelector(".priority-badge");
    const taskContent = task.querySelector(".task-content");

    task.dataset.id = id;
    taskData.content ? taskContent.textContent = taskData.content : taskContent.textContent = "";
    taskData.title ? taskTitle.textContent = taskData.title : taskTitle.textContent = "Untitled Task";

    if (state.view === "edited") { onUpdate() };

    task.addEventListener("click", (e) => {
        const deleteBtn = menu.querySelector(".delete-task-btn");
        const createdAtIcon = createdAt.querySelector(".date-icon svg");
        if (e.target === deleteBtn) { deleteTask(taskData.id); task.remove() };
        if (e.target === createdAt || e.target === createdAtIcon) { toggleDueDate() };
    });

    input.addEventListener("blur", () => {
        if (taskData.content === "" && taskData.title === "Untitled Task") { deleteTask(id); task.remove() };
    });

    function onUpdate() {
        isEmpty = taskData.priority === "";

        if (isEmpty) {
            priority.classList.add("no-priority");
        } else {
            priority.textContent = taskData.priority;
            priority.classList.add(`${ taskData.priority }`);
            task.classList.add(`priority-${ taskData.priority }`);
        };

        createTag(taskData.tags, tags);
    };

    function toggleDueDate() {
        state.displayed = date.classList.contains("display");
        !state.displayed ? date.classList.add("display") : date.classList.remove("display");
        if (taskData.createdAt === null) {
            date.textContent = "No Due Date";
        } else {
            date.textContent = state.dateFormat ? date.textContent = state.timeFormat :
                date.textContent = state.dateFormat;
        };
    };

    column.append(task);
};

function createTag(tags, parent) {
    isEmpty = tags.length === 0;
    if (isEmpty) {
        parent.classList.add("no-tags");
    } else {
        tags.forEach(tag => {
            parent.classList.remove("no-tags");
            const tagClone = tagTemplate.content.cloneNode(true);
            const tagDisplay = tagClone.querySelector(".tag");
            tagDisplay.textContent = tag;
            parent.append(tagDisplay);
        });
    }
};

renderTask(tasks, document.body);*/
initializeIcons(document);