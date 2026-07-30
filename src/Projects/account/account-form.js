import { charCount, format } from "../../Utilities/utilities.js";
import { icons, initializeIcons } from "../../Assets/Icons/icons.js";
import { validateDate, initializeDate } from "../../Utilities/date.js"
import { validateInput, validators, getFields, showError, clearError } from "../../Utilities/validation.js";

const accountRules = {
    username: {
        maxLength: 20,
        minWords: null,
        maxWords: 2,
        splitWords: true,
        reserved: ["R$ndomJ-ohn12", "randomJohn", "John Doe", "Jane Doe", "randomJane"],
        messages: {
            reservedError: "You can't use this username!",
            rangeOverflow: "Keep it short and simple jorr!",
            valueMissing: "What would you be known as?!",
        },
    },

    handle: {
        splitWords: true,
        reserved: ["johndoe", "janedoe"],
        messages: {
            patternMismatch: `You can't use that symbol!`,
            reservedError: "Too generic. Try another one!",
            valueMissing: "We need a way to refer to you!",
        }
    },

    email: {
        splitWords: false,
        reserved: ["jonathandoe@gmail.com", "janedoe@gmail.com"],
        messages: {
            reservedError: "I know that's not your E-mail!",
            valueMissing: "E-mail should not be left empty!",
            typeMismatch: "Please enter a valid E-mail!",
        }
    },

    contact: {
        splitWords: false,
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
        splitWords: false,
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

const form = document.querySelector("form");
const submitBtn = document.querySelector(".submitBtn");
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
const buttonText = document.querySelectorAll(".loginBtn .text");
buttonText.forEach(btnTxt => { btnTxt.textContent = "" });
const inputs = document.querySelectorAll("input");
const passwordInput = document.getElementById("password");
const textArea = document.querySelector("textarea");
textArea.addEventListener("input", () => {
    charCount(textArea);
});
textArea.addEventListener("blur", () => {
    format(textArea, formatRules);
});

inputs.forEach(input => {
    if (input === passwordInput) {
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
    };
    input.addEventListener("input", () => {
        validateInput(input, accountRules);
        const validator = validators[input.name];
        if (validator) { validator(input, accountRules) };
    });
    input.addEventListener("blur", () => { format(input, formatRules) });
});

initializeIcons(document);

form.addEventListener("submit", e => {
    e.preventDefault();
    console.log("Form has been submitted");
});