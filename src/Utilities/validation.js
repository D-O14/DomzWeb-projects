export function validateInput(input, ruleset) {
    const rules = ruleset[input.name] ?? {};
    const messages = rules.messages ?? {};
    const validity = input.validity;
    if (!input.checkValidity()) {
        if (validity.valueMissing) {
            showError(input, messages.valueMissing ?? "This field must not be left empty!");
        } else if (validity.patternMismatch) {
            showError(input, messages.patternMismatch ?? "Please use the appropriate format!");
        } else if (validity.typeMMismatch) {
            showError(input, messages.typeMismatch ?? "Please follow the appropriate format!");
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

export function validateDate(input, rules) {
    if (!validateInput(input, rules)) return false;
    const dateRules = rules[input.name] ?? {};
    const msg = dateRules.messages ?? {};
    const selectedDate = new Date(input.value);
    input.max = new Date().toISOString().split("T")[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateRules.date.future === false) {
        if (selectedDate > today) {
            showError(input, msg.rangeOverflow ?? "Oi! You can't set future dates!");
            return false;
        } else {
            clearError(input);
            return true;
        }
    } else {
        clearError(input);
        return true;
    }
}