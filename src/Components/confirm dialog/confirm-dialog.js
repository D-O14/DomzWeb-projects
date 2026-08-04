const delBtn = document.getElementById("delBtn");
const dialog = document.querySelector("dialog");
const cancelBtn = document.getElementById("cancelBtn");
const dismissBtn = document.getElementById("dismissBtn");
const closeBtn = document.querySelector(".close");

delBtn.addEventListener("click", () => {
    dialog.showModal();
});

closeBtn.onclick = () => {
    dialog.close();
}

cancelBtn.onclick = () => {
    dialog.close();
}

dismissBtn.addEventListener("click", () => {
    dialog.close();
})