import "./table.css";
import { createStyle, createTemplate } from "@utils/component";

const headers = ["User Id", "Name", "Email", "Status", "Created At"];
const template = createTemplate(
    `<div class="table-container" part="container">
    <div class="table-head" part="head">
        <h1 class="table-name" part="name">
            <span class="data-count" part="count"></span>
        </h1>
        <menu class="table-actions" part="actions">
            <button part="action">
                <li></li>
            </button>
        </menu>
        <slot name="searchbar" part="search"></slot>
    </div>
    <table class="table" part="table">
        <thead class="thead" part="thead">
            <th part="th"></th>
        </thead>
        <tbody class="tbody" part="tbody">
            <tr class="row" part="row">
                <td class="data" part="data"></td>
            </tr>
        </tbody>
    </table>
</div>`
);

export default class Table extends HTMLElement {
    constructor() {
        super();
        const table = template.content.cloneNode(true);
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./table.css", import.meta.url);
        shadow.append(style, table);
    };

    connectedCallback() { headers.forEach(header => { this.querySelector("th").textContent = header }) };
};

customElements.define("custom-table", Table);