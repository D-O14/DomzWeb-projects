const indicator = document.querySelector(".active-indicator");
const active = document.querySelector(".active");
//const themeBtn = document.querySelector(".themeBtn");
const toggleBtn = document.querySelector(".toggle-btn");
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.querySelector(".menu-btn");
const subMenu = document.querySelector(".sub-menu");
const links = document.querySelectorAll(".link");
const anchors = document.querySelectorAll("a");

indicator.style.top = active.offsetTop + "px";
indicator.style.height = active.offsetHeight + "px";

/*themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
});*/

anchors.forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
    })
})

menuBtn.addEventListener("click", () => {
    if (subMenu.classList.contains("open")) {
        subMenu.classList.remove("open");
        subMenu.style.height = "0px";
    } else {
        subMenu.classList.add("open");
        subMenu.style.height = subMenu.scrollHeight + "px";
    }
});

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(link => { link.classList.remove("active") });
        indicator.style.top = link.offsetTop + "px";
        indicator.style.height = link.offsetHeight + "px";
        indicator.classList.add("moving");
        /*indicator.addEventListener("transitionend", () => {
            links.forEach(link => { link.classList.remove("active") });
            link.classList.add("active");
        });*/
        setTimeout(() => {
            indicator.classList.remove("moving");
        }, 300);
    })
});

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});