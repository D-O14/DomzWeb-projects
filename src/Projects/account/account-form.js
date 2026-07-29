import { charCount, format } from "../../Utilities/utilities.js";
import { icons, initializeIcons } from "../../Assets/Icons/icons.js";
import { validateDate, initializeDate } from "../../Utilities/date.js"
import { validateInput, validators, getFields, showError, clearError } from "../../Utilities/validation.js";

const accountRules = {
    username: {
        maxLength: 20,
        minWords: null,
        maxWords: 2,
        messages: {
            rangeOverflow: "Two words per username brodie!",
            valueMissing: "What would you be known as?!",
        },
    },

    handle: {
        messages: {
            valueMissing: "We need a way to refer to you!",
        }
    },

    email: {
        messages: {
            valueMissing: "E-mail should not be left empty!",
            typeMismatch: "Please enter a valid E-mail!",
        }
    },

    contact: {
        messages: {
            valueMissing: "Your phone number is required to contact you!",
            patternMismatch: "Please enter a valid phone number",
        }
    },

    password: {
        maxLength: 12,
        minLength: 8,
        messages: {
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
        noSymbol: true,
        lowercase: true,
    },
};

const buttonText = document.querySelectorAll(".loginBtn .text");
buttonText.forEach(btnTxt => { btnTxt.textContent = "" });
const button = document.querySelector(".submitBtn");
button.addEventListener("click", () => {
    const icon = button.querySelector(".icon");
    button.classList.add("loading");
    icon.dataset.icon = "infinity";
    //document.title = "Creating Account...";
    setTimeout(() => {
        button.classList.remove("loading");
        icon.dataset.icon = "";
    }, 3000);
})
const inputs = document.querySelectorAll("input");
const nameInput = document.getElementById("username");
const textArea = document.querySelector("textarea");
const emailInput = document.getElementById("email");
const handleInput = document.getElementById("handle");
const passwordInput = document.getElementById("password");

textArea.addEventListener("input", () => { charCount(textArea) });

inputs.forEach(input => {
    if (input === passwordInput) { input.addEventListener("click", () => { input.type = "text" }) };
    input.addEventListener("input", () => {
        validateInput(input, accountRules);
        const validator = validators[input.name];
        if (validator) { validator(input, accountRules) };
    });
    input.addEventListener("blur", () => { format(input, formatRules) });
});

initializeIcons(document);