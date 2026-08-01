import { icons, initializeIcons } from "../../../Assets/Icons/icons";

document.addEventListener("dragover", e => { e.preventDefault() });
document.addEventListener("drop", e => { e.preventDefault() });

const zones = document.querySelectorAll(".zone");
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

function previewFile(file, data) {
    if (!validateFile(file, data)) return;
    const img = data.img;
    const url = URL.createObjectURL(file)
    img.onload = () => { URL.revokeObjectURL(url) };
    img.src = url;
    showPreview(img, data);
    data.preview.innerHTML = "";
    data.preview.append(img);
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
    file.hidden = false;
    data.icon.hidden = true;
    data.preview.innerHTML = "";
}

function removePreview(data) {
    data.input.value = "";
    data.icon.hidden = false;
    data.preview.innerHTML = "";
}