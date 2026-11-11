import "./input.css";
import { attachEvents, parseHTML } from "@utils/DOM.js";

export function Input(config = {}) {
    const stylesheet = new URL("./input.css", import.meta.url);
    const field = parseHTML(`<label for="${ config.id }" class="${ config.labelClass ?? "" }">
          ${ config.label ?? "" }
          <span class="icon ${ config.icon ?? "caret" }-icon" data-icon="${ config.icon ?? "caret" }"></span>
          <input ${ config.value ? `value="${ config.value }"` : "" } type="${ config.type ?? "text" }" placeholder="${ config.placeholder ?? "input here" }" id="${ config.id }" 
          ${ config.name ? `name="${ config.name }"` : "" } class="${ config.className }"  ${ config.required ? "required" : "" } 
          ${ config.attributes ? config.attributes.map(attr => { return attr }).join(" ") : "" }>
          ${ config.required ? `<span class="error" id="error-${ config.id }" aria-live="polite"></span>` : "" }
      </label>`);

    const inputElement = field.querySelector("input");
    const inputIcon = field.querySelector(".icon");

    attachEvents(inputElement, config.events);

    field.update = function update(newProps = {}) {
        const props = { ...config };
        Object.assign(props, newProps);
        if ("icon" in newProps) {
            inputIcon.dataset.icon = props.icon;
            inputIcon.classList.replace(`${ config.icon ?? "caret" }-icon`, `${ props.icon }-icon`);
            initializeIcons(field);
        };
        if ("id" in newProps) {
            inputElement.id = props.id;
            field.htmlFor = props.id;
        };
        if ("type" in newProps) { inputElement.type = props.type };
        if ("value" in newProps) { inputElement.value = props.value };
        if ("labelClass" in newProps) { field.className = props.labelClass };
        if ("required" in newProps) { inputElement.required = props.required };
        if ("className" in newProps) { inputElement.className = props.className };
        //if ("attributes" in newProps) { config.attributes = props.attributes };
        if ("placeholder" in newProps) { inputElement.placeholder = props.placeholder };
    };
    
    field.clear = function clear() { inputElement.value = "" };

    return field;
};