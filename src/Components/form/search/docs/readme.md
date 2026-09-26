# Search Input Component

# Purpose
This is an input-based component that filters through and zooms in on the data that matches its value to give appropriate results fitting what the user is looking for.

# Features
- Filters data
- Clears input
- Works on raw arrays and arrays of objects

# Upcoming
- Add animation
- Add focused outline
- Add dynamic icons (Web component-based)
- Add dynamic classes (Web component-based)
- Add dynamic placeholder (Web component-based)

# Accessibilty
- Uses keyboard events to handle focus:
```html
<code>CTRL + /</code>
```

# Browser APIs
- Web Components

# Dependencies
- Icon library

# Functions
- Internally uses a reusable function to filter through and display data by accepting object parameters that are matched during configuration. 
```js
function searchItems({ input, items, property, renderFunction }) {
    const value = input.value.toLowerCase().trim();
    const searched = items.filter(item => {
        const field = item[property];
        return typeof field && field.includes(value) || field.startsWith(value);
    });
    renderFunction(searched);
}
```
- initializeIcons:  A function that reads the dataset attributes of the HTML elements (spans) via a container, or root property that holds it, matches it with the icons in the icon library, then displays that data by storing the icon within it.
- removeIcon: Reads the HTML element's dataset and textContent then removes it in order to completely clear the icon. 
```js
function initializeIcons(root) {
    const svgs = root.querySelectorAll(".icon");
    svgs.forEach(svg => {
        if (svg.dataset.icon) {
            svg.innerHTML = icons[svg.dataset.icon];
        } else {
            svg.dataset.icon = "";
        }
    }); // Rendered on initial load and on input
};

function removeIcon(icon) {
    icon.dataset.icon = "";
    icon.textContent = "";
} // Used on blur by this component, and on click of the clear input button
```