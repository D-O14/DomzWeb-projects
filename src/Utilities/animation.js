import { gsap } from "gsap";

export const animations = [
    { bounce, ripples, scaleIn, slideIn, slideOut, scaleRotate, scaleBounce }, // WAAPI
    { rotate, slideInY, slideInX, stagger } // GSAP
];

export function slideIn(elem) {
    return elem.animate(
        [
            { transform: "translateY(-100%) scale(0)", opacity: 0, offset: 0 },
            { transform: "translateY(0) scale(1)", opacity: 1, offset: 1 },
        ], { duration: 2000 }
    )
}

export function slideOut(elem) {
    return elem.animate(
        [
            { transform: "translateY(2.5rem) scale(1)", opacity: 1, offset: 0 },
            { transform: "translateY(-100%) scale(0)", opacity: 0, offset: 1 },
        ], { duration: 2000 }
    )
}

export function scaleIn(elem) {
    return elem.animate(
        [
            {
                transform: "translateY(-40px) scale(0)",
                opacity: 0,
                offset: 0
            }, {
                transform: "translateY(50px) scale(1)",
                opacity: 1,
                offset: .5
            }, {
                transform: "translateY(0px)",
                offset: 1
            }
        ],
        {
            duration: 3000,
            easing: "cubic-bezier(.2,.8,.2,1)",
        }
    )
}

export function scaleBounce(elem) {
    return elem.animate([
        {
            transform: "scale(1)",
            offset: 0
        },
        {
            transform: "scale(.89)",
            offset: .12
        },
        {
            transform: "scale(.56)",
            offset: .24
        },
        {
            transform: "scale(.02)",
            offset: .36
        },
        {
            transform: "scale(.25)",
            offset: .54
        },
        {
            transform: "scale(.5)",
            offset: .74
        },
        {
            transform: "scale(.75)",
            offset: .82
        },
        {
            transform: "scale(.5)",
            offset: .92
        },
        {
            transform: "scale(.25)",
            offset: .96
        },
        {
            transform: "scale(1)",
            offset: 1
        },
    ],
        {
            duration: 3000,
            easing: "cubic-bezier(.2,.8,.2,1)",
        })
}

export function ripples(elem) {
    return elem.animate([
        { width: "0%", height: "0%", opacity: ".5", offset: 0 },
        { width: "100%", height: "100%", opacity: "0", offset: 1 },
    ], { duration: 2000 });
}

export function bounce(elem) {
    return elem.animate([
        { transform: "translateX(0) scale(1)", offset: 0 },
        { transform: "translateX(500px) scale(.95)", borderRadius: "5rem", offset: 0.15, },
        { transform: "translateX(-300px) scale(.75)", borderRadius: "2rem", offset: 0.3 },
        { transform: "translateX(500px) scale(.5)", borderRadius: "2rem", offset: 0.5 },
        { transform: "translateX(-200px) scale(1)", borderRadius: "2rem", offset: 0.65 },
        { transform: "translateX(300px) scale(1.25)", borderRadius: "2rem", offset: 0.85 },
        { transform: "translateX(-300px) scale(.5)", borderRadius: "2rem", offset: 0.95 },
        { transform: "translateX(0) scale(1)", offset: 1 },
    ],
        {
            duration: 5000,
            easing: "cubic-bezier(.2,.8,.2,1)",
        });
}

export function scaleRotate(elem) {
    return elem.animate([
        { scale: 0, borderRadius: ".5rem", opacity: 0, transform: "rotate(720deg)", offset: 0 },
        { scale: .5, borderRadius: "2rem", opacity: .5, transform: "rotate(360deg)", offset: .5 },
        { scale: .75, borderRadius: "5rem", transform: "rotate(180deg)", opacity: .75, offset: .75 },
        { scale: 1, borderRadius: ".5rem", transform: "rotate(0)", opacity: 1, offset: 1 },
    ], { duration: 5000 });
}

/* GSAP-based */

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

export function slideInY(elem, ease) {
    gsap.from(elem,
        { y: `-100%`, opacity: 0, ease: ease, stagger: .5, delay: .25, duration: 1 }
    );
}

export function slideInX(elem) {
    gsap.fromTo(elem,
        { x: `-100%`, opacity: 0 },
        { x: 0, opacity: 1, delay: .25, duration: 1.5 });
}

export function slideRight(elem) {
    gsap.from(elem, { x: `-100vw`, duration: 1 })
}

export function slideLeft(elem) {
    gsap.from(elem, { x: `100vw`, duration: 1.25 })
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

export function dropDown(elem) {
    gsap.fromTo(elem,
        { y: `-100%` },
        { y: `0`, ease: "bounce", duration: 1.5 }
    );
}

export function loader(elem) {
    gsap.to(elem, {
        keyframes: [
            { x: 100, borderRadius: "2rem", delay: 1, ease: 'power1.out', onComplete: () => { console.log("Loading started!") } },
            { y: 100, borderRadius: "5rem", delay: .95, ease: 'power1.out', onComplete: () => { console.log("Loading in progress...") } },
            { x: 0, borderRadius: "1rem", delay: .75, ease: 'power1.out', onComplete: () => { console.log("Loading almost done...") } },
            { y: 0, borderRadius: ".5rem", delay: .5, ease: 'power1.out', onComplete: () => { console.log("Loading completed.") } }
        ],
        duration: 3,
        rotate: 360,
        transformOrigin: 'center center',
    })
}

export function float(elem) {
    gsap.to(elem, {
        keyframes: {
            "25%": { x: 100, borderRadius: 2 + "rem", delay: 1, ease: 'power1.out', onComplete: () => { console.log("Loading started!") } },
            "50%": { y: 100, borderRadius: 5 + "rem", delay: .75, ease: 'power1.out', onComplete: () => { console.log("Loading in progress...") } },
            "75%": { x: 0, borderRadius: 1 + "rem", delay: .5, ease: 'power1.out', onComplete: () => { console.log("Loading almost done...") } },
            "100%": { y: 0, borderRadius: .5 + "rem", delay: .25, ease: 'power1.out', onComplete: () => { console.log("Loading completed.") } }
        },
        duration: 3,
        rotate: 360,
        transformOrigin: 'center center',
    })
}

export function stagger(elem) {
    gsap.from(elem,
        { x: `-100%`, opacity: 0, stagger: .5, delay: .25, duration: 1.25 }
    );
}

/*const timeline = gsap.timeline({ defaults: { duration: 1 } });
timeline
    .to(".footer", { y: `0` }, 2.25)
    .fromTo(".button", { scale: 0, opacity: 0, rotate: 720 }, { scale: 1, rotate: 0, opacity: 1 }, 2.5);

 Icon-based with GSAP and WAAPI */
