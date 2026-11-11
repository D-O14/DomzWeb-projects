export function $(id) { return document.getElementById(id) };
export function create(element) { return document.createElement(element) };
export function query(selector) { return document.querySelector(selector) };
export function queryAll(selector) { return document.querySelectorAll(selector) };
export function parseHTML(markup) {
    const template = create("template");
    template.innerHTML = markup.trim();
    return template.content.firstElementChild;
};
export function attachEvents(element, events = {}) {
    for (const [eventName, handler] of Object.entries(events)) {
        if (typeof handler !== "function") continue;
        element.addEventListener(eventName, handler);
    };
};
export function createEvent(element, eventName, exposed) {
    element.dispatchEvent(new CustomEvent(eventName, {
        detail: { exposed: exposed },
        bubbles: true,
        composed: true
    }));
};
export function initializeActions(root=document, actions={}) { 
    root.addEventListener("click", (e) => {
        const element = e.target.closest("[data-action]");
        if (element && actions[element.dataset.action]) { actions[element.dataset.action](element) };
    });
};