let isEmpty;

const headers = [
    { name: "User Id", sortable: false, icon: "userEncrypt" },
    { name: "Name", sortable: true, icon: "account" },
    { name: "Email", sortable: false, icon: "mail" },
    { name: "Status", sortable: true, icon: "alert" },
    { name: "Created", sortable: true, icon: "calendar" },
];

const users = [
    { userName: "Greg Rog", userId: crypto.randomUUID(), userEmail: "grog@gmail.com", status: true, createdAt: formatDate(new Date()) },
    { userName: "Alice Gospo", userId: crypto.randomUUID(), userEmail: "ag@gmail.com", status: false, createdAt: formatDate(new Date()) },
    { userName: "Bob Ross", userId: crypto.randomUUID(), userEmail: "bob@gmail.com", status: true, createdAt: formatDate(new Date()) },
    { userName: "Charlie Diamond", userId: crypto.randomUUID(), userEmail: "c.d@gmail.com", status: false, createdAt: formatDate(new Date()) },
    { userName: "Dana Emerald", userId: crypto.randomUUID(), userEmail: "de@gmail.com", status: true, createdAt: formatDate(new Date()) },
];

const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");
const dataCount = document.querySelector(".user-count");
const rowTemplate = document.querySelector(".row-template");
const headerTemplate = document.querySelector(".header-template");

function formatDate(date) {
    const day = date.toLocaleDateString("en-US", { day: "numeric" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });
    const month = date.toLocaleDateString("en-US", { month: "2-digit" });
    return `${ month }/${ day }/${ year }`;
};

function renderRows(empty, data, body) {
    empty = data.length === 0;
    empty ? emptyState() : buildRow(data, body);
};

function checkStatus(user, status, badge) {
    if (user.status === true) {
        badge.textContent = "Online";
        status.classList.add("active");
    } else {
        badge.textContent = "Offline";
        status.classList.add("not-active");
    };
};

function emptyState() { console.log("Table is Empty") };

function buildHeader(headers) {
    headers.forEach(header => {
        const th = headerTemplate.content.cloneNode(true);
        const content = th.querySelector(".content");
        header.sortable ? sortableView(content, header) :
            headerView(content, header);
        tableHead.append(th);
    });
};

function sortableView(content, header) {
    content.innerHTML =
        `<span class="icon" data-icon="${ header.icon }"></span>
            <span class="text">${ header.name }</span>
            <span class="icon sort-icon" data-icon="sort"></span>`
};

function headerView(content, header) {
    content.innerHTML =
        `<span class="icon" data-icon="${ header.icon }"></span>
            <span class="text">${ header.name }</span>`
};

function buildRow(data, body) {
    dataCount.textContent = data.length;
    data.forEach(user => {
        const tr = rowTemplate.content.cloneNode(true);
        const name = tr.querySelector(".name");
        const id = tr.querySelector(".user-id");
        const email = tr.querySelector(".mailto");
        const badge = tr.querySelector(".status");
        const status = tr.querySelector(".user-status");
        const createdAt = tr.querySelector(".user-createdAt");
        /*select.querySelector("[type='checkbox']").id = `check-${ user.userId }`;
        select.querySelector("label").htmlFor = `check-${ user.userId }`;*/
        id.textContent = user.userId;
        name.textContent = user.userName;
        email.textContent = user.userEmail;
        email.href = `mailto:${ user.userEmail }`;
        createdAt.textContent = user.createdAt;
        checkStatus(user, status, badge);
        body.append(tr);
    });
};

buildHeader(headers);
renderRows(isEmpty, users, tableBody);