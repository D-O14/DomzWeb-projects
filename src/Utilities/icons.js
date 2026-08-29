export function animateIcon(container) {
    const animation = container.dataset.iconAnimation;
    const icon = container.querySelector("svg");
    if (!icon || animation) return;
    const className = `icon-${ animation }`;
    //icon.classList.remove(className);
    void icon.offsetWidth;
    icon.classList.add(className);
    icon.addEventListener("animationend", () => {
        icon.classList.remove(className);
    }, { once: true });
};

export function removeIcon(icon) {
    icon.dataset.icon = "";
    icon.textContent = "";
}