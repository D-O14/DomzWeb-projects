const button = document.querySelector("button");

button.addEventListener("click", () => {
    if (button.textContent === "Follow") {
        button.textContent += "ing";
    } else {
        button.textContent = "Follow"
    }
})