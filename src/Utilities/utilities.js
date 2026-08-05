import { initializeIcons } from "../Assets/Icons/icons.js";
import { AsYouType } from "libphonenumber-js";

export function charCount(textArea) {
    const label = textArea.closest("label");
    const charCount = label.querySelector("p");
    const max = textArea.getAttribute("maxlength");
    const count = textArea.value.replace(/[\s]/gu, "").length;
    charCount.textContent = `${ count } / ${ max } characters`;
};

export function wordCounter(text) {
    return text.trim().split(/\s+/).filter(Boolean).length
};

export function format(input, formatRules) {
    const rules = formatRules[input.name] ?? {};
    if (rules.trim) {
        input.value = input.value.trim();   
    } 
    if (rules.capitalize) {
        input.value = input.value.replace(/\b\w/g, char => char.toUpperCase());   
    }
    if (rules.capitalizeFirst) {
        input.value = input.value.replace(/\b\w/, char => char.toUpperCase());   
    }
    if (rules.lowercase) { 
        input.value = input.value.trim().toLowerCase();
    }
    if (rules.noSpace) {
        input.value = input.value.replace(/\b\s/g, "");
    }
    if (rules.addSpace) {
        input.value = input.value.replace(/([.!?])(\S)/g, "$1 $2");
    }
    if (rules.removeSpace) {
        input.value = input.value.replace(/\s{2,}/g, " ");
    }
    if (rules.sentenceCase) {
        input.value = input.value.replace(/([.!?]\s*)([a-z])/g, char => char.toUpperCase());
    }
    if (rules.phoneFormat) {
        const formatter = new AsYouType("NG");
        input.value = formatter.input(input.value);
    }
};

export function showLoader(btn) {
    const icon = btn.querySelector(".icon");
    btn.classList.add("loading");
    icon.dataset.icon = "bounce";
    initializeIcons(btn);
}

export function hideLoader(btn) {
    const icon = btn.querySelector(".icon");
    btn.classList.remove("loading");
    icon.dataset.icon = "";
    icon.textContent = "";
}