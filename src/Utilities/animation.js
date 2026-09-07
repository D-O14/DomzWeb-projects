import { gsap } from "gsap";

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

/* GSAP Based */

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