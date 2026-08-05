import "./account-form.css";
import { validateDate, initializeDate } from "@utils/date.js"
import { icons, initializeIcons } from "@assets/Icons/icons.js";
import { charCount, format, showLoader, hideLoader } from "@utils/utilities.js";
import { validateInput, validators, getFields, showError, clearError } from "@utils/validation.js";

const indexedB = indexedDB;
let title = document.title;
let passwordSuggested = false;
const req = indexedB.open("Users", 1);
const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const textArea = document.querySelector("textarea");
const submitBtn = document.querySelector(".submitBtn");
const passwordInput = document.getElementById("password");
const passwordLabel = passwordInput.closest("label");
const passwordBox = passwordLabel.querySelector(".password-box");

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
        reserved: ["+144 500 391 065", "144500391065"],
        messages: {
            reservedError: "That's not even a real number!",
            valueMissing: "Your phone number is required to contact you!",
            patternMismatch: "Please enter a valid phone number",
        }
    },

    password: {
        maxLength: 12,
        minLength: 8,
        numbers: true,
        lowerCase: true,
        upperCase: true,
        symbols: true,
        format: true,
        reserved: ["P-@$_sw0rd", "P-@$sw0rd", "P@$sw0rd", "password"],
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

    contact: {
        phoneFormat: true,
    },

    bio: {
        trim: true,
        addSpace: true,
        removeSpace: true,
        sentenceCase: true,
        capitalizeFirst: true,
    }
};

const charSets = {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbols: "@$%_&?-!",
}

req.onsuccess = () => {
    const db = req.result;
}
req.onerror = (e) => {
    console.log(e);
    console.error("An error has occurred within the database!");
};

req.onupgradeneeded = () => {
    const db = req.result;
    const store = db.createObjectStore("users", { keyPath: "id" });
};

form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(form);
    formData.append("access_key", "5e2c2ee8-aa85-430b-81b0-8f39e3767f71");
    const isValid = validateForm(inputs, accountRules);
    if (!isValid) return;
    toggleForm(true);
    showLoader(submitBtn);
    const user = createUser(formData);
    saveUser(user);
    setTimeout(() => {
        hideLoader(submitBtn);
        toggleForm(false);
        location.href = "./account card/account.html";
    }, 5000);
});

passwordInput.addEventListener("focus", () => {
    if (passwordSuggested) return;
    if (passwordInput.value.trim()) return;
    passwordBox.classList.add("visible");
});

passwordInput.addEventListener("blur", () => {
    setTimeout(() => {
        2
        passwordBox.classList.remove("visible");
    }, 100);
});

passwordInput.addEventListener("input", () => {
    passwordBox.classList.remove("visible");
});

passwordBox.addEventListener("click", () => {
    passwordInput.value = generatePassword(accountRules.password);
    passwordSuggested = true;
    passwordBox.classList.remove("visible");
});

function createUser(formData) {
    return {
        id: crypto.randomUUID(),
        username: formData.get("username"),
        handle: formData.get("handle"),
        email: formData.get("email"),
        contact: formData.get("contact"),
        password: formData.get("password"),
        bio: formData.get("bio"),
    };
}

function saveUser(user) {
    const db = req.result;
    const transaction = db.transaction("users", "readwrite");
    const store = transaction.objectStore("users");
    store.put(user);
    transaction.oncomplete = () => { db.close() };
}

function generatePassword(rules) {
    let allowedChars = "";
    let password = "";

    allowedChars += rules.lowerCase ? charSets.lower : "";
    allowedChars += rules.upperCase ? charSets.upper : "";
    allowedChars += rules.numbers ? charSets.number : "";
    allowedChars += rules.symbols ? charSets.symbols : "";

    for (let i = 0; i < rules.maxLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    };

    return password;
}

function validateForm(array, rules) {
    let valid = true;
    array.forEach(arr => {
        format(arr, formatRules);
        const validator = validators[arr.name];
        if (!validateInput(arr, rules)) { valid = false };
        if (validator && !validator(arr, rules)) { valid = false };
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

function toggleInput(input) {
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

function toggleForm(state) {
    inputs.forEach(input => { input.disabled = state });
    textArea.disabled = state;
    submitBtn.disabled = state;
};

initializeIcons(document);
toggleInput(passwordInput);
initiailizeTextArea(textArea, formatRules);
initializeInputs(inputs, accountRules, formatRules);