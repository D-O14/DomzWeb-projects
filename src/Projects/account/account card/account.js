import "./account.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";
import ImgUpload from "../../../Components/dropzone/imgUpload/imgUpload.js";

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
        const profile = account.querySelector("article");
        account.querySelector("h3").textContent = user.username;
        account.querySelector("a").textContent = `@${ user.handle }`;
        const card = account.querySelector(".card-body");
        const bio = account.querySelector("p");
        bio.textContent = user.bio;
        initializeIcons(account);
        root.append(account);
        loadImage(profile, user);
    });
};

function loadImage(profile, user) {
    const upload = profile.querySelector("img-upload");
    if (user.cover) { upload.setImage("cover", user.cover) };
    if (user.avatar) { upload.setImage("avatar", user.avatar) };
    upload.addEventListener("image-selected", e => {
        const file = e.detail.file;
        const type = e.detail.type;
        if (type === "cover") { user.cover = file };
        if (type === "avatar") { user.avatar = file };
        console.log(user.id);
        console.log(user.avatar, type);
        console.log(user.cover, type);
        saveImage(user);
    });

}