import "./expo.css";
import { gsap } from "gsap";
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