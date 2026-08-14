//import "./notes_app.css";
//import { closeDialog } from "@utils/utilities.js";
import { icons, initializeIcons } from "../../../Assets/Icons/icons.js";

let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];
const form = document.getElementById("form");
const notes = document.getElementById("notes");
const dialog = document.getElementById("dialog");
const saveBtn = document.getElementById("saveBtn");
const themeBtn = document.getElementById("themeBtn");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("noteTitle");
const addNoteBtn = document.getElementById("addNoteBtn");
const emptyState = document.getElementById("emptyState");
const contentInput = document.getElementById("noteContent");
const noteTemplate = document.getElementById("noteTemplate");

const noteData = {
    container: notes,
    items: quickNotes,
    btn: addNoteBtn,
    placeholder: emptyState,
    template: noteTemplate
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-theme");
        themeBtn.innerHTML = `${ icons.sun }`;
    };

    dialog.addEventListener("click", function (e) {
        if (e.target === this) {
            dialog.close();
        };
    });
});

addNoteBtn.addEventListener("click", () => {
    dialog.showModal();
    dialog.classList.add("open");
});

themeBtn.addEventListener("click", () => { themeSwitch(themeBtn) });

closeBtn.addEventListener("click", () => {
    form.reset();
    closeDialog(dialog);
    
});

cancelBtn.addEventListener("click", () => {
    form.reset();
    closeDialog(dialog);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveNote(quickNotes);
    form.reset();
    closeDialog(dialog);
    renderNotes(noteData);
});

notes.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".deleteBtn");
    const editBtn = e.target.closest(".editBtn");
    if (deleteBtn) { deleteNote(deleteBtn, quickNotes) };
    if (editBtn) { editNote(editBtn, quickNotes) };
});

function themeSwitch(themeBtn) {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
    themeBtn.innerHTML = isDark ? `${ icons.sun }` : `${ icons.moon }`;
}

function saveNote(items) {
    const note = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
    }
    items.unshift(note);
    localStorage.setItem("quickNotes", JSON.stringify(items));
};

function deleteNote(deleteBtn, items) {
    const note = deleteBtn.closest(".note-card");
    const id = note.dataset.id;
    note.remove();
    quickNotes = items.filter(quickNote => { return quickNote.id !== id });
    localStorage.setItem("quickNotes", JSON.stringify(items));
};

function editNote(editBtn, items) {
    const note = editBtn.closest(".note-card");
    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    const id = note.dataset.id;
    noteTitle.setAttribute("contenteditable", "true");
    noteContent.setAttribute("contenteditable", "true");
    noteTitle.focus();
    noteContent.focus();
    const noteToEdit = items.find(quickNote => { return quickNote.id === id });
    noteTitle.addEventListener("input", () => {
        noteToEdit.content = noteTitle.textContent;
        localStorage.setItem("quickNotes", JSON.stringify(items));
    });
    noteContent.addEventListener("input", () => {
        noteToEdit.content = noteContent.textContent;
        localStorage.setItem("quickNotes", JSON.stringify(items));
    });
}

function renderNotes({ container, items, btn, placeholder, template }) {
    container.innerHTML = "";
    if (items.length === 0) {
        const empty = placeholder.content.cloneNode(true);
        btn.classList.add("focus");
        container.append(empty);
        return;
    } else {
        btn.classList.remove("focus");
        items.forEach(quickNote => {
            const note = template.content.cloneNode(true);
            note.querySelector(".note-title").textContent = quickNote.title;
            note.querySelector(".note-content").textContent = quickNote.content;
            note.querySelector(".note-card").dataset.id = quickNote.id;
            container.append(note);
        });
    }
}

renderNotes(noteData);
initializeIcons(document);