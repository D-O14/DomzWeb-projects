import "./crud_table.css";
import { closeDialog } from "@utils/button";
import { read, save } from "@utils/database";
import { initializeIcons } from "@assets/Icons/icons";

let users = read("users");
let currentDelBtn = null;

//const toast = document.querySelector("toast-notif");
const editForm = document.getElementById("editForm");
const dobInput = document.getElementById("dateInput");
const tableBody = document.getElementById("tableBody");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const editDialog = document.getElementById("editDialog");
const rowTemplate = document.querySelector(".row-template");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const confirmDialog = document.getElementById("confirmDialog");
const emptyTemplate = document.querySelector(".empty-template");
const cancelBtn = document.querySelector(".cancel-operation-btn");
const confirmBtn = document.querySelector(".confirm-operation-btn");

tableBody.addEventListener("click", (e) => { 
    const row = e.target;
    if (!row) return;
    const editBtn = row.closest(".edit-btn");
    const deleteBtn = row.closest(".del-btn");
    if (editBtn) { editRow(editBtn, editBtn.dataset.id) };
    if (deleteBtn) { 
        currentDelBtn = deleteBtn;
        confirmDialog.showModal();
    };
});

confirmBtn.addEventListener("click", () => { removeRow(currentDelBtn, users) });
cancelBtn.addEventListener("click", () => { closeDialog(confirmDialog) });
cancelEditBtn.addEventListener("click", () => { closeDialog(editDialog) });
nameInput.addEventListener("input", () => { validateName(nameInput) })
emailInput.addEventListener("input", () => { validateEmail(emailInput) })
dobInput.addEventListener("input", () => { validateDOB(dobInput) })

editForm.addEventListener("submit", (e) => { updateRow(users, e) });

/*showToast("Success!", "User updated successfully");
setTimeout(() => { toast.classList.add("close") }, 3000)
setTimeout(() => { toast.remove() }, 4000);
function showToast(status, message) {
    toast.className = "toast";
    toast.classList.add(status);
    toast.setAttribute("role", "alert")
    toast.innerHTML =
    `
        <div class="toast-content">
            <strong>
                ${ status }
            </strong>
            <p>${ message }</p>
        </div>
    `
    document.body.prepend(toast);
    return toast;
};*/

function renderRows(data) {
    tableBody.replaceChildren();
    if (data.length === 0) {
        const noUsers = emptyTemplate.content.cloneNode(true);
        tableBody.append(noUsers);
    } else {
        data.forEach(user => {
            const row = rowTemplate.content.cloneNode(true);
            const userEmail = row.querySelector(".user-email");
            row.querySelector(".user-id").textContent = user.id;
            row.querySelector(".user-age").textContent = user.age;
            row.querySelector(".user-name").textContent = user.name;
            row.querySelector(".user-gender").textContent = user.gender;
            row.querySelector(".user-dateOfBirth").textContent = user.dateOfBirth;
            row.querySelectorAll(".action").forEach(action => { action.dataset.id = user.id });
            userEmail.href = `mailto:${ user.email }`;
            userEmail.textContent = user.email;
            initializeIcons(row);
            tableBody.append(row);
        })
    }
};

function removeRow(button, data) {
    const row = button.closest("tr");
    row.remove();
    closeDialog(confirmDialog);
    const userToDelete = data.find(user => { return user.id === button.dataset.id });
    const newData = data.filter(user => user.id !== userToDelete.id);
    save("users", newData);
};

function editRow(button, id) {
    button.addEventListener("click", () => {
        const user = users.find(user => { return user.id === id });
        const genderInput = document.querySelector(`input[name="gender"][value="${ user.gender }"]`);
        nameInput.value = user.name;
        emailInput.value = user.email;
        dobInput.value = user.dateOfBirth;
        genderInput.checked = true;
        editDialog.showModal();
    });
};

function updateRow(data, e) {
    e.preventDefault();
    const user = data.find(user => user.id === selectedUserId);
    const selectedGender = document.querySelector('input[name="gender"]:checked')?.value;

    user.name = nameInput.value;
    user.gender = selectedGender;
    user.email = emailInput.value;
    user.dateOfBirth = dobInput.value;
    user.age = calcAge(dobInput.value);

    save("users", data);
    renderRows(data);

    setTimeout(() => { closeDialog(editDialog) }, 500);
};

renderRows(users);