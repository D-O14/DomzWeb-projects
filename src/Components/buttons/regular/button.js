import "./button.css";

const button = document.querySelector("button");
button.addEventListener("click", (e) => {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    const ripple = document.createElement("span");
    ripple.style.left = `${ x }px`;
    ripple.style.top = `${ y }px`;
    button.append(ripple);
    button.classList.add("active");
    setTimeout(() => { button.classList.remove("active") }, 300);
    setTimeout(() => { ripple.remove() }, 600);
});