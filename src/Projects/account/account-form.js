import { charCount, format } from "../../Utilities/utilities.js";
import { icons, initializeIcons } from "../../Assets/Icons/icons.js";
import { validateDate, initializeDate } from "../../Utilities/date.js"
import { validateInput, validators, getFields, showError, clearError } from "../../Utilities/validation.js";

const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");
const submitBtn = document.querySelector(".submitBtn");
const passwordInput = document.getElementById("password");

const accountRules = {
    username: {
        maxLength: 20,
        minWords: null,
        maxWords: 2,
        format: true,
        reserved: ["R$ndomJ-ohn12", "John Doe", "Jane Doe"],
        messages: {
            reservedError: "You can't use this username!",
            rangeOverflow: "Keep it short and simple jorr!",
            valueMissing: "What would you be known as?!",
        },
    },

    handle: {
        format: true,
        reserved: ["johndoe", "janedoe"],
        messages: {
            patternMismatch: `You can't use that symbol!`,
            reservedError: "Too generic. Try another one!",
            valueMissing: "We need a way to refer to you!",
        }
    },

    email: {
        format: true,
        reserved: ["jonathandoe@gmail.com", "janedoe@gmail.com"],
        messages: {
            reservedError: "I know that's not your E-mail!",
            valueMissing: "E-mail should not be left empty!",
            typeMismatch: "Please enter a valid E-mail!",
        }
    },

    contact: {
        format: true,
        reserved: ["+144 500 391 065", "+144500391065", "144500391065", "144 500 391 065"],
        messages: {
            reservedError: "That's not even a real number!",
            valueMissing: "Your phone number is required to contact you!",
            patternMismatch: "Please enter a valid phone number",
        }
    },

    password: {
        maxLength: 12,
        minLength: 8,
        format: true,
        reserved: ["P-@$_sw0rd", "P-@$sw0rd", "P@$sw0rd"],
        messages: {
            reservedError: "Nice try, but we can't allow you to do that!",
            patternMismatch: "Please adhere to the provided password format!",
            typeMismatch: "Please type in a proper password!",
            valueMissing: "You need to have a safe and secure password!",
            rangeUnderflow: "Please meet a quota of 8-12 characters!",
        }
    }
}

const formatRules = {
    email: {
        trim: true,
        lowercase: true
    },

    handle: {
        trim: true,
        noSpace: true,
        lowercase: true,
    },

    bio: {
        trim: true,
        addSpace: true,
        removeSpace: true,
        sentenceCase: true,
        capitalizeFirst: true,
    }
};

form.addEventListener("submit", e => {
    e.preventDefault();
    const isValid = validateForm(inputs, accountRules);
    if (!isValid) return;
});

submitBtn.addEventListener("click", () => {
    const icon = submitBtn.querySelector(".icon");
    submitBtn.classList.add("loading");
    icon.dataset.icon = "bounce";
    setTimeout(() => {
        submitBtn.classList.remove("loading");
        icon.dataset.icon = "";
        icon.textContent = "";
    }, 5000);
    initializeIcons(submitBtn);
});

function validateForm(array, rules) {
    let valid = true;
    array.forEach(arr => {
        format(arr, formatRules);
        const validator = validators[arr.name];
        if (!validateInput(arr, rules)) { valid = false };
        if (validator) { valid = false };
    });
    return valid;
}

function initializeInputs(array, rules, form) {
    array.forEach(arr => {
        arr.addEventListener("input", () => {
            validateInput(arr, rules);
            const validator = validators[arr.name];
            if (validator) { validator(arr, rules) };
        });
        arr.addEventListener("blur", () => { format(arr, form) });
    });
}

function initiailizeTextArea(area, rules) {
    area.addEventListener("input", () => { charCount(area) });
    area.addEventListener("blur", () => { format(area, rules) });
}

function initializeToggle(input) {
    const field = input.closest("label");
    const toggle = field.querySelector(".toggle");
    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            toggle.dataset.icon = "eyeOff";
            initializeIcons(field);
        } else {
            input.type = "password";
            toggle.dataset.icon = "eyeOn";
            initializeIcons(field);
        }
    });
}

initializeIcons(document);
initializeToggle(passwordInput);
initiailizeTextArea(textArea, formatRules);
initializeInputs(inputs, accountRules, formatRules);