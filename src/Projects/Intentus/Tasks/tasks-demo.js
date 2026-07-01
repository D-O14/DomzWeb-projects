
const tasks = [];
const tasksSection = document.querySelector(".tasks-content");
const template = document.querySelector(".task-template");
const empty = document.querySelector(".empty-template");
const searchInput = document.querySelector("searchInput");
const taskBtn = document.querySelector(".taskBtn");
const saveBtn = document.querySelector(".save");
const dialog = document.querySelector("dialog");
const taskInput = document.querySelector(".taskInput");

document.addEventListener("DOMContentLoaded", () => { renderTasks(tasksSection, tasks) });

function addTask() {
    const task = {
        id: crypto.randomUUID(),
        taskName: taskInput.value.trim(),
        createdAt: getCurrentTime(),
        alarm: null,
        completed: false,
    };

    tasks.unshift(task);
    taskInput.value = "";

    renderTasks(tasksSection, tasks);
}

function getCurrentTime() {
    let hours = String(new Date().getHours()).padStart(2, "0");
    let minutes = String(new Date().getMinutes()).padStart(2, "0");
    let suffix = hours >= 12 ? "PM" : "AM";
    return `${ hours }:${ minutes }${ suffix }`;
}

function renderTasks(section, array) {
    section.innerHTML = "";
    document.querySelector(".value").textContent = array.length > 0 ? array.length : 0;

    if (array.length === 0) {
        section.append(empty.content.cloneNode(true));
        return;
    }

    array.forEach(arr => {
        const task = template.content.cloneNode(true);
        task.querySelector(".task-title").textContent = arr.taskName;
        task.querySelector(".task-date").textContent = arr.createdAt;
        task.querySelector(".check").id = arr.id;
        task.querySelector(".label").htmlFor = arr.id;
        section.append(task);
    });
};

function validateTask() {
    if (taskInput.value.trim() === "") {
        saveBtn.setAttribute("disabled", "true");
    } else {
        saveBtn.removeAttribute("disabled");
    };
}

taskBtn.addEventListener("click", () => { dialog.showModal();  /*addTask();*/ });
saveBtn.addEventListener("click", () => { dialog.close() });
taskInput.addEventListener("input", () => { validateTask(); });