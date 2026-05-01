const tableBody = document.getElementById("body");

const user1 = {
    id: crypto.randomUUID(),
    name: "Anna Beige",
    email: "AnnaBg@gmail.com",
    DateOfBirth: "16/09/1990",
    age: 36,
    gender: "Female",
    company: "Cevorex",
}

const user2 = {
    id: crypto.randomUUID(),
    name: "Diana Carter",
    email: "MSDC@gmail.net",
    DateOfBirth: "4/01/1973",
    age: 47,
    gender: "Female",
    company: "DeFashv",
}

const user3 = {
    id: crypto.randomUUID(),
    name: "Drew Mcarthy",
    email: "Mcarthy_Drew@info.com",
    DateOfBirth: "26/05/2002",
    age: 24,
    gender: "Male",
    company: "NYCPD",
}

const user4 = {
    id: crypto.randomUUID(),
    name: "Lucas Elcastio",
    email: "El_Dynst@info.net",
    DateOfBirth: "13/11/2002",
    age: 24,
    gender: "Male",
    company: "El Dynst",
}

const user5 = {
    id: crypto.randomUUID(),
    name: "Lucius Dornell",
    email: "Ld_Empire@hotmail.net",
    DateOfBirth: "12/06/1998",
    age: 28,
    gender: "Male",
    company: "Empire",
}

const users = []
users.push(user1, user2, user3, user4, user5);
/*localStorage.setItem("users", JSON.stringify(users))
console.log(localStorage)*/

function table() {
    let rows = ""
    users.forEach(user => {
        rows += `
            <tr class="row">
            
                        <td><input type="checkbox"></td>
                        <td class="id">${ user.id }</td>
                        <td>${ user.name }</td>
                        <td><a href="">${ user.email }</a></td>
                        <td>${ user.DateOfBirth }</td>
                        <td>${ user.age }</td>
                        <td>${ user.gender }</td>
                        <td>${ user.company }</td>
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

                            <button class="btn delete">
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

const deleteBtn = document.querySelectorAll(".delete")
deleteBtn.forEach(delBtn => {
    delBtn.onclick = function () { dialog.showModal() };
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
confirmBtn.onclick = function () {
    dialog.close()
}

const cancelBtn = document.querySelector(".exit");
cancelBtn.onclick = function () {
    dialog.close()
}

// Edit Modal

const editBtn = document.querySelectorAll(".edit")
editBtn.forEach(editBtn => {
    editBtn.onclick = function () {
        editModal.showModal()
    }
})

const editModal = document.createElement("dialog")
editModal.id = "editModal"
editModal.className = "editModal"
editModal.innerHTML = `
<form action="">
<label for="name">
    Name:
    <input type="text" id="name" placeholder="John Doe">
</label>

<label for="email">
    E-mail:
    <input type="email" id="email" placeholder="your_email@gmail.com">
</label>

<label for="date">
    Date of Birth:
    <input type="date" id="date">
</label>

<label for="gender">
    Gender:
    <input type="text" id="gender" placeholder="Male/Female">
</label>

<label for="company">
    Company:
    <input type="text" id="company" placeholder="Company">
</label>

<button id="EditBtn" class="EditBtn" type="button" popovertarget="popover" popovertargetaction="show">Submit</button>
</form>
`
document.body.append(editModal)

const editModalBtn = document.querySelector(".EditBtn")
editModalBtn.addEventListener("click", (e) => { e.preventDefault() })
editModalBtn.onclick = function () { editModal.close() }

/*const popover = document.createElement("div")
popover.setAttribute("popover", "manual")
popover.id = "popover"
popover.className = "popover"
popover.innerHTML = `
                <div class="toast" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
                        fill="currentColor" class="icon icon-check">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path
                            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
                    </svg>
                    <div class="toast-content">
                        <strong>
                            Success!
                        </strong>
                        <p>User has been updated successfully.</p>
                    </div>
                </div>
        `
document.body.append(popover)

const toast = document.querySelector(".popover")
setTimeout(() => {
    toast.classList.add("close");
}, 4000)*/