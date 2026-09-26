import "./demo.css";
import { formatTime } from "@utils/date";
import { createIcons, icons } from "lucide";

const users = [
    { userName: "Greg Rog", userId: crypto.randomUUID(), userEmail: "grog@gmail.com", status: true, createdAt: formatTime(new Date()) },
    { userName: "Alice Gospo", userId: crypto.randomUUID(), userEmail: "ag@gmail.com", status: false, createdAt: formatTime(new Date()) },
    { userName: "Bob Ross", userId: crypto.randomUUID(), userEmail: "bob@gmail.com", status: true, createdAt: formatTime(new Date()) },
    { userName: "Charlie Diamond", userId: crypto.randomUUID(), userEmail: "c.d@gmail.com", status: false, createdAt: formatTime(new Date()) },
    { userName: "Dana Emerald", userId: crypto.randomUUID(), userEmail: "de@gmail.com", status: true, createdAt: formatTime(new Date()) },
];

const template = document.querySelector("template");
const tableBody = document.querySelector("tbody");
const userCount = document.querySelector(".user-count");
userCount.textContent = users.length;

users.forEach(user => { 
    const tr = template.content.cloneNode(true);
    const id = tr.querySelector(".user-id");
    const status = tr.querySelector(".user-status");
    const badge = status.querySelector(".status");
    const name = tr.querySelector(".user-name");
    const email = tr.querySelector(".mailto");
    const select = tr.querySelector(".user-select");
    const createdAt = tr.querySelector(".user-createdAt");
    /*select.querySelector("[type='checkbox']").id = `check-${ user.userId }`;
    select.querySelector("label").htmlFor = `check-${ user.userId }`;*/
    id.textContent = user.userId;
    name.textContent = user.userName;
    email.textContent = user.userEmail;
    email.href = `mailto:${user.userEmail}`;
    createdAt.textContent = user.createdAt;
    if (user.status === true) {
        badge.textContent = "Online";
        status.classList.add("active");
    } else {
        badge.textContent = "Offline";
        status.classList.add("not-active");
    };
    tableBody.append(tr);
});

createIcons({ icons });