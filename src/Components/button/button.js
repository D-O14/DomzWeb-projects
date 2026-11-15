//import { createRipple } from "@utils/button";
import { attachEvents, parseHTML } from "@utils/DOM.js";

/*function createEvent(button, eventName) {
    button.dispatchEvent(new CustomEvent(eventName, {
        detail: { button: button },
        bubbles: true,
        composed: true
    }));
};*/

export function Button(config = {}) {
    const state = { loading: config.loading, disabled: config.disabled };

    const lifecycles = {
        update(element) { },
        destroy(element) { },
    };

    const button = parseHTML(
        `<button type="${ config.type ?? "button" }" ${ config.iconOnly ? `aria-label="${ config.text ?? config.ariaLabel }"` : "" } 
        class="${ config.className ?? "motus-btn" }"  ${ config.id ? `id="${ config.id}"` : "" }
        ${ config.disabled ? `disabled` : "" } ${ config.action ? `data-action="${ config.action }"` : "" } 
        ${ config.attributes ? config.attributes.map((attr) => { return attr }).join(" ") : "" }>
        ${ config.iconOnly ?
            `<span class="icon ${ config.icon }-icon" data-icon="${ config.icon ?? "" }"></span >` :
            `<span class="text">${ config.text }</span>
        ${ config.icon ? `<span class="icon ${ config.icon }-icon" data-icon="${ config.icon }"></span>` : "" }`
        }
        ${ config.children ?? "" }
        ${ config.loader ? `<span class="loader"></span>` : "" }
    </button>`);

    attachEvents(button, config.events);
    return button;
};