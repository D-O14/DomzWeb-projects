import "./account.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";
import ImgUpload from "../../../Components/dropzone/imgUpload/imgUpload.js";

console.log("Account module loaded");
console.log(customElements.get("img-upload"));
console.log(import.meta.url);

const indexedDB = window.indexedDB;
const request = indexedDB.open("Users", 1);
const cards = document.querySelector(".cards");
const template = document.querySelector("template");

function getStore(mode) {
    const db = request.result;
    const transaction = db.transaction("users", mode);
    return transaction.objectStore("users");
}

request.onsuccess = () => {
    const store = getStore("readonly");
    const data = store.getAll();
    data.onsuccess = () => {
        const users = data.result;
        renderAccount(users, template, cards);
    };
};

function saveImage(user) {
    const store = getStore("readwrite");
    store.put(user);
};

function renderAccount(array, template, root) {
    array.forEach(user => {
        const account = template.content.cloneNode(true);
        account.querySelector("h3").textContent = user.username;
        account.querySelector("a").textContent = `@${ user.handle }`;
        const upload = account.querySelector("img-upload");
        customElements.whenDefined("img-upload").then(() => {
            if (user.avatar) { upload.setImage("avatar", user.avatar) };
            if (user.cover) { upload.setImage("cover", user.cover) };
        });
        upload.addEventListener("image-selected", e => {
            const file = e.detail.file;
            const type = e.detail.type;
            const img = e.detail.img;
            if (type === "avatar") { user.avatar = file };
            if (type === "cover") { user.cover = file };
            saveImage(user);     
        });
        const card = account.querySelector(".card-body");
        const bio = account.querySelector("p");
        bio.textContent = user.bio; 
       
        initializeIcons(account);
        root.append(account);
    });
};

/*const button = account.querySelector("button");
button.addEventListener("click", () => {
    button.textContent === "Follow" ? button.textContent += "ing" :
        button.textContent = "Follow";
});*/
