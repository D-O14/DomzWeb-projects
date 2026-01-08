const slider = document.querySelector('.slider');
document.querySelector('.right').onclick = () => {
    slider.scrollBy({ left: slider.clientWidth, behavior: "smooth" });
};

document.querySelector('.left').onclick = () => {
    slider.scrollBy({ left: -slider.clientWidth, behavior: "smooth" });
};

document.addEventListener('DOMContentLoaded', () => {

    const sliderTile = document.querySelector('.tile-slider');

    if (!sliderTile) return;

    let hideTimer;

    function showNav() {
        sliderTile.classList.add('show-nav');

        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
            sliderTile.classList.remove('show-nav');
        }, 2500)
    }

    ['mousemove', 'click', 'touchstart', 'focusin'].forEach(event => {
        sliderTile.addEventListener(event, showNav);
    });
});

console.log("Hello, i'm working")