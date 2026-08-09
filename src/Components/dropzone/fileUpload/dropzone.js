import { icons, initializeIcons } from "../../../Assets/Icons/icons";
import { createStyle, createTemplate } from "@utils/component.js";

const template = createTemplate(
`<div class="drop-zone">
<span class="icon" data-icon="upload"></span>
<div class="dropzone-content">
<h4>Choose or drop a file. Any <button class="uploadBtn">file</button>.</h4>
<p>JPG, WEBP, PDF, DOCX, MP3....</p>
</div>
    <div class="preview-container">
        <template class="img-preview">
            <img alt="">
        </template>
        <template class="video-preview">
            <video controls></video>
        </template>
        <template class="audio-preview">
            <audio controls></audio>
        </template>
    </div>
    <input type="file" id="filePicker" hidden>
</div>`
);

const dropZone = template.content.cloneNode(true);
const events = ["dragleave", "dragend"];

class DropZone extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const style = createStyle("./dropzone.css", import.meta.url);
        shadow.append(style);
        shadow.append(dropZone);

        const dropzone = shadow.querySelector(".drop-zone");
        const icon = shadow.querySelector("span");
        const heading = shadow.querySelector("h4");
        const paragraph = shadow.querySelector("p");
        const button = shadow.querySelector("button");
        const filePicker = shadow.querySelector("input");
        const imgPreview = shadow.querySelector(".img-preview");
        const videoPreview = shadow.querySelector(".video-preview");
        const audioPreview = shadow.querySelector(".audio-preview");
        const previewContainer = shadow.querySelector(".preview-container");

        initializeIcons(shadow);

        const data = {
            imagePreview: imgPreview,
            vidPreview: videoPreview,
            audPreview: audioPreview,
            container: previewContainer,
            icon: icon,
            title: heading,
            desc: paragraph,
            browseBtn: button,
            input: filePicker,
        }

        dropzone.addEventListener("click", () => { filePicker.click() });
        dropzone.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropzone.classList.add("over");
        });

        dropzone.addEventListener("drop", (e) => {
            e.preventDefault();
            const fileLength = e.dataTransfer.files.length;
            const files = e.dataTransfer.files;
            if (fileLength) {
                filePicker.files = files;
                previewFile(files[0], data);
            };
            dropzone.classList.remove("over");
        });

        events.forEach(event => {
            dropzone.addEventListener(event, () => {
                dropzone.classList.remove("over");
            });
        });

        filePicker.addEventListener("change", () => {
            const file = filePicker.files[0];
            previewFile(file, data);
        });
    };
};

customElements.define("drop-zone", DropZone);
export default DropZone;


function previewFile(file, data) {
    if (!validateFile(file, data)) return;
    const url = URL.createObjectURL(file);

    if (file.type.startsWith("image/")) {
        const preview = data.imagePreview.content.cloneNode(true);
        const img = preview.querySelector("img");
        img.onload = () => { URL.revokeObjectURL(url) };
        img.src = url;
        showPreview(img, data);
        data.container.innerHTML = "";
        data.container.append(preview);
    } else if (file.type.startsWith("video/")) {
        const preview = data.vidPreview.content.cloneNode(true);
        const video = preview.querySelector("video");
        video.onloadeddata = () => { URL.revokeObjectURL(url) };
        video.src = url;
        showPreview(video, data);
        data.container.innerHTML = "";
        data.container.append(preview);
    } else if (file.type.startsWith("audio/")) {
        const preview = data.audPreview.content.cloneNode(true);
        const audio = preview.querySelector("audio");
        audio.onloadeddata = () => { URL.revokeObjectURL(url) };
        audio.src = url;
        showPreview(audio, data);
        data.container.innerHTML = "";
        data.container.append(preview);
    }
}

function validateFile(file, data) {
    if (!file) return false;

    if (file.size > 5250000) {
        removePreview(data);
        return false;
    }
    return true;
}

function showPreview(file, data) {
    data.icon.hidden = true;
    data.title.hidden = true;
    data.desc.hidden = true;
    data.browseBtn.hidden = true;
    file.hidden = false;
}

function removePreview(data) {
    data.input.value = "";
    data.icon.hidden = false;
    data.title.hidden = false;
    data.desc.hidden = false;
    data.browseBtn.hidden = false;
    data.container.innerHTML = "";
}