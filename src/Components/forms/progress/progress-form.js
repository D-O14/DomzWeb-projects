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
        validateInput(inputs, input);
    });
    if (input === nameInput) { validateName  };
    if (input === emailInput) { validateEmail };
    if (input === numberInput) { validateNumber };
    if (input === addressInput) { validateAddress };
});

nxtBtn.forEach(btn => {
    btn.innerHTML += icons.chevronRight;
    btn.addEventListener("click", () => {
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
    const submitted = formCompleted.content.cloneNode(true);
    formsContainer.replaceChildren(submitted);
});

function initializeIcons() {
    const svgs = document.querySelectorAll(".icon");
    svgs.forEach(svg => { svg.innerHTML = icons[svg.dataset.icon] });
}

function updateForm() {
    forms.forEach(form => {
        form.classList.remove("active");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            form.reset();
        })
    });
    forms[index].classList.add("active");
}

function progressForward() { steps[index].classList.add("active") };
function progressBackward() {
    let formNum = index + 1;
    steps[formNum].classList.remove("active");
}

function validateName() {
    if (nameInput.value.trim() === "") {
        nameInput.setCustomValidity("Name field must not be empty!");
        showError(nameInput, "Name field must not be empty!");
        return false;
    } else {
        clearError(nameInput);
        nameInput.setCustomValidity("");
        return true;
    };
}

function validateEmail() {
    if (emailInput.value.trim() === "") {
        emailInput.setCustomValidity("E-mail must be provided!");
        showError(emailInput, "E-mail must be provided!");
        return false;
    } else {
        clearError(emailInput);
        emailInput.setCustomValidity("");
        return true;
    };
}

function validateNumber() {
    if (numberInput.value.trim() === "") {
        numberInput.setCustomValidity("A phone number is required!");
        showError(numberInput, "A phone number is required!");
        return false;
    } else {
        clearError(numberInput);
        numberInput.setCustomValidity("");
        return true;
    };
}

function validateAddress() {
    if (addressInput.value.trim() === "") {
        addressInput.setCustomValidity("Your house address is needed!");
        showError(addressInput, "Your house address is needed!");
        return false;
    } else {
        addressInput.setCustomValidity("");
        clearError(addressInput);
        return true;
    };
}

function validateInput(inputs, field) {
    inputs.forEach(input => {
        const name = input.name;
        if (input.value.trim() === "") {
            showError(input, "This field must not be empty");
            input.setCustomValidity(`${ name } is required!`);
            return false;
        } else {
            clearError(input);
            input.setCustomValidity("");
            return true;
        }
    })
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