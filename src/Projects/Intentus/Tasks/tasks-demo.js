const tasks = [];
const body = document.body;
const tasksSection = document.querySelector(".tasks-content");
const template = document.querySelector(".task-template");
const empty = document.querySelector(".empty-template");
const emptySearch = document.querySelector(".empty-search");
const searchInput = document.getElementById("searchInput");
const taskBtn = document.querySelector(".taskBtn");
const saveBtn = document.querySelector(".saveTask");
const dialog = document.querySelector("dialog");
const taskInput = document.querySelector(".taskInput");
const count = document.querySelector(".count");
const toggle = document.querySelector(".toggle");

document.addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("theme");
    if (theme === "darkmode") {
        body.classList.add("dark-mode");
    } else {
        toggle.setAttribute("aria-checked","false")
    };
    renderTasks(tasksSection, tasks);
    validateTask(taskInput, saveBtn);
});

document.addEventListener("pointerdown", (e) => {
    if (dialog.classList.contains("open") && !dialog.contains(e.target)) {
        dialog.classList.remove("open");
        dialog.classList.add("closing");
    };
});

function addTask(array, input) {
    //input.replace(/\b\w/g, char => char.toUpperCase());
    const task = {
        id: crypto.randomUUID(),
        taskName: input.value.trim(),
        createdAt: getCurrentTime(),
        alarm: null,
        completed: false,
        tag: null,
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
    taskCounter(tasks);

    if (array.length === 0) {
        taskBtn.classList.add("focus");
        section.append(empty.content.cloneNode(true));
        return;
    } else {
        taskBtn.classList.remove("focus");
        array.forEach(arr => {
            const task = template.content.cloneNode(true);
            task.querySelector(".task").dataset.id = arr.id;
            task.querySelector(".task-title").textContent = arr.taskName;
            task.querySelector(".task-date").textContent = arr.createdAt;
            task.querySelector(".check").checked = arr.completed;
            task.querySelector(".task").classList.toggle("completed", arr.completed);
            section.append(task);
        });
    }

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

    if (searchedTasks.length === 0) {
        tasksSection.innerHTML = "";
        const noResults = emptySearch.content.cloneNode(true);
        tasksSection.append(noResults);
    }
}

function toggleTask(e) {
    const checkbox = e.target.closest(".check");
    if (checkbox) {
        const taskElem = checkbox.closest(".task");
        const id = taskElem.dataset.id;
        const task = tasks.find(task => { return task.id === id });
        task.completed = !task.completed;
    } else {
        return;
    }
    renderTasks(tasksSection, tasks);
    taskCounter(tasks);
};

function taskCounter(array) {
    const completed = array.filter(arr => { return arr.completed });
    if (completed.length === 0) {
        count.textContent = array.length;
    } else {
        count.textContent = `${ completed.length } / ${ array.length }`;
    }
}

function themeSwitch() {
    toggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const isDark = body.classList.contains("dark-mode");
        localStorage.setItem("theme", isDark ? "darkmode" : "lightmode");
        toggle.setAttribute("aria-checked", isDark);
    });
}

themeSwitch();

tasksSection.addEventListener("click", toggleTask);
searchInput.addEventListener("input", () => { searchTasks(tasks, searchInput) });

taskBtn.addEventListener("click", () => {
    dialog.showModal();
    dialog.classList.add("open");
});

saveBtn.addEventListener("click", () => {
    dialog.classList.add("closing");
    addTask(tasks, taskInput);
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove("open");
        dialog.classList.remove("closing");
    }, 500);
});

taskInput.addEventListener("input", () => {
    validateTask(taskInput, saveBtn);
});