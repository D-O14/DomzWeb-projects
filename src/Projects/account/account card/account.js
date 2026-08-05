import "./account.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const indexedDB = window.indexedDB;
const request = indexedDB.open("Users", 1);
request.onsuccess = () => {
    const db = request.result;
    const transaction = db.transaction("users", "readonly");
    const store = transaction.objectStore("users");
    const users = store.getAll();
    users.onsuccess = () => {
        console.log(users.result);
    };
}
const data = [
    {
        username: "Domzski",
        handle: "domzweb",
        bio: "Upcoming Web Developer and UI/UX Expert.",
    },
    {
        username: "Sarah",
        handle: "sarahb",
        bio: "Just a girl.",
    },
];

const template = document.querySelector("template");
const cards = document.querySelector(".cards");

function renderAccount(array, template, root) {
    array.forEach(user => {
        const account = template.content.cloneNode(true);
        account.querySelector("h3").textContent = user.username;
        account.querySelector("a").textContent = `@${ user.handle }`;
        account.querySelector("p").textContent = user.bio;
        const button = account.querySelector("button");
        button.addEventListener("click", () => {
            button.textContent === "Follow" ? button.textContent += "ing" :
                button.textContent = "Follow";
        });
        initializeIcons(account);
        root.append(account);
    });
};

renderAccount(data, template, cards);