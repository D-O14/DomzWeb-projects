const groupBtns = document.querySelectorAll(".groupBtn");
groupBtns.forEach(groupBtn => {
    groupBtn.addEventListener("click", () => {
        groupBtns.forEach(groupBtn => { groupBtn.classList.remove("active") });
        groupBtn.classList.add("active");
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