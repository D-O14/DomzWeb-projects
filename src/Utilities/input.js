export function searchItems({ input, items, property }) {
    const value = input.value.toLowerCase().trim();
    const searched = items.filter(item => {
        const field = item[property];
        return typeof field && field.includes(value);
    });
    return searched;
}

export function toggleField(toggle, input) {
    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            toggle.dataset.icon = "eyeOff";
        } else {
            input.type = "password";
            toggle.dataset.icon = "eyeOff";
        };
    });
};