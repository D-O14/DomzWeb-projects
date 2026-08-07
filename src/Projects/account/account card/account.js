import "./account.css";
import { getStore } from "@utils/database.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";
import ImgUpload from "@components/dropzone/imgUpload/imgUpload.js";

const indexedDB = window.indexedDB;
const request = indexedDB.open("Users", 1);
const cards = document.querySelector(".cards");
const template = document.querySelector("template");

request.onsuccess = () => {
    const db = request.result;
    const { transaction, store } = getStore(db, "users", "readonly");
    const data = store.getAll();
    data.onsuccess = () => {
        const users = data.result;
        renderAccount(users, template, cards);
    };
};

function saveImage(user) {
    const db = request.result;
    const { transaction, store } = getStore(db, "users", "readwrite");
    store.put(user);
};

function renderAccount(array, template, root) {
    array.forEach(user => {
        const account = template.content.cloneNode(true);
        const profile = account.querySelector("article");
        const card = account.querySelector(".card-body");
        const bio = account.querySelector("p");
        account.querySelector("h3").textContent = user.username;
        account.querySelector("a").textContent = `@${ user.handle }`;
        if (user.bio === "") {
            user.bio = "Tap to add bio";
        } else {
            bio.textContent = user.bio;
        };
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
        saveImage(user);
    });

}