import { icons } from "../../../Assets/Icons/icons.js";

const steps = document.querySelectorAll("li");
const formsContainer = document.querySelector(".forms");
const stepContent = document.querySelectorAll(".step-content");
const formsTemplate = document.querySelectorAll(".form-template");
const formCompleted = document.querySelector(".form-completed");
let index = 0;

function renderForms(template, container) {
    template.forEach(template => {
        const form = template.content.cloneNode(true);
        container.append(form);
        initializeIcons();
    });
}

renderForms(formsTemplate, formsContainer);

const forms = formsContainer.querySelectorAll("form");
const submitBtn = formsContainer.querySelector(".submitBtn");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");
const dropBox = formsContainer.querySelector(".drop-box");
const input = dropBox.querySelector("input");

const inputs = document.querySelectorAll("[required]");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const numberInput = document.getElementById("number");
const addressInput = document.getElementById("address");
const textArea = document.querySelector("textarea");

textArea.addEventListener("input", () => { charCount() });

inputs.forEach(input => {
    input.addEventListener("input", () => {
        validateInput(input);
        if (input === nameInput) { validateName() };
        if (input === emailInput) { validateEmail() };
        if (input === numberInput) { validateNumber() };
        if (input === addressInput) { validateAddress() };
    });
});

nxtBtn.forEach(btn => {
    btn.innerHTML += icons.chevronRight;
    btn.addEventListener("click", () => {
        const valid =
            validateName() &&
            validateEmail() &&
            validateName() &&
            validateAddress();
        if (!valid) return;
        index++;
        updateForm();
        progressForward();
    });
});

backBtn.forEach(btn => {
    btn.querySelector("span").innerHTML = icons.chevronLeft;
    btn.addEventListener("click", () => {
        index--;
        updateForm();
        progressBackward();
    });
});

submitBtn.addEventListener("click", () => {
    forms.forEach(form => { form.reset() });
    const submitted = formCompleted.content.cloneNode(true);
    formsContainer.replaceChildren(submitted);
});

function initializeIcons() {
    const svgs = document.querySelectorAll(".icon");
    svgs.forEach(svg => { svg.innerHTML = icons[svg.dataset.icon] });
}

function updateForm() {
    forms.forEach(form => { form.classList.remove("active") });
    forms[index].classList.add("active");
}

function progressForward() { steps[index].classList.add("active") };
function progressBackward() {
    let formNum = index + 1;
    steps[formNum].classList.remove("active");
}

function validateName() {
    if (!validateInput(nameInput)) return false;
    nameInput.value = nameInput.value.replace(/\d/g, "");
    nameInput.value = nameInput.value.replace(/\b\w/g, char => char.toUpperCase());
    if (nameInput.value === "User") {
        showError(nameInput, "Oi! You can't do that!");
        return false;
    } else {
        clearError(nameInput);
        return true;
    };
};

function validateEmail() {
    if (!validateInput(emailInput)) return false;
    emailInput.value = emailInput.value.trim().toLowerCase();
    return true;
};

function validateNumber() {
    if (!validateInput(numberInput)) return false;
    numberInput.value = numberInput.value.replace(/[A-Za-z]/, "");
    return true;
};

function validateAddress() {
    if (!validateInput(addressInput)) return false;
    return true;
};

function validateInput(input) {
    if (!input.checkValidity()) {
        if (input.validity.valueMissing) {
            showError(input, `${ input.name } is required!`);
        } else if (input.validity.typeMismatch) {
            showError(input, "Please type in a proper value!");
        } else if (input.validity.patternMismatch) {
            showError(input, "Please follow the appropriate format!");
        }
        return false;
    } else {
        clearError(input);
        return true;
    }
};

function charCount() {
    const label = textArea.closest("label");
    const charCount = label.querySelector("p");
    const max = textArea.getAttribute("maxlength");
    const chars = textArea.value.length;
    charCount.textContent = `${ chars } / ${ max } characters`;
};

function showError(input, message) {
    const inputDiv = input.closest("div");
    const icon = inputDiv.querySelector("span");
    const field = input.closest("label");
    const error = field.querySelector(".error-text");
    inputDiv.classList.add("error");
    icon.classList.add("error");
    error.textContent = message;
    return false;
}

function clearError(input) {
    const inputDiv = input.closest("div");
    const field = input.closest("label");
    const icon = inputDiv.querySelector("span");
    const error = field.querySelector(".error-text");
    inputDiv.classList.remove("error");
    icon.classList.remove("error");
    error.textContent = "";
    return true;
}

dropBox.addEventListener("click", () => { input.click() });