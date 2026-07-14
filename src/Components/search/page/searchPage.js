/*const page = document.documentElement;

const calcScrollValue = () => {
    const position = page.scrollTop;
    const progress = document.querySelector(".progress");
    const value = document.querySelector(".progress-value");
    const height = page.scrollHeight - page.clientHeight;
    const scrollValue = Math.round(position * 100 / height);

    if (position < 100) {
        progress.style.scale = 0;
    } else {
        progress.style.scale = 1;
    }
    progress.addEventListener("click", function(){
        page.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        this.style.scale = 0;
    });
}

window.onscroll = () => { calcScrollValue() };
window.onload = () => { calcScrollValue() };

const scrollToTopBtn = document.querySelector(".progress");
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    this.style.scale = 0;
});*/

/*const box = document.querySelector(".box");
const container = document.querySelector(".container");
const observer = new ResizeObserver((entries) => {
    console.log(entries);
    const boxElem = entries[0];
    const isSmall = boxElem.contentRect.width < 150;
    boxElem.target.style.background = isSmall ? "blue" : "red";
});

observer.observe(box);*/

const parent = document.querySelector(".parent"); 
const mutate = new MutationObserver((entries) => {
    console.log(entries);
});

mutate.observe(parent, {
    subtree: true,
    attributes: true
});

parent.id = "treu";