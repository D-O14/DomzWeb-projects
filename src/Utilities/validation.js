import { validateDate } from "./date";
import { wordCounter } from "./utilities";

export const validators = {
    name: validateName,
    username: validateName,
    email: validateEmail,
    phone: validatePhone,
    contact: validatePhone,
    birthday: validateDate,
    graduation: validateDate,
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
    const reserved = ["user", "admin"];
    const wordCount = wordCounter(input.value);
    const words = input.value.trim().split(/\s+/);
    const reservedWords = words.some(word => reserved.includes(word));
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
    if (reservedWords) {
        showError(input, "You aren't allowed to use that name!");
        return false;
    }
    clearError(input);
    return true;
};

export function validateEmail(input, rules) {
    if (!validateInput(input, rules)) return false;
    return true;
};

export function validatePhone(input, rules) {
    if (!validateInput(input, rules)) return false;
    return true;
}; 
