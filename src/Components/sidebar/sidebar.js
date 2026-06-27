const toggleBtn = document.getElementById("toggle");
const sideBar = document.getElementById("sidebar");

function toggle() {
    sideBar.classList.toggle("close");
    toggleBtn.classList.toggle("rotate");
}

function toggleSubMenu(button) {
    button.nextElementSibling.classList.toggle("show");
    //button.classList.toggle("rotate");
};