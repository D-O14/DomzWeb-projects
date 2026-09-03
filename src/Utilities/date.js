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

function isSameDay(date1, date2) {
    const first = new Date(date1);
    const second = new Date(date2);
    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
}

function isYesterday(date1, date2) {
    const target = new Date(date1);
    const now = new Date(date2);
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1)
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(target, yesterday);
}

export function relativeTime(targetDate) {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: 'auto' });

    const now = new Date();
    const target = new Date(targetDate);
    const elapsed = Date.now() - target.getTime();

    const seconds = elapsed / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;

    if (seconds < 10) { return "Just Now" };
    if (seconds < 60) { return `${ Math.floor(seconds) }s ago` };
    if (minutes < 60) { return `${ Math.floor(minutes) }min ago` };
    if (hours < 24) { return `${ Math.floor(hours) }hrs ago` };
    if (isSameDay(targetDate, now)) { return `${ formatTime(targetDate) } Today` };
    if (isYesterday(targetDate, now)) { return `${ formatTime(targetDate) } Yesterday` };
    if (days < 7) { return `${ Math.floor(days) }d ago` };
    if (weeks < 4) { return `${ Math.floor(weeks) } wks ago` };

    return formatDate(targetDate);
}

export function formatTime(date) {
    const dateObj = new Date(date);
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const meridiem = dateObj.getHours() >= 12 ? "PM" : "AM";
    //hours = hours % 12 || 12;
    return `${ hours }:${ minutes } ${ meridiem }`;
};

const date = new Date("2026-09-02T13:48:00");
formatTime(date);

export function formatDate(date) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        weekday: "short",
        month: 'short',
        day: '2-digit',
        year: 'long'
    });
}