import "./demo.css";
import { formatDate, formatTime } from "@utils/date";
import { initializeIcons } from "@assets/Icons/icons";

let displayed;
let dateFormat;
let timeFormat;

const tasks = [
    {
        id: crypto.randomUUID(), title: "Dashboard Project", content: "Refine Dashboard UI, add draggable API widget and analytics chart.",
        createdAt: new Date().toISOString(), priority: "low",
        tags: ["work", "web dev"], dueDate: null, dueTime: null,
    },
    {
        id: crypto.randomUUID(), title: "Reading", content: "Read for tomorrow's subject tests: maths, civic, english etcetera.",
        createdAt: new Date().toISOString(), priority: "medium",
        tags: ["school", "reading"],
    },
    {
        id: crypto.randomUUID(), title: "Piano Practice", content: "Score the song to be sang during choir ministration on Sunday.",
        createdAt: new Date().toISOString(), priority: "high",
        tags: ["church", "activity"],
    },
];

const tagTemplate = document.querySelector(".tag-template");
const taskTemplate = document.querySelector(".task-template");

function renderTask(taskData) {
    taskData.forEach(taskData => {
        const clone = taskTemplate.content.cloneNode(true);
        const createdAt = clone.querySelector(".created-at");
        dateFormat = formatDate(taskData.createdAt);
        timeFormat = formatTime(taskData.createdAt);
        const task = clone.querySelector(".task");
        const date = task.querySelector(".date");
        const tags = task.querySelector(".tags");
        const priority = task.querySelector(".priority-badge");
        const id = taskData.id;

        task.dataset.id = id;
        date.textContent = dateFormat;
        priority.textContent = taskData.priority;
        priority.classList.add(`${ taskData.priority }`);
        task.classList.add(`priority-${ taskData.priority }`);
        task.querySelector(".task-title").textContent = taskData.title;
        task.querySelector(".task-content").textContent = taskData.content;

        createTag(taskData.tags, tags);

        createdAt.addEventListener("click", (e) => {
            const alarmIcon = createdAt.querySelector(".alarm-icon svg");
            displayed = date.classList.contains("display");
            if (e.target === alarmIcon && !displayed) {
                date.classList.add("display");
            } else if (e.target === alarmIcon && displayed) {
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

        document.body.append(task);
    });
};

function createTag(tags, body) {
    tags.forEach(tag => {
        const tagClone = tagTemplate.content.cloneNode(true);
        const tagDisplay = tagClone.querySelector(".tag");
        tagDisplay.textContent = tag;
        body.append(tagDisplay);
    });
};

renderTask(tasks);
initializeIcons(document);