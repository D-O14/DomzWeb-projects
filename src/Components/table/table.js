import { initializeIcons } from "@assets/Icons/icons";
import { createTemplate, createStyle } from "@utils/component";

const tableData = {
    headers: [
        { type: "component", sortable: false },
        { name: "User Id", sortable: false, icon: "userEncrypt" },
        { name: "Name", sortable: true, icon: "account" },
        { name: "Email", sortable: false, icon: "mail" },
        { name: "Created", sortable: true, icon: "calendar" },
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
        if (header?.type === "component") {
            content.innerHTML = `<check-box></check-box>`
        } else {
            content.innerHTML =
            `<span class="icon" data-icon="${ header.icon }"></span>
            <span class="text">${ header.name }</span>`
            initializeIcons(content);
        }
    }
};

const dataTable = document.querySelector("data-table");

export default class DataTable extends HTMLElement {
    constructor() {
        super();

        this._data = [];
        this._headers = [];
        this._rowConfig = null;
        
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./table.css", import.meta.url);
        this.table = tableTemplate.content.cloneNode(true).querySelector(".table-container");
        this.tbody = this.table.querySelector("tbody");
        this.thead = this.table.querySelector("thead");
        shadow.append(style, this.table);
        initializeIcons(shadow);
    };

    connectedCallback() {
        this.render();
        this.table.querySelector(".table-name").textContent = this.getAttribute("tablename") || "";
    };

    set config(value) {
        this._rowConfig = value;
        this.renderRow();
    };

    set data(value) {
        this._data = value;
        this.renderCount();
        this.renderRow();
    };

    set headers(value) {
        this._headers = value;
        this.renderHeader();
    };

    get data() { return this._data };
    get headers() { return this._headers };
    get config() { return this._rowConfig };

    render() {
        this.renderHeader();
        this.renderCount();
        this.renderRow();
    };

    renderCount() { this.table.querySelector(".data-count").textContent = this.data.length };

    renderHeader() {
        this.headers.forEach(header => {
            const th = headerTemplate.content.cloneNode(true);
            const tableHead = th.querySelector("th");
            const content = tableHead.querySelector(".content");
            header.sortable ? views.sortableView(content, header) : views.headerView(content, header);
            this.thead.append(tableHead);
        });
    };

    renderRow() {
        this.data.forEach(row => {
            const tableRow = rowTemplate.content.cloneNode(true);
            this.rowConfig(tableRow, row);
            this.tbody.append(tableRow);
        });
    };
};

dataTable.rowConfig = (tableRow, row) => {
    tableRow.querySelector(".name").textContent = row.userName;
    tableRow.querySelector(".user-id").textContent = row.userId;
    tableRow.querySelector(".mailto").textContent = row.userEmail;
    tableRow.querySelector(".mailto").href = `mailto:${ row.userEmail }`;
    tableRow.querySelector(".user-createdAt").textContent = formatDate(new Date(row.createdAt));
}

dataTable.data = tableData.users;
dataTable.headers = tableData.headers;
customElements.define("data-table", DataTable);

function formatDate(date) {
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "2-digit" });
    return `${ month }/${ day }/${ year }`;
};