export function createRipple(e, btn) {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    ripple.style.left = `${ x }px`;
    ripple.style.top = `${ y }px`;
    btn.append(ripple);
    btn.classList.add("active");
    setTimeout(() => { btn.classList.remove("active") }, 300);
    setTimeout(() => { ripple.remove() }, 600);
}

export function closeDialog(dialog) {
    dialog.classList.remove("open");
    dialog.classList.add("closing");
    setTimeout(() => {
        dialog.close();
        dialog.classList.remove("closing");
    }, 400);
}

export function defaultFunc() { console.log("Clicked!") };