import { charCount } from "../../../Utilities/utilities.js";
import { icons, initializeIcons } from "../../../Assets/Icons/icons.js";
import { validateDate, initializeDate } from "../../../Utilities/date.js"
import { validateInput, validateName, validateEmail, validatePhone, getFields, showError, clearError }
    from "../../../Utilities/validation.js";

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
        minWords: 2,
        maxWords: 3,
        allowNumbers: false,
        messages: {
            rangeOverflow: "Please use a maximum of three names!",
            rangeUnderFlow: "Your full name is required!",
            valueMissing: "Your full name must be provided!",
            typeMismatch: "Names do not contain numbers! Type a proper name!",
            patternMismatch: "Special characters other than hyphens, periods, and apsotrophes aren't allowed!",
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
        messages: { rangeOverflow: "You can't sign this form if you haven't graduated!" }
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
    if (input === dateInput) { initializeDate(input, formRules) };
    input.addEventListener("input", () => {
        validateInput(input, formRules);
        if (input === nameInput) { validateName(input, formRules) };
        if (input === emailInput) { validateEmail(input, formRules) };
        if (input === phoneInput) { validatePhone(input, formRules) };
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