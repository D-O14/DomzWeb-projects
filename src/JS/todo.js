const input = document.querySelector("input");
const addBtn = document.querySelector(".addBtn");
const div = document.querySelector("div");
const form = document.querySelector("form")
const tabs = document.querySelectorAll(".tab")
tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        if (tab.classList.contains("active")) {
            tab.classList.remove("active")
        } else {
            tab.classList.add("active")
        }
    })
})

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
    console.log(localStorage);

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

let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>`;

function renderList() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let lists = "";
    tasks.forEach(task => {
        lists += `
                <div class="todo" data-id="${ task.id }">
                    <input type="checkbox" class="check">
                    <div class="list-wrapper"> 
                        <p class="list" contenteditable="true">${ task.text }</p>
                        <span class="date">${ task.createdAt }</span>
                    </div>
                    <button class="del" aria-label="delete button">${ icon }</button>
                </div>`;
    });

    div.innerHTML = `${ lists }`

    if (tasks.length === 0) {
        lists = `
        <div>
            <p class="empty-state">
                No tasks yet. Start creating some
            </p>
        </div>`

        div.innerHTML = `${ lists }`
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

div.addEventListener("input", e => {
    if (e.target.classList.contains("list")) {
        const todo = e.target.closest(".todo");
        const id = todo.dataset.id;
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const task = tasks.find(task => task.id === id)
        task.text = e.target.textContent;
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}, true);

div.addEventListener("click", e => {
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
            const notif = new Notification("Message from domzTasks", {
                body: "Task Completed!"
            })
        }, 2000)
    }

    const delBtn = e.target.closest(".del")
    if (delBtn) {
        const todo = delBtn.closest(".todo");
        const id = todo.dataset.id;
        todo.remove();
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => { return task.id !== id });
        localStorage.setItem("tasks", JSON.stringify(tasks));

        const notif = new Notification("Message from domzTasks", {
            body: "Task deleted"
        })
    }
});

window.addEventListener("load", () => { renderList() });