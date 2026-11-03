import { initializeIcons } from "@assets/Icons/icons";
    
export function searchItems({ input, items, property }) {
    const query = input.value.toLowerCase().trim();
    const searched = items.filter(item => {
        const field = item[property];
        return typeof field && field.includes(query);
    });
    return searched;
}

export function toggleField(toggle, input) {
    const toggleIcon = toggle.querySelector(".icon");
    toggle.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text"; 
            toggleIcon.dataset.icon = "eyeOff";
            initializeIcons(toggle);
        } else {
            input.type = "password";
            toggleIcon.dataset.icon = "eyeOn";
            initializeIcons(toggle);
        };
    });
};