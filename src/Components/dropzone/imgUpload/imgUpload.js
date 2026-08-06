import { icons, initializeIcons } from "../../../Assets/Icons/icons";

document.addEventListener("dragover", e => { e.preventDefault() });
document.addEventListener("drop", e => { e.preventDefault() });

const template = document.createElement("template");
template.innerHTML = `
<div class="drop-zone">
<div class="cover zone" type="cover">
    <span class="icon" data-icon="cameraSpark"></span>
    <div class="img-preview">
        <img src=" " alt="" hidden>
    </div>
    <input type="file" hidden name="profile picture" placeholder="filePicker">
</div>
<div class="pfp zone" type="avatar">
    <div class="img-preview">
        <span class="icon" data-icon="cameraSpark"></span>
        <img src=" " alt="" hidden>
    </div>
    <input type="file" hidden name="profile picture" placeholder="filepicker">
</div>
</div>
`;

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

class ImgUpload extends HTMLElement {
    constructor() {
        super();
        const zones = template.content.cloneNode(true);
        const dropzone = zones.querySelector(".drop-zone");
        initializeIcons(dropzone);
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("link");
        style.rel = "preload";
        style.as = "style";
        style.onload = () => { style.rel = "stylesheet" };
        style.href = new URL("./imgUpload.css", import.meta.url);
        shadow.append(style);
        shadow.append(zones);
        const uploads = dropzone.querySelectorAll(".zone");
        uploads.forEach(upload => {
            const data = {
                input: upload.querySelector("input"),
                icon: upload.querySelector(".icon"),
                img: upload.querySelector("img"),
                preview: upload.querySelector(".img-preview"),
            };
            this.uploads = {};
            upload.addEventListener("click", () => { data.input.click() });
            upload.addEventListener("dragover", (e) => { e.preventDefault() });
            upload.addEventListener("drop", (e) => {
                e.preventDefault();
                const fileLength = e.dataTransfer.files.length;
                const files = e.dataTransfer.files;
                if (fileLength) {
                    data.input.files = files;
                    previewFile(files[0], data);
                };
            });
            data.input.addEventListener("change", () => {
                const type = upload.getAttribute("type");
                this.uploads[type] = data;
                const file = data.input.files[0];
                previewFile(file, data);

                this.dispatchEvent(
                    new CustomEvent("image-selected", {
                        detail: { file, type },
                        bubbles: true
                    })
                );
            });
        });
    };

    setImage(type, file) {
        const data = this.uploads[type];

        if (!data) return;

        previewFile(file, data);
    }
}

customElements.define("img-upload", ImgUpload);
console.log("ImgUpload registered");
console.log(customElements.get("img-upload"));
console.log(import.meta.url);
export default ImgUpload;