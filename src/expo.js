import { Asterisk } from "lucide";
import "./expo.css";
import { initializeIcons } from "@assets/Icons/icons"
/*import { enableDrag, enableDrop, changeOnDrop, switchPositon } from "@utils/dragDrop";
const draggables = document.querySelectorAll(".draggable");
const dropzones = document.querySelectorAll(".dropzone");

draggables.forEach(draggable => { enableDrop(draggable, switchPositon) });
dropzones.forEach(dropzone => { enableDrop(dropzone, changeOnDrop) });

enableDrag(document);*/

/*struct: {
   `<View>
        <button className="${view.className}" id="${view.id}">
            ${view.text}
        </button>
    </View>`
};*/

/*function view(view) {
    return `<button onclick=${ view.onPress } class="${ view.className }" id="${ view.id }">
            ${ view.text }
        </button>`
};*/

/*function Button(button, config) { 
    button.id = config.id;
    button.type = config.type;
    button.textContent = config.text;
    button.className = config.className;
    button.addEventListener("click", config.events.onPress);
    return button;
};*/

export function createEvent(element, eventName, exposed) {
    element.dispatchEvent(new CustomEvent(eventName, {
        detail: { exposed: exposed },
        bubbles: true,
        composed: true
    }));
};

export function renderApp(app) {
    query(document, "#app").innerHTML = app;
};

export function find(collection, property, match) {
    const found = collection.find(data => data[property] === match);
    return found;
};

export function struct(structure) {
    const element = structure;
    return element;
};

export function setStyle(element, property, value) {
    element.style[property] = value;
};

export function create(element) {
    const DOMElement = document.createElement(element);
    return DOMElement;
};

export function adopt(root = document.body, element) {
    root.append(element);
};

export function setClass(element, className, contains = false) {
    switch (contains) {
        case true: element.classList.remove(className); break;
        case false: element.classList.add(className); break;
    };
};

export function query(root = document, selector) {
    const element = root.querySelector(selector);
    return element;
};

export function when(condition, operation, fallback) {
    if (condition) {
        operation?.();
    } else {
        fallback?.();
    };
};

export function clear(input) {
    input.value = "";
};

function Button() {
    const config = {
        id: "btn",
        type: "button",
        text: "Button",
        className: "btn",
    };

    const lifecycles = {
        onRender: () => {
            return `<button onclick="${ events.onPress }" onmouseover="${ events.onHover }" class="${ config.className }" 
            id="${ config.id }" type="${ config.type }">
                ${ config.text }
            </button>`;
        },

        /*onUpdate: (button) => {
            button.addEventListener("click", events.onPress);
            button.addEventListener("mouseover", events.onHover);
        }*/
    };

    const events = {
        onPress: () => { console.log("This button was pressed") },
        onHover: () => { console.log("This button was hovered over") },
    };

    const button = lifecycles.onRender();
    return button;
};

const newBtn = {
    id: "btn",
    type: "button",
    text: "Click Me",
    className: "btn",
    state: {
        active: "active",
        clicked: false,
        disabled: false,
    },
    /*structure: struct(
        `<button class="${ this.className }" id="${ this.id }" type="${ this.type }">
            ${ this.text}
        </button>`
    ),*/

    render(button) {
        button.id = this.id;
        button.type = this.type;
        button.textContent = this.text;
        button.className = this.className;

        this.update(button);

        return button;
    },

    update(button) {
        button.addEventListener("click", this.events.onPress);
        button.addEventListener("mouseover", this.events.onHover);
    },

    destroy(button) { button.remove() },

    events: {
        onPress: () => { console.log("This button was pressed") },
        onSlide: () => { console.log("This button was slid over") },
        onHover: () => { console.log("This button was hovered over") },
        onLongPress: () => { console.log("This button was long pressed") },
    },
};

//const button = newBtn.render(create("button"));
renderApp(Button());