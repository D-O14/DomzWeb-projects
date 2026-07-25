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