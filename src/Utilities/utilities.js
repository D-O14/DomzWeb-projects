export function charCount(textArea) {
    const label = textArea.closest("label");
    const charCount = label.querySelector("p");
    const max = textArea.getAttribute("maxlength");
    const chars = textArea.value.length;
    charCount.textContent = `${ chars } / ${ max } characters`;
};

export function wordCounter(text) { return text.trim().split(/\s+/).filter(Boolean).length };

export function format(input, formatRules) {
    const rules = formatRules[input.name] ?? {};
    if (rules.trim) {
        input.value = input.value.trim();   
    } 
    if (rules.capitalize) {
        input.value = input.value.replace(/\b\w/g, char => char.toUpperCase());   
    }
    if (rules.lowercase) { 
        input.value = input.value.trim().toLowerCase();
    }
};