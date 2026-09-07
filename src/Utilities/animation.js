import { gsap } from "gsap";

export function rotate(elem) {
    gsap.fromTo(elem, {
        scale: 0,
        opacity: 0
    }, {
        scale: 1,
        opacity: 1,
        rotate: 360,
    });
}

export function slideIn(elem) {
    gsap.fromTo(elem, {
        y: `-100%`,
        opacity: 0
    }, {
        y: `50%`,
        opacity: 1,
        ease: "bounce"
    });
}

export function scaleOut(elem) {
    gsap.fromTo(elem, {
        y: 0,
        scale: 1,
        opacity: 1,
        ease: "bounce"
    }, {
        y: `-40px`,
        scale: 0,
        opacity: 0,
    });
}