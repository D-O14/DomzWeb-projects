export function charCount(textArea) {
    const label = textArea.closest("label");
    const charCount = label.querySelector("p");
    const max = textArea.getAttribute("maxlength");
    const chars = textArea.value.length;
    charCount.textContent = `${ chars } / ${ max } characters`;
};

export function wordCounter(text) { return text.trim().split(/\s+/).filter(Boolean).length };