import { validateDate } from "./date";
import { wordCounter } from "./utilities";

const validators = {
    name: validateName,
    email: validateEmail,
    phone: validatePhone,
    date: validateDate,
}

export function validateInput(input, ruleset) {
    const rules = ruleset[input.name] ?? {};
    const messages = rules.messages ?? {};
    const validity = input.validity;
    if (!input.checkValidity()) {
        if (validity.valueMissing) {
            showError(input, messages.valueMissing ?? "This field must not be left empty!");
        } else if (validity.patternMismatch) {
            showError(input, messages.patternMismatch ?? "Please use the appropriate format!");
        } else if (validity.typeMismatch) {
            showError(input, messages.typeMismatch ?? "Please type in appropriate info!");
        }
        return false;
    } else {
        clearError(input);
        return true;
    }
};

export function getFields(input) {
    const container = input.closest("div");
    const field = input.closest("label");
    return {
        container, icon: container.querySelector("span"),
        field, error: field.querySelector(".error-text"),
    }
}

export function showError(input, message) {
    const { container, icon, error } = getFields(input);
    container.classList.add("error");
    icon.classList.add("error");
    error.textContent = message;
    return false;
}

export function clearError(input) {
    const { container, icon, error } = getFields(input);
    container.classList.remove("error");
    icon.classList.remove("error");
    error.textContent = "";
    return true;
}

export function validateName(input, rules) {
    if (!validateInput(input, rules)) return false;
    const nameRules = rules[input.name] ?? {};
    const msg = nameRules.messages ?? {};
    const wordCount = wordCounter(input.value);
    input.value = input.value.trim().toLowerCase();
    input.value = input.value.replace(/\b\w/g, char => char.toUpperCase());
    if (nameRules?.minWords === 2) {
        if (wordCount < 2) {
            showError(input, msg.rangeUnderFlow ?? "Your full name is required!");
            return false;
        }
    }

    if (nameRules?.maxWords === 3) {
        if (wordCount > 3) {
            showError(input, msg.rangeOverflow ?? "Cannot use more than three given names!");
            return false;
        }
    }

    if (!nameRules.allowNumbers && /\d/.test(input.value)) {
        showError(input, msg.typeMismatch ?? "Numbers cannot be used in names!");
        return false;
    }

    if (input.value === "User Admin") {
        showError(input, "Oi! You can't do that!");
        return false;
    }

    clearError(input);
    return true;
};

export function validateEmail(input, rules) {
    if (!validateInput(input, rules)) return false;
    input.value = input.value.trim().toLowerCase();
    return true;
};

export function validatePhone(input, rules) {
    if (!validateInput(input, rules)) return false;
    input.value = input.value.replace(/[A-Za-z]/, "");
    return true;
}; 