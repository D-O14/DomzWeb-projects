import "./crud_table.css";
import { closeDialog } from "@utils/button";
import { read, save } from "@utils/database";
import { initializeIcons } from "@assets/Icons/icons";
import { calcAge, validateName, validateEmail, validateDOB } from "../form/crud_form.js";

let users = read("users");
let selectedUserId = null;
let currentDelBtn = null;

const toast = document.querySelector("toast-notif");
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

confirmBtn.addEventListener("click", () => { removeRow(currentDelBtn, users) });
cancelBtn.addEventListener("click", () => { closeDialog(confirmDialog) });
cancelEditBtn.addEventListener("click", () => { closeDialog(editDialog) });
nameInput.addEventListener("input", () => { validateName(nameInput) })
emailInput.addEventListener("input", () => { validateEmail(emailInput) })
dobInput.addEventListener("input", () => { validateDOB(dobInput) })

editForm.addEventListener("submit", (e) => {
    editRow(users, e);
    /*showToast("Success!", "User updated successfully");
    setTimeout(() => { toast.classList.add("close") }, 3000)
    setTimeout(() => { toast.remove() }, 4000);*/
});


/*function showToast(status, message) {
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
            /*deleteBtn.forEach(delBtn => {
                delBtn.addEventListener("click",
                    function () {
                        currentDelBtn = this;
                        selectedUserId = currentDelBtn.dataset.id;
                        confirmDialog.showModal();
                    }
                );
            });
            attachEditEvents();*/
            initializeIcons(row);
            tableBody.append(row);
        })
    }
};

function removeRow(button, data) {
    const row = button.closest("tr");
    row.remove();
    closeDialog(confirmDialog);
    users = data.filter(user => user.id !== selectedUserId);
    save("users", data);
};

/*function attachEditEvents() {
    const editBtn = document.querySelectorAll(".edit")
    editBtn.forEach(editBtn => {
        editBtn.addEventListener("click", () => {
            selectedUserId = editBtn.dataset.id;
            const user = users.find(user => { return user.id === selectedUserId });

            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const dobInput = document.getElementById("date");
            const genderInput = document.querySelector(`input[name="gender"][value="${ user.gender }"]`);

            nameInput.value = user.name;
            emailInput.value = user.email;
            dobInput.value = user.dateOfBirth;
            genderInput.checked = true;

            editDialog.showModal();
        });
    });
};*/

function editRow(data, e) {
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