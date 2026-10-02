# Table Component

# Purpose 
A table is a component structured to represent data that can be static, dynamic, modified, and even deleted in rows and columns. Its variations may support images, icons, sorting and filtering, search capabailities, mass deletion, use of context menu, and so on.

# Upcoming
- [] Sorting
- [] Searching
- [] Images in data
- [] Actions e.g. edit and delete
- [] Copy ID button on ID hover

# Dependencies
- initializeIcons:
```js
    function initializeIcons(root) {
    const svgs = root.querySelectorAll("[data-icon]");
    svgs.forEach(svg => {
        svg.dataset.icon ? svg.innerHTML = icons[svg.dataset.icon] : svg.dataset.icon = "";
    });
}
``` 
Makes use of a function that searches for the ```[data-icon]``` attribute in elements(commonly spans), and inserts icons into them by checking if their dataset matches the icons library object.

- Checkbox Component: [src/Components/form/checkbox/checkbox.js]
A component that allows checking of elements. Useful for selecting multiple elements, and enabling mass actions like deletion.

- Search Input Component: [src/Components/form/checkbox/checkbox.js]
A component that makes use of filtering to search through data, allowing a "zoom in" of what the user finds important to view.

# Anatomy
The structure of the table is that which makes use of class instance methods that can be called via the custom DOM element that represents the class. These instance methods perform the action of rendering the table which includes building the headers and rows underneath with the use of a user-provided configuration function.
```js
    renderTable(data, headers) {
        const tbody = this.table.querySelector("tbody"); // the table body gotten from a template used by the class
        const thead = this.table.querySelector("thead"); // the table head gotten from a template used by the class
        this.table.querySelector(".data-count").textContent = data.length; // Assigning the length of the data to a table element
        this.renderHeader(headers, thead); // Rendering the headers of the table
        this.renderRow(data, tbody, configureRow); // Rendering the rows of the table
    };

    renderHeader(data, thead) { // Parameters
        data.forEach(header => { // Looping through data parameter
            const th = headerTemplate.content.cloneNode(true); // Cloning the template
            const tableHead = th.querySelector("th");
            const content = tableHead.querySelector(".content");
            header.sortable ? views.sortableView(content, header) : views.headerView(content, header); // Determining the views based on object attributes
            header.label === "component" && !header.sortable ? views.componentView(content) : "";
            thead.append(tableHead); // accepting the cloned template data
        });
    };

    renderRow(data, tbody, config) { // Parameters
        data.forEach(row => { // Looping through data parameter
            const tableRow = rowTemplate.content.cloneNode(true); // Cloning the template
            config(tableRow, row); // User-provided configuration function
            tbody.append(tableRow); // accepting the cloned template data
        });
    };
````