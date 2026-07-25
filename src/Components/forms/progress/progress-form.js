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

const validators = [
    validateInfoForm,
    validateEducationForm,
    validateWorkForm,
];

const forms = formsContainer.querySelectorAll("form");
const submitBtn = formsContainer.querySelector(".submitBtn");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");

const inputs = document.querySelectorAll("[required]");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("number");
const addressInput = document.getElementById("address");
const dateInput = document.getElementById("date");
const schoolInput = document.getElementById("school");
const studyInput = document.getElementById("study");
const degreeInput = document.getElementById("degree");
const companyInput = document.getElementById("company");
const roleInput = document.getElementById("role");
const yearsInput = document.getElementById("years");
const textArea = document.querySelector("textarea");

textArea.addEventListener("input", () => { charCount() });

inputs.forEach(input => {
    input.addEventListener("input", () => {
        validateInput(input);
        if (input === nameInput) { validateName() };
        if (input === emailInput) { validateEmail() };
        if (input === phoneInput) { validatePhone() };
        if (input === addressInput) { validateAddress() };
        if (input === schoolInput) { validateSchool() };
        if (input === dateInput) { validateDate() };
        if (input === studyInput) { validateStudy() };
        if (input === degreeInput) { validateDegree() };
        if (input === companyInput) { validateCompany() };
        if (input === roleInput) { validateRole() };
        if (input === yearsInput) { validateYears() };
    });
});

nxtBtn.forEach(btn => {
    btn.innerHTML += icons.chevronRight;
    btn.addEventListener("click", () => {
        if (!validators[index]()) return;
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

function validateInfoForm() {
    return (
        validateName() &&
        validateEmail() &&
        validatePhone() &&
        validateAddress()
    );
}

function validateEducationForm() {
    return (
        validateSchool() &&
        validateDate() &&
        validateStudy() &&
        validateDegree()
    );
}

function validateWorkForm() {
    return (
        validateCompany() &&
        validateRole() &&
        validateYears()
    );
}

function validateName() {
    if (!validateInput(nameInput)) return false;
    nameInput.value = nameInput.value.replace(/\d/g, "");
    nameInput.value = nameInput.value.replace(/\b\w/g, char => char.toUpperCase());
    if (nameInput.value === "User" || nameInput.value === "Admin") {
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

function validatePhone() {
    if (!validateInput(phoneInput)) return false;
    phoneInput.value = phoneInput.value.replace(/[A-Za-z]/, "");
    return true;
};

function validateAddress() {
    if (!validateInput(addressInput)) return false;
    return true;
};

function validateSchool() {
    if (!validateInput(schoolInput)) return false;
    schoolInput.value = schoolInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
}

function validateDate() {
    if (!validateInput(dateInput)) return false;
    const selectedDate = new Date(dateInput.value);
    dateInput.max = new Date().toISOString().split("T")[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) {
        showError(dateInput, "You can't sign this form if you haven't graudated!");
        return false;
    } else {
        clearError(dateInput);
        return true;
    }
}

function validateStudy() { 
    if (!validateInput(studyInput)) return false;
    studyInput.value = studyInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateDegree() { 
    if (!validateInput(degreeInput)) return false;
    degreeInput.value = degreeInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateCompany() { 
    if (!validateInput(companyInput)) return false;
    companyInput.value = companyInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateRole() { 
    if (!validateInput(roleInput)) return false;
    roleInput.value = roleInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateYears() { 
    if (!validateInput(yearsInput)) return false;
    return true
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