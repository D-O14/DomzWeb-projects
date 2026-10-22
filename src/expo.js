import { Asterisk } from "lucide";
import "./expo.css";
import { initializeIcons } from "@assets/Icons/icons";
import { renderApp } from "./Utilities/utilities";
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

function Button() {
    let button; 

    const config = {
        id: "btn",
        type: "button",
        text: "Button",
        className: "btn",
    };

    const lifecycles = {
        render: () => {
            button = parseHTML(`<button class="${ config.className }" 
            id="${ config.id }" type="${ config.type }">
                ${ config.text }
            </button>`);

            button.addEventListener("click", events.onPress);
            button.addEventListener("mouseover", events.onHover);

            return button;
        },

        update: (button) => {
            button.id = this.id;
            button.type = this.type;
            button.textContent = this.text;
            button.className = this.className;
        },

        destroy: () => {
            button.removeEventListener("click", events.onPress);
            button.removeEventListener("mouseover", events.onHover);
            button.remove();
            button = null;
        }
    };

    const events = {
        onPress: () => { console.log("This button was pressed") },
        onHover: () => { console.log("This button was hovered over") },
    };

   return lifecycles.render();
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