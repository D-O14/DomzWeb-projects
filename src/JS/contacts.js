const groupBtn = document.querySelectorAll(".groupBtn")
groupBtn.forEach(groupBtn => {
    groupBtn.addEventListener("click", () => {
        if (groupBtn.classList.contains("active")) {
            groupBtn.classList.remove("active")
        } else {
            groupBtn.classList.add("active")
        }
    })
});

const optBtn = document.querySelector(".optBtn");
const menu = document.querySelector(".menu")
optBtn.addEventListener("click", () => {
    optBtn.classList.add("active");
    menu.classList.add("active")
    setTimeout(() => {
        optBtn.classList.remove("active")
    },300)
});