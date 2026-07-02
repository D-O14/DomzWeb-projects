const tasks = [];
const tasksSection = document.querySelector(".tasks-content");
const template = document.querySelector(".task-template");
const empty = document.querySelector(".empty-template");
const searchInput = document.getElementById("searchInput");
const taskBtn = document.querySelector(".taskBtn");
const saveBtn = document.querySelector(".saveTask");
const dialog = document.querySelector("dialog");
const taskInput = document.querySelector(".taskInput");

document.addEventListener("DOMContentLoaded", () => {
    renderTasks(tasksSection, tasks);
    validateTask(taskInput, saveBtn);
});

function addTask(array, input) {
    const task = {
        id: crypto.randomUUID(),
        taskName: input.value.trim(),
        createdAt: getCurrentTime(),
        alarm: null,
        completed: false,
        tags: [null, null],
    };

    array.unshift(task);
    input.value = "";

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
        task.querySelector(".content").htmlFor = arr.id;
        section.append(task);
    });
};

function validateTask(input, button) {
    if (input.value.trim() === "") {
        button.setAttribute("disabled", "true");
    } else {
        button.removeAttribute("disabled");
    };
}

function searchTasks(array, input) {
    let searched = input.value.trim().toLowerCase();
    const searchedTasks = array.filter(arr => {
        return arr.taskName.toLowerCase().includes(searched);
    });
    renderTasks(tasksSection, searchedTasks);
}

searchInput.addEventListener("input", () => { searchTasks(tasks, searchInput) });

taskBtn.addEventListener("click", () => {
    dialog.showModal();
    dialog.classList.add("open");
});

saveBtn.addEventListener("click", () => {
    dialog.classList.remove("open");
    dialog.classList.add("closing");
    addTask(tasks, taskInput);
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove("closing");
    }, 500);
});

taskInput.addEventListener("input", () => {
    validateTask(taskInput, saveBtn);
});