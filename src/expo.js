import "./expo.css";
import { gsap } from "gsap";
import { scaleBounce } from "@utils/animation";
import { TicketSlash } from "lucide";

//import { ScrollTrigger } from "gsap/ScrollTrigger";

/*gsap.to(".box", {
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

/*gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
    duration: 5,
    rotation: 360,
    scale: 2,
    scrollTrigger: {
        trigger: ".box",
        scrub: true
    }
});*/

/*const timeline = gsap.timeline({ defaults: { duration: 1 } });

timeline
    .from(".header", { y: `-100%`, ease: "bounce" })
    .from(".link", { y: `-100%`, opacity: 0, stagger: .5 })
    .from(".right", { x: `-100vw` }, 1.5)
    .from(".left", { x: `-100%` }, "<.25")
    .to(".footer", { y: `0` }, 2.25)
    .fromTo(".button", { scale: 0, opacity: 0, rotate: 720 }, { scale: 1, rotate: 0, opacity: 1 }, 2.5);*/

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

let fruits = ["apple", "orange", "banana", "coconut"];
for (let fruit of fruits) { console.log(fruit) };
fruits.forEach(fruit => { console.log(fruit) });