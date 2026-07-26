import { validateInput } from "./validation";

export function initializeDate(input, rules) {
    const dateRules = rules[input.name] ?? {};
    if (dateRules?.date?.future === false) {
        input.max = new Date().toISOString().split("T")[0];
    }
}

export function validateDate(input, rules) {
    if (!validateInput(input, rules)) return false;
    const dateRules = rules[input.name] ?? {};
    const msg = dateRules.messages ?? {};
    const selectedDate = new Date(input.value);
    const today = new Date().toISOString().split("T")[0];
    if (dateRules?.date?.future === false) {
        input.max = new Date().toISOString().split("T")[0];
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