const anchors = document.querySelectorAll("a");
anchors.forEach(a => {
    a.addEventListener("click", (e) => {
        e.preventDefault();
        anchors.forEach(a => { a.classList.remove("active") });
        a.classList.add("active");
    });
});

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-nav')
        toggle.classList.toggle('show-icon')
    })
}

showMenu("nav-toggle", "nav");
