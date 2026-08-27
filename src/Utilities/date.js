import { validateInput, showError, clearError } from "./validation.js";

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
    if (dateRules.date.future === false) {
        input.max = new Date().toISOString().split("T")[0];
        if (selectedDate > today) {
            showError(input, msg.rangeOverflow ?? "Oi! You can't set future dates!");
            return false;
        }
    } else {
        clearError(input);
        return true;
    }
}

export function getCurrentTime() {
    const hours = String(new Date().getHours()).padStart(2, "0");
    const minutes = String(new Date().getMinutes()).padStart(2, "0");
    const suffix = hours >= 12 ? "PM" : "AM";
    return `${ hours }:${ minutes }${ suffix }`;
}

export function formatTime() {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    const meridiem = hours >= 12 ? "PM" : "AM";
    //hours = hours % 12 || 12;
    return `${ padZero(hours) }:${ padZero(minutes) }:${ padZero(seconds) } ${ meridiem }`;
};

export function padZero(num) { return (num < 10 ? "0" : "") + num };