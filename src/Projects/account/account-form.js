import { charCount, format } from "../../Utilities/utilities.js";
import { icons, initializeIcons } from "../../Assets/Icons/icons.js";
import { validateDate, initializeDate } from "../../Utilities/date.js"
import { validateInput, validators, getFields, showError, clearError } from "../../Utilities/validation.js";

const accountRules = {
    username: {
        minWords: 2,
        maxWords: 3,
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

    contact: {
        messages: {
            valueMissing: "Your phone number is required to contact you!",
            patternMismatch: "Please enter a valid phone number",
        }
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

const formatRules = {
    name: {
        trim: true,
        capitalize: true
    },

    email: {
        trim: true,
        lowercase: true
    },
};

const inputs = document.querySelectorAll("input");
const nameInput = document.getElementById("username");
const dateInput = document.getElementById("date");
const textArea = document.querySelector("textarea");
const emailInput = document.getElementById("email");
const handleInput = document.getElementById("handle");
const contactInput = document.getElementById("contact");
const passwordInput = document.getElementById("password");

inputs.forEach(input => {
    if (input === dateInput) { initializeDate(input, accountRules) };
    input.addEventListener("input", () => {
        validateInput(input, accountRules);
            const validator = validators[input.name];
            if (validator) { validator(input, accountRules) };
        });
        input.addEventListener("blur", () => { format(input, formatRules) });
});