import "./account.css";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

const data = [
    {
        username: "Domzski",
        handle: "domzweb",
        bio: "Upcoming Web Developer and UI/UX Expert.",
    },
];

document.addEventListener("dragover", e => { e.preventDefault() });
document.addEventListener("drop", e => { e.preventDefault() });

const template = document.querySelector("template");
const cards = document.querySelector(".cards");

function renderAccount(array, template, root) {
    array.forEach(arr => {
        const account = template.content.cloneNode(true);
        account.querySelector("h3").textContent = arr.username;
        account.querySelector("a").textContent = `@${ arr.handle }`;
        account.querySelector("p").textContent = arr.bio;
        const zones = account.querySelectorAll(".zone");
        zones.forEach(zone => {
            const data = {
                input: zone.querySelector("input"),
                icon: zone.querySelector(".icon"),
                img: zone.querySelector("img"),
                preview: zone.querySelector(".img-preview"),
            }

            zone.addEventListener("click", () => { data.input.click() });
            zone.addEventListener("dragover", (e) => { e.preventDefault() });
            zone.addEventListener("drop", (e) => {
                e.preventDefault();
                const fileLength = e.dataTransfer.files.length;
                const files = e.dataTransfer.files;
                if (fileLength) {
                    data.input.files = files;
                    previewFile(files[0], data);
                };
            });

            data.input.addEventListener("change", () => {
                const file = data.input.files[0];
                previewFile(file, data);
            });
        });
        const button = account.querySelector("button");
        button.addEventListener("click", () => {
            button.textContent === "Follow" ? button.textContent += "ing" :
                button.textContent = "Follow";
        })
        initializeIcons(account);
        root.append(account);
    });
};

function previewFile(file, data) {
    if (!validateFile(file, data)) return;
    const img = data.img;
    const url = URL.createObjectURL(file)
    img.onload = () => { URL.revokeObjectURL(url) };
    img.src = url;
    showPreview(img, data);
    data.preview.innerHTML = "";
    data.preview.append(img);
};

function validateFile(file, data) {
    if (!file) return false;

    if (file.size > 5250000) {
        removePreview(data);
        return false;
    }
    return true;
};

function showPreview(file, data) {
    file.hidden = false;
    data.icon.hidden = true;
    data.preview.innerHTML = "";
};

function removePreview(data) {
    data.input.value = "";
    data.icon.hidden = false;
    data.preview.innerHTML = "";
};

renderAccount(data, template, cards);