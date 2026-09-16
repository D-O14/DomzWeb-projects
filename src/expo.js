import "./expo.css";
/*import { gsap } from "gsap";
import { scaleBounce } from "@utils/animation";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.to(".box", {
    keyframes: [
        { x: 100, borderRadius: 2 + "rem", delay: 1, ease: 'power1.out', onComplete: () => { console.log("Loading started!") } },
        { y: 100, borderRadius: 5 + "rem", delay: .75, ease: 'power1.out', onComplete: () => { console.log("Loading in progress...") } },
        { x: 0, borderRadius: 1 + "rem", delay: .5, ease: 'power1.out', onComplete: () => { console.log("Loading almost done...") } },
        { y: 0, borderRadius: .5 + "rem", delay: .25, ease: 'power1.out', onComplete: () => { console.log("Loading completed.") } }
    ],
    keyframes: {
        "25%": { x: 100, borderRadius: 2 + "rem", delay: 1, ease: 'power1.out', onComplete: () => { console.log("Loading started!") } },
        "50%": { y: 100, borderRadius: 5 + "rem", delay: .75, ease: 'power1.out', onComplete: () => { console.log("Loading in progress...") } },
        "75%": { x: 0, borderRadius: 1 + "rem", delay: .5, ease: 'power1.out', onComplete: () => { console.log("Loading almost done...") } },
        "100%": { y: 0, borderRadius: .5 + "rem", delay: .25, ease: 'power1.out', onComplete: () => { console.log("Loading completed.") } }
    },
    duration: 5,
    rotate: 360,
    transformOrigin: 'center center',
})

gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
    duration: 5,
    rotation: 360,
    scale: 2,
    scrollTrigger: {
        trigger: ".box",
        scrub: true
    }
});

const timeline = gsap.timeline({ defaults: { duration: 1 } });

timeline
    .from(".header", { y: `-100%`, ease: "bounce" })
    .from(".link", { y: `-100%`, opacity: 0, stagger: .5 })
    .from(".right", { x: `-100vw` }, 1.5)
    .from(".left", { x: `-100%` }, "<.25")
    .to(".footer", { y: `0` }, 2.25)
    .fromTo(".button", { scale: 0, opacity: 0, rotate: 720 }, { scale: 1, rotate: 0, opacity: 1 }, 2.5);

/*const box = document.querySelector(".box");
const button = document.querySelector("button");

button.addEventListener("click", () => { scaleBounce(box) });

const keyframes = [
    {
        transform: "translateX(0)",
        offset: 0
    },
    {
        transform: "translateX(500px)",
        borderRadius: "5rem",
        offset: 0.5,
    },
    {
        transform: "translateX(-300px)",
        borderRadius: "2rem",
        offset: 0.75
    },
    {
        transform: "translateX(0)",
        offset: 1
     },
];

const effect = new KeyframeEffect(box,
    keyframes,
    {
        delay: 100,
        duration: 6000,
        easing: "ease-in-out",
    }
);

const animation = new Animation(effect, document.timeline);
setInterval(() => { animation.play() }, 7000);*/

const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", (e) => { e.dataTransfer.setData("text/plain", draggable.id) });
    draggable.addEventListener("dragover", (e) => { e.preventDefault() });

    draggable.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const dragged = document.getElementById(draggedId);
        const target = e.currentTarget;
        if (dragged === target) return;
        const targetLeft = target.style.left;
        const targetTop = target.style.top;
        const draggedLeft = dragged.style.left;
        const draggedTop = dragged.style.top;
        target.style.left = draggedLeft;
        target.style.top = draggedTop;
        dragged.style.left = targetLeft;
        dragged.style.top = targetTop;
        console.log(`${draggedId} switched with ${target}`);
    });
});

for (const dropzone of dropzones) {
    dropzone.addEventListener("dragover", (e) => { e.preventDefault(); dropzone.classList.add("over") });
    dropzone.addEventListener("dragleave", () => { dropzone.classList.remove("over") });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        const dropzoneRect = dropzone.getBoundingClientRect();
        const x = e.clientX - dropzoneRect.left;
        const y = e.clientY - dropzoneRect.top;
        const droppedId = e.dataTransfer.getData("text/plain");
        const dropped = document.getElementById(droppedId);
        dropzone.classList.remove("over");
        dropped.style.left = `${x}px`;
        dropped.style.top = `${y}px`;
        dropzone.appendChild(dropped);
    });
};

function enableDrag(draggable) { };
function enableDrop(dropzone) { };