import { setClass, setStyle, adopt, create } from "./utilities";

export function createRipple(e, btn) {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;
    const ripple = create("span");
    setClass(ripple, "ripple");
    setStyle(ripple, "left", `${ x }px`);
    setStyle(ripple, "top", `${ y }px`);
    adopt(btn, ripple);
    setClass(btn, "active");
    setTimeout(() => { setClass(btn, "active", true) }, 300);
    setTimeout(() => { ripple.remove() }, 600);
}

export function closeDialog(dialog) {
    setClass(dialog, "open", true);
    setClass(dialog, "closing");

    setTimeout(() => {
        dialog.close();
        setClass(dialog, "closing", true);
    }, 400);
}

export function defaultFunc() { console.log("Clicked!") };