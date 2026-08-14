import "./notes_app.css";
import { closeDialog } from "@utils/utilities.js";
import { icons, initializeIcons } from "@assets/Icons/icons.js";

let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const main = document.querySelector("main");
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
const layoutBtn = document.querySelector(".layoutBtn");

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

layoutBtn.addEventListener("click", () => {
    const layoutIcon = layoutBtn.querySelector(".icon");
    if (layoutIcon.dataset.icon === "dashboard") {
        layoutIcon.dataset.icon = "grid";
        main.classList.add("grid");
    }  else if (layoutIcon.dataset.icon === "grid") {
        layoutIcon.dataset.icon = "list";
        main.classList.add("list");
    } else {
        layoutIcon.dataset.icon = "dashboard";
        main.classList.remove("grid");
    }
    
    initializeIcons(layoutBtn);
});

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
    const themeIcon = themeBtn.querySelector(".icon");
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
    themeIcon.dataset.icon = isDark ? "sun" : "moon";
    initializeIcons(themeBtn);
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
    const noteToDelete = items.filter(quickNote => { return quickNote.id != id });
    localStorage.setItem("quickNotes", JSON.stringify(noteToDelete));
};

function editNote(editBtn, items) {
    const note = editBtn.closest(".note-card");
    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    const id = note.dataset.id;
    noteTitle.setAttribute("contenteditable", true);
    noteContent.setAttribute("contenteditable", true);
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
            const noteCard = note.querySelector("article");
            const noteTitle = note.querySelector(".note-title");
            noteTitle.textContent = quickNote.title;
            note.querySelector(".note-content").textContent = quickNote.content;
            note.querySelector(".note-card").dataset.id = quickNote.id;
            if (quickNote.title === "") { noteTitle.textContent = "Untitled Note" }
            container.append(note);
            initializeIcons(noteCard);
        });
    }
}

renderNotes(noteData);
initializeIcons(document);