import "./crud_form.css";
import { toggleField } from "@utils/input";
import { read, save } from "@utils/database";
import { initializeIcons } from "@assets/Icons/icons";
import { validators, showError, clearError } from "@utils/validation";

let valid = false;

const users = read("users");
const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const dobInput = document.getElementById("dobInput");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const confirmPassInput = document.getElementById("confirmPasswordInput");
const submitBtn = document.getElementById("submit");
const passToggle = document.getElementById("passToggle");
const confirmPassToggle = document.getElementById("confirmPassToggle");

function validateForm(inputs) {
    valid = true;
    inputs.forEach(input => {
        const validator = validators[input.name];
        if (validator) { valid = false };
    });
    return valid;
};

function load(button) {
    button.classList.add("loading")
    button.setAttribute("disabled", "true")
    setTimeout(() => {
        button.classList.remove("loading")
        button.removeAttribute("disabled")
    }, 3000);
};

function createUser(formData) {
    return {
        id: crypto.randomUUID(),
        userName: formData.get("name"),
        userEmail: formData.get("email"),
        userPassword: formData.get("password"),
        userDateOfBirth: formData.get("dateOfBirth"),
        /*userAge: calcAge(dobInput.value),
        userGender: getGender()*/
    };
};

function saveCreated(formData) {
    const user = createUser(formData);
    users.push(user);
    save("users", users);
};

function logIn(data, user) {
    const existingUser = data.find(user => { return user.emailInput === emailInput.value });

    if (existingUser) {
        existingUser.name = nameInput.value;
        existingUser.email = emailInput.value;
        existingUser.gender = getGender();
        existingUser.dateOfBirth = dobInput.value;
        existingUser.age = calcAge(dobInput.value);
        existingUser.password = passwordInput.value;
    } else {
        data.push(user);
    };
};

/*export function calcAge(date) {
    const today = new Date();
    const birthDate = new Date(date);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) { age-- };
    return age;
};

export function validateConfirmPass(input) {
    if (input.value !== passwordInput.value) {
        showError(input, "Passwords do not match");
        return false;
    } else {
        clearError(input)
        return true;
    }
};*/

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const isValid = validateForm(inputs);
    if (isValid) {
        load(submitBtn);
        saveCreated(formData);
        setTimeout(() => { form.reset() }, 4000);
        setTimeout(() => { window.location.href = "../database/crud_table.html" }, 4500);
    }
});

initializeIcons(document);
toggleField(passToggle, passwordInput);
toggleField(confirmPassToggle, confirmPassInput);