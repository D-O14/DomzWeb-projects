import "./notes_app.css";

let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const notesContainer = document.getElementById("notesContainer");
const noteBox = document.querySelector("#noteBox");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const openDialogBtn = document.querySelector(".add-note-btn");
const closeDialogBtn = document.querySelector(".close-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("noteContent");
const saveBtn = document.querySelector(".save-btn");
const emptyState = document.querySelector("#emptyState");
const themeBtn = document.querySelector(".theme-btn");

let moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>`;
let sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 3v1"/><path d="M12 20v1"/><path d="M3 12h1"/><path d="M20 12h1"/><path d="m18.364 5.636-.707.707"/><path d="m6.343 17.657-.707.707"/><path d="m5.636 5.636.707.707"/><path d="m17.657 17.657.707.707"/></svg>`

function saveNote() {
    const note = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
    }

    quickNotes.unshift(note);
    console.log(quickNotes);
    localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-theme");
        themeBtn.innerHTML = `${sunIcon}`;
    };

    dialog.addEventListener("click", function (e) {
        if (e.target === this) {
            dialog.close();
        };
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveNote();
    form.reset();
    renderNotes();
    dialog.close();
});

themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
    themeBtn.innerHTML = isDark ? `${sunIcon}` : `${moonIcon}`;
});

notesContainer.addEventListener("click", (e) => {
    const delBtn = e.target.closest(".del-btn");
    if (delBtn) {
        const note = delBtn.closest(".note-card");
        const id = note.dataset.id;
        note.remove();
        quickNotes = quickNotes.filter(quickNote => { return quickNote.id !== id });
        localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
    }
});

notesContainer.addEventListener("click", (e) => {
    const editBtn = e.target.closest(".edit-btn");
    if (editBtn) {
        const noteCard = editBtn.closest(".note-card");
        const noteContent = noteCard.querySelector(".note-content");
        const id = noteCard.dataset.id;
        noteContent.setAttribute("contenteditable", "true");
        noteContent.focus();
        const noteToEdit = quickNotes.find(quickNote => { return quickNote.id === id });

        noteContent.addEventListener("input", () => {
            noteToEdit.content = noteContent.textContent;
            localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
        });
    }
});

openDialogBtn.addEventListener("click", () => {
    dialog.showModal();
    titleInput.focus();
});

closeDialogBtn.addEventListener("click", () => {
    form.reset();
    //dialog.classList.add("close");
    dialog.close();
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    //dialog.classList.add("close");
    dialog.close();
});

function renderNotes() {
    notesContainer.innerHTML = "";

    quickNotes.forEach(quickNote => {
        const noteElem = noteBox.content.cloneNode(true);
        noteElem.querySelector(".note-title").textContent = `${ quickNote.title }`;
        noteElem.querySelector(".note-content").textContent = `${ quickNote.content }`;
        noteElem.querySelector(".note-card").dataset.id = `${ quickNote.id }`;

        notesContainer.append(noteElem);
    });

    if (quickNotes.length === 0) {
        const empty = emptyState.content.cloneNode(true);
        openDialogBtn.classList.add("focus");
        notesContainer.append(empty);
        return;
    } else {
        openDialogBtn.classList.remove("focus");
    }
}

renderNotes();