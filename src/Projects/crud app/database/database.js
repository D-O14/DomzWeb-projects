import "./database.css";
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

function renderRows(data) {
    tableBody.replaceChildren();
    if (data.length === 0) {
        const noUsers = emptyTemplate.content.cloneNode(true);
        tableBody.append(noUsers);
    } else {
        data.forEach(user => {
            const row = rowTemplate.content.cloneNode(true);
            const userEmail = row.querySelector(".user-email");
            row.querySelector(".user-id").textContent = user.userId;
            row.querySelector(".user-age").textContent = user.userAge;
            row.querySelector(".user-name").textContent = user.userName;
            row.querySelector(".user-dateOfBirth").textContent = user.userDateOfBirth;
            row.querySelectorAll(".action").forEach(action => { action.dataset.id = user.userId });
            userEmail.href = `mailto:${ user.userEmail }`;
            userEmail.textContent = user.userEmail;
            initializeIcons(row);
            tableBody.append(row);
        })
    }
};

function removeRow(button, data) {
    const row = button.closest("tr");
    row.remove();
    closeDialog(confirmDialog);
    const userToDelete = data.find(user => { return user.userId === button.dataset.id });
    const newData = data.filter(user => user.id !== userToDelete.userId);
    save("users", newData);
};

function editRow(button, id) {
    button.addEventListener("click", () => {
        const user = users.find(user => { return user.userId === id });
        nameInput.value = user.userName;
        emailInput.value = user.userEmail;
        dobInput.value = user.userDateOfBirth;
        editDialog.showModal();
    });
};

function updateRow(data, e) {
    e.preventDefault();
    const user = data.find(user => user.id === selectedUserId);
    user.userName = nameInput.value;
    user.userEmail = emailInput.value;
    user.userDateOfBirth = dobInput.value;
    user.userAge = calcAge(dobInput.value);

    save("users", data);
    renderRows(data);

    setTimeout(() => { closeDialog(editDialog) }, 500);
};

renderRows(users);