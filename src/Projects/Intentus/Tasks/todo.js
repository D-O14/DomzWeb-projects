const input = document.querySelector("input");
const addBtn = document.querySelector(".addBtn");
const container = document.querySelector(".container");
const form = document.querySelector("form");
const toast = document.createElement("div");
const taskTemplate = document.querySelector("#taskTemplate");
const emptyTemplate = document.querySelector("#emptyTemplate");

function createTask() {
    const date = new Date();
    if (input.value.trim() === "") return;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = {
        id: crypto.randomUUID(),
        text: input.value,
        createdAt: formatDate(),
    };

    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderList();
    form.reset();
}


function formatDate() {
    const date = new Date();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();

    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    minutes = minutes.toString().padStart(2, "0");

    let suffix = "th";
    if (day % 10 === 1 && day !== 11) {
        suffix = "st";
    } else if (day % 10 === 2 && day !== 12) {
        suffix = "nd";
    } else if (day % 10 === 3 && day !== 13) {
        suffix = "rd";
    }

    return `${ day }${ suffix }  ${ month } ${ year }, ${ hour }:${ minutes } ${ period }`;
}

/*function relativeDate(){
    const createdAt = new Date(task.createdAt);
    const now = new Date();
    const diff = now - createdAt;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (seconds < 30) {
        return "Just Now";
    } else if (minutes < 60) {
        return `${ minutes } mins ago`;
    } else if (hours < 24) {
        return `${ hours } hours ago`
    } else if (days < 7) {
        return `${ days } days ago`
    } else if(days < 21){
        return createdAt.toLocaleString();
    }  else{
        return formatDate();
    }
    
    setInterval(() => {
        renderList();
    }, 60000);
}*/

function renderList() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    container.innerHTML = "";

    tasks.forEach(task => {
        const todo = taskTemplate.content.cloneNode(true);
        todo.querySelector(".list").textContent = `${ task.text }`;
        todo.querySelector(".date").textContent = `${ task.createdAt }`;
        todo.querySelector(".todo").dataset.id = `${ task.id }`;
        todo.querySelector("#check").id = `task-${ task.id }`;
        todo.querySelector("label").setAttribute("for", `task-${ task.id }`);

        container.append(todo);
    });

    if (tasks.length === 0) {
        const emptyState = emptyTemplate.content.cloneNode(true);
        container.append(emptyState);
    }
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    createTask();
    renderList();
});

function validateInput() {
    addBtn.disabled = input.value.trim() === "";
}

validateInput();

input.addEventListener("input", validateInput);

container.addEventListener("input", e => {
    if (e.target.classList.contains("list")) {
        const todo = e.target.closest(".todo");
        const id = todo.dataset.id;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = tasks.find(task => task.id === id)
        task.text = e.target.textContent;
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}, true);

container.addEventListener("click", e => {
    if (e.target.classList.contains("check")) {
        const todo = e.target.closest(".todo");
        const id = todo.dataset.id;
        const text = todo.querySelector(".list");
        text.classList.toggle("done");

        setTimeout(() => {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks = tasks.filter(task => { return task.id !== id });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderList();
            //showToast("Success!", "Task completed!")
        }, 1000)

        /*setTimeout(() => {
            toast.classList.add("close");
        }, 3000);

        setTimeout(() => {
            toast.remove();
        }, 3500);*/
    }

    const delBtn = e.target.closest(".del")
    if (delBtn) {
        const todo = delBtn.closest(".todo");
        const id = todo.dataset.id;
        todo.remove();
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => { return task.id !== id });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        //showToast("Success!", "Task deleted!");

        /*setTimeout(() => {
            toast.classList.add("close");
        }, 3000);

        setTimeout(() => {
            toast.remove();
        }, 3500);*/
    }

});

window.addEventListener("load", () => { renderList() });

function showToast(status, message) {
    toast.className = "toast";
    toast.innerHTML = `
        <strong>${ status }</strong>
        <p>${ message }</p>
    `
    document.body.prepend(toast);
}