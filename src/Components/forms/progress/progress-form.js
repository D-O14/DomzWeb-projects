import { icons } from "../../../Assets/Icons/icons.js";
import { initializeIcons } from "../../../Assets/Icons/icons.js";
import { charCount } from "../../../Utilities/utilities.js";
import { validateInput, getFields, showError, clearError, validateDate } from "../../../Utilities/validation.js";

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
        initializeIcons(document);
    });
}

renderForms(formsTemplate, formsContainer);

const validators = [
    validateInfoForm,
    validateEducationForm,
    validateWorkForm,
];

const forms = formsContainer.querySelectorAll("form");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");
const submitBtn = formsContainer.querySelector(".submitBtn");

const dropZone = document.querySelector("drop-zone");
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

const formRules = {
    name: {
        messages: {
            valueMissing: "Your full name must be provided!",
            patternMismatch: "Please type in a proper name!",
        },
    },

    email: {
        messages: {
            valueMissing: "E-mail should not be left empty!",
            typeMismatch: "Please enter a valid E-mail!",
        }
    },

    phone: {
        messages: {
            valueMissing: "Your phone number is required to contact you!",
            patternMismatch: "Please enter a valid phone number",
        }
    },

    address: {
        messages: {
            valueMissing: "Your house address is needed!",
            patternMismatch: "Please type in an appropriate address",
        },
    },

    graduation: {
        date: { future: false },
        messages: {rangeOverflow: "You can't sign this form if you haven't graduated!"}
    },
    birthay: {
        date: {
            future: false,
            minAge: 18,
        },
        messages: {
            rangeOverflow: "You can't sign this form if you haven't been born yet!",
            minAge: "You can't sign this form if you aren't 18 yet!"
        }
    }
}

textArea.addEventListener("input", () => { charCount(textArea) });

inputs.forEach(input => {
    input.addEventListener("input", () => {
        validateInput(input, formRules);
        if (input === nameInput) { validateName() };
        if (input === emailInput) { validateEmail() };
        if (input === phoneInput) { validatePhone() };
        if (input === addressInput) { validateAddress() };
        if (input === schoolInput) { validateSchool() };
        if (input === dateInput) { validateDate(input, formRules) };
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
        validateDate(dateInput, formRules) &&
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
    if (!validateInput(nameInput, formRules)) return false;
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
    if (!validateInput(emailInput, formRules)) return false;
    emailInput.value = emailInput.value.trim().toLowerCase();
    return true;
};

function validatePhone() {
    if (!validateInput(phoneInput, formRules)) return false;
    phoneInput.value = phoneInput.value.replace(/[A-Za-z]/, "");
    return true;
};

function validateAddress() {
    if (!validateInput(addressInput, formRules)) return false;
    return true;
};

function validateSchool() {
    if (!validateInput(schoolInput, formRules)) return false;
    schoolInput.value = schoolInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
}

function validateStudy() {
    if (!validateInput(studyInput, formRules)) return false;
    studyInput.value = studyInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateDegree() {
    if (!validateInput(degreeInput, formRules)) return false;
    degreeInput.value = degreeInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateCompany() {
    if (!validateInput(companyInput, formRules)) return false;
    companyInput.value = companyInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateRole() {
    if (!validateInput(roleInput, formRules)) return false;
    roleInput.value = roleInput.value.replace(/\b\w/g, char => char.toUpperCase());
    return true;
};

function validateYears() {
    if (!validateInput(yearsInput, formRules)) return false;
    return true
};