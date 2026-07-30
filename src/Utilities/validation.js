import { validateDate } from "./date";
import { wordCounter } from "./utilities";

export const validators = {
    name: validateName,
    username: validateName,
    handle: validateHandle,
    email: validateEmail,
    phone: validatePhone,
    contact: validatePhone,
    birthday: validateDate,
    graduation: validateDate,
    password: validatePassword,
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
        } else if (validity.rangeUnderflow) {
            showError(input, messages.rangeUnderflow ?? "Please use the required amount of characters!");
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
    const top = field.querySelector(".top");
    return {
        container, icon: container.querySelector("span"),
        field, error: field.querySelector(".error-text"),
        //errorIcon: field.querySelector(".icon"),
        top
    }
}

export function showError(input, message) {
    const { container, icon, error } = getFields(input);
    container.classList.add("error");
    icon.classList.add("error");
    //errorIcon.dataset.icon = "exclaim";
    error.textContent = message;
    return false;
}

export function clearError(input) {
    const { container, icon, error } = getFields(input);
    container.classList.remove("error");
    icon.classList.remove("error");
    //errorIcon.dataset.icon = "";
    error.textContent = "";
    return true;
}

export function validateName(input, rules) {
    if (!validateInput(input, rules)) return false;
    const nameRules = rules[input.name] ?? {};
    const msg = nameRules.messages ?? {};
    const wordCount = wordCounter(input.value);
    validateReserved(input, nameRules);
    if (nameRules?.minWords === 2) {
        if (wordCount < 2) {
            showError(input, msg.rangeUnderflow ?? "Your full name is required!");
            return false;
        }
    } else if (nameRules?.minWords === null) {
        if (wordCount < 2) {
            return true;
        }
    }

    if (nameRules?.maxWords === 3) {
        if (wordCount > 3) {
            showError(input, msg.rangeOverflow ?? "Cannot use more than three given names!");
            return false;
        }
    } else if (nameRules?.maxWords === 2) {
        if (wordCount > 2) {
            showError(input, msg.rangeOverflow ?? "Can't use more than two words for your username!");
            return false;
        }
    }
    return true;
};

export function validateHandle(input, rules) {
    if (!validateInput(input, rules)) return false;
    const handleRules = rules[input.name] ?? {};
    const msg = handleRules.messages ?? {};
    validateReserved(input, handleRules);
    if (input.value.startsWith("@")) {
        showError(input, "Can't use '@' at the beginning!");  
        return false;
    };
    return true;
}

export function validateEmail(input, rules) {
    if (!validateInput(input, rules)) return false;
    const emailRules = rules[input.name] ?? {};
    validateReserved(input, emailRules);
    return true;
};

export function validatePhone(input, rules) {
    if (!validateInput(input, rules)) return false;
    const phoneRules = rules[input.name] ?? {};
    validateReserved(input, phoneRules);
    return true;
};

export function validatePassword(input, rules) {
    if (!validateInput(input, rules)) return false;
    const passRules = rules[input.name] ?? {};
    const msg = passRules.messages ?? {};
    validateReserved(input, passRules);
    if (passRules?.minLength === 8) {
        if (input.value.length < 8) {
            showError(input, msg.rangeUnderflow ?? "Please meet a quota of 8-12 characers!");
            return false;
        }
    }
    return true;
}

export function validateReserved(input, rules) {
    const reserved = rules.reserved ?? [];
    const msg = rules.messages ?? {};
    if (rules.splitWords) {
        if (reserved) {
            const value = input.value.trim().toLowerCase().split(/\s+/);
            const reservedVal = value.some(val =>  reserved.includes(val));
            if (reservedVal) {
                showError(input, msg.reservedError);
                return false;
            }
        }   
    }

    if (!rules.splitWords) {
        if (reserved) {
            const value = input.value.trim();
            if (reserved.includes(value)) {
                showError(input, msg.reservedError);
                return false;
            }
        }   
    }
}