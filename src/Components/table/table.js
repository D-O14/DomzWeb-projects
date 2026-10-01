import { initializeIcons } from "@assets/Icons/icons";
import { createTemplate, createStyle } from "@utils/component";

const tableData = {
    headers: [
        { label: "component", sortable: false },
        { name: "User Id", sortable: false, icon: "userEncrypt", label: "text" },
        { name: "Name", sortable: true, icon: "account", label: "text" },
        { name: "Email", sortable: false, icon: "mail", label: "text" },
        { name: "Created", sortable: true, icon: "calendar", label: "text" },
    ],
    users: [
        { userName: "Greg Rog", userId: crypto.randomUUID(), userEmail: "grog@gmail.com", createdAt: new Date().toISOString() },
        { userName: "Alice Gospo", userId: crypto.randomUUID(), userEmail: "ag@gmail.com", createdAt: new Date().toISOString() },
        { userName: "Bob Ross", userId: crypto.randomUUID(), userEmail: "bob@gmail.com", createdAt: new Date().toISOString() },
        { userName: "Charlie Diamond", userId: crypto.randomUUID(), userEmail: "c.d@gmail.com", createdAt: new Date().toISOString() },
        { userName: "Dana Emerald", userId: crypto.randomUUID(), userEmail: "de@gmail.com", createdAt: new Date().toISOString() },
    ]
};

const tableTemplate = createTemplate(
    `
    <div class="table-container">
        <div class="table-head">
            <h1 class="table-header">
                <span class="table-name"></span>
                <span class="data-count"></span>
            </h1>
            <search-input placeholder="Search through your users...">
                <span slot="icon" class="icon search-icon">
                    <span class="icon" data-icon="search"></span>
                </span>
            </search-input>
        </div>
        <table>
            <thead></thead>
            <tbody></tbody>
        </table>
    </div>
    `
);

const headerTemplate = createTemplate(
    `<th>
        <div class="content">

        </div>
    </th>`
);

const rowTemplate = createTemplate(
    `<tr>
        <td class="user-select">
            <check-box></check-box>
        </td>
        <td class="user-id"></td>
        <td class="user-name">
            <span class="icon" data-icon="user"></span>
            <span class="name"></span>
        </td>
        <td class="user-email">
            <a href="mailto:" class="mailto"></a>
        </td>
        <td class="user-createdAt"></td>
    </tr>`
);

const views = {
    sortableView(content, header) {
        content.innerHTML =
        `<span class="icon" data-icon="${ header.icon }"></span>
        <span class="text">${ header.name }</span>
        <span class="icon sort-icon" data-icon="sort"></span>`
        initializeIcons(content);
    },

    headerView(content, header) {
        content.innerHTML =
        `<span class="icon" data-icon="${ header.icon }"></span>
        <span class="text">${ header.name }</span>`
        initializeIcons(content);
    },

    componentView(content) { content.innerHTML = `<check-box></check-box>` }
};

const dataTable = document.querySelector("data-table");

export default class Table extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./table.css", import.meta.url);
        this.table = tableTemplate.content.cloneNode(true).querySelector(".table-container");
        shadow.append(style, this.table);
        initializeIcons(shadow);
    };

    connectedCallback() { 
        const tableName = this.getAttribute("tablename");
        this.table.querySelector(".table-name").textContent = tableName;
    };

    renderTable(data, headers) {
        const tbody = this.table.querySelector("tbody");
        const thead = this.table.querySelector("thead");
        this.table.querySelector(".data-count").textContent = data.length;
        this.renderHeader(headers, thead);
        this.renderRow(data, tbody, configureRow);
    };

    renderHeader(data, thead) {
        data.forEach(header => {
            const th = headerTemplate.content.cloneNode(true);
            const tableHead = th.querySelector("th");
            const content = tableHead.querySelector(".content");
            header.sortable ? views.sortableView(content, header) : views.headerView(content, header);
            header.label === "component" && !header.sortable ? views.componentView(content) : "";
            thead.append(tableHead);
        });
    };

    renderRow(data, tbody, config) {
        data.forEach(row => {
            const tableRow = rowTemplate.content.cloneNode(true);
            config(tableRow, row);
            tbody.append(tableRow);
        });
    };
};

function configureRow(tableRow, row) {
    tableRow.querySelector(".name").textContent = row.userName;
    tableRow.querySelector(".user-id").textContent = row.userId;
    tableRow.querySelector(".mailto").textContent = row.userEmail;
    tableRow.querySelector(".mailto").href = `mailto:${ row.userEmail }`;
    tableRow.querySelector(".user-createdAt").textContent = formatDate(new Date(row.createdAt));
}

function formatDate(date) {
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "2-digit" });
    return `${ month }/${ day }/${ year }`;
};

customElements.define("data-table", Table);
dataTable.renderTable(tableData.users, tableData.headers);