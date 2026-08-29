import "./searchInput.css";
import { initializeIcons } from "@assets/Icons/icons.js";
import { removeIcon } from "@utils/icons.js";

const input = document.querySelector(".input");
const searchInput = input.querySelector("input");
const inputLabel = document.querySelector("label");
const closeBtn = input.querySelector(".close-btn");
const icon = closeBtn.querySelector(".icon");

searchInput.addEventListener("input", () => { 
    if (searchInput.value === "") { removeIcon(icon) };
    const icon = closeBtn.querySelector(".icon");
    icon.dataset.icon = "dismiss";
    initializeIcons(closeBtn);
    //searchItems;

});

function searchItems(items, property, renderFunction) {
    const value = searchInput.value;
    const searched = items.filter(item => { 
        return item.property.matches(value);
    });
}

searchInput.addEventListener("blur", () => { removeIcon(icon) });

closeBtn.addEventListener("click", () => {
    searchInput.value = "";
    removeIcon(icon);
});

initializeIcons(inputLabel);