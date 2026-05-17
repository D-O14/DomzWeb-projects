//import { calcAge } from "./crud_form.js";

const title = document.title;
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        document.title = "Oi! You aren't finished here!"
    } else if (document.visibilityState === "visible") {
        document.title = title;
    }
})

let selectedUserId = null;

const tableBody = document.getElementById("body");

let users = JSON.parse(localStorage.getItem("users")) || []

function table() {
    let rows = ""
    users.forEach(user => {
        rows += `
            <tr class="row">
            
                        <td><input type="checkbox"></td>
                        <td class="id">${ user.id }</td>
                        <td>${ user.name }</td>
                        <td><a href="">${ user.email }</a></td>
                        <td>${user.dateOfBirth }</td>
                        <td>${ user.age }</td>
                        <td>${ user.gender }</td>
                        <td>
                        <div class="actions">
                            <button class="btn edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-pen">
                            <path
                                d="M14.364 13.634a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506l4.013-4.009a1 1 0 0 0-3.004-3.004z" />
                            <path d="M14.487 7.858A1 1 0 0 1 14 7V2" />
                            <path d="M20 19.645V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l2.516 2.516" />
                            <path d="M8 18h1" />
                        </svg>
                            </button>

                            <button class="btn delete" data-id="${user.id}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash">
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
                            </button>
                        </div>
                        </td>        
                    </tr> `

    })

    tableBody.innerHTML += `${ rows }`

}

table()

// Delete button / Modal trigger

const deleteBtn = document.querySelectorAll(".delete");
let currentDelBtn = null;
deleteBtn.forEach(delBtn => {
    delBtn.onclick = function () { currentDelBtn = this; selectedUserId = currentDelBtn.dataset.id; dialog.showModal(); }
})

// Confirmation Modal 

const dialog = document.createElement("dialog")
dialog.id = "dialog";
dialog.className = "dialog";
dialog.innerHTML = `
    <div class="modal">
        <h1>Confirm deletion</h1>
        <div class="message">
            <p class="message-content">Deletion is permanent! Would you like to proceed?</p>
        </div>
        <menu>
            <button class="exit">Cancel</button>
            <button class="close">Confirm</button>
        <menu>
    </div>
        `
document.body.appendChild(dialog);

const confirmBtn = document.querySelector(".close");
confirmBtn.addEventListener("click", function () {
    const row = currentDelBtn.closest("tr");
    row.remove();
    dialog.close();
    users = users.filter(user => user.id !== selectedUserId);
    localStorage.setItem("users", JSON.stringify(users));
    showToast("Success", "User deleted successfully!");

    setTimeout(() => {
        toast.classList.add("close");
    }, 3000)

    setTimeout(() => {
        document.body.removeChild(toast)
    }, 4000)
});

const cancelBtn = document.querySelector(".exit");
cancelBtn.onclick = function () {
    dialog.close();
}

// Edit Modal
let currentRow = null;

const editBtn = document.querySelectorAll(".edit")
editBtn.forEach(editBtn => {
    editBtn.addEventListener("click", function () {
        const row = this.closest("tr");
        currentRow = row;

        const name = row.children[2].textContent;
        const email = row.children[3].textContent;
        const dob = row.children[4].textContent;
        const gender = row.children[6].textContent;

        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        document.getElementById("date").value = dob;
        document.getElementById("gender").value = gender;

        editModal.showModal();
    })
})


const editModal = document.createElement("dialog")
editModal.id = "editModal"
editModal.className = "editModal"
editModal.innerHTML = `
<form action="" id="form" autocomplete="off">
<label for="name">
    Name:
    <input type="text" id="name" placeholder="John Doe" name="name">
</label>

<label for="email">
    E-mail:
    <input type="email" id="email" placeholder="your_email@gmail.com" name="email">
</label>

<label for="date">
    Date of Birth:
    <input type="date" id="date" name="dob">
</label>

<label for="gender">
    Gender:
    <input type="text" id="gender" placeholder="Male/Female" name="gender">
</label>

<button id="EditBtn" class="EditBtn">Submit</button>
</form>
`
document.body.append(editModal)

const form = document.getElementById("form");

const toast = document.createElement("div");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("date").value;
    const gender = document.getElementById("gender").value;

    currentRow.children[2].textContent = name;
    currentRow.children[3].textContent = email;
    currentRow.children[4].textContent = dob;
    currentRow.children[6].textContent = gender;

    setTimeout(() => {
        form.reset();
        editModal.close()
        document.body.removeChild(editModal)
        showToast("Success!", "User updated successfully")
    }, 500)

    setTimeout(() => {
        toast.classList.add("close");
    }, 3000)

    setTimeout(() => {
        document.body.removeChild(toast)
    }, 4000)
})

export function showToast(status, message) {
    toast.className = "toast";
    toast.setAttribute("role", "alert")
    toast.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                        fill="currentColor" class="icon icon-check">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                    <div class="toast-content">
                        <strong>
                            ${ status }
                        </strong>
                        <p>${ message }</p>
                    </div>
        `
    document.body.prepend(toast)
}