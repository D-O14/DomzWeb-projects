import "@components/toast/toast.js";
import "./notes_app.css";
import searchItems from "@utils/input";
import { createIcons, icons } from "lucide";
import { relativeTime } from "@utils/date.js";
import { copy, share } from "@utils/actions.js";
import { closeDialog } from "@utils/button.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import "@components/form elements/input/search/searchInput";

let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const main = document.querySelector("main");
const form = document.getElementById("form");
const notes = document.getElementById("notes");
const dialog = document.getElementById("dialog");
const themeBtn = document.getElementById("themeBtn");
const layoutBtn = document.querySelector(".layoutBtn");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("noteTitle");
const addNoteBtn = document.getElementById("addNoteBtn");
const emptyState = document.getElementById("emptyState");
const toastNotif = document.querySelector("toast-notif");
const contentInput = document.getElementById("noteContent");
const noteTemplate = document.getElementById("noteTemplate");
const searchComponent = document.querySelector("search-input");
const toolbarTemplate = document.querySelector(".toolbar-template");
const selectionToolbar = toolbarTemplate.content.cloneNode(true);

const noteData = {
    container: notes,
    items: quickNotes,
    btn: addNoteBtn,
    placeholder: emptyState,
    template: noteTemplate
}

/*const shareData = {
    title: "Card Title",
    text: target,
    url: crypto.randomUUID(),
};*/

document.addEventListener("DOMContentLoaded", () => {
    const themeIcon = themeBtn.querySelector(".icon");
    if (localStorage.getItem("theme") === "dark-mode") {
        document.body.classList.add("dark-theme");
        themeIcon.dataset.icon = "sun";
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

themeBtn.addEventListener("click", () => {
    if (!document.startViewTransition) { themeSwitch(themeBtn); return; }
    document.startViewTransition(() => { themeSwitch(themeBtn) });
});

layoutBtn.addEventListener("click", () => {
    const layoutIcon = layoutBtn.querySelector(".icon");
    if (layoutIcon.dataset.icon === "dashboard") {
        layoutIcon.dataset.icon = "grid";
        main.classList.add("grid");
    } else if (layoutIcon.dataset.icon === "grid") {
        layoutIcon.dataset.icon = "list";
        main.classList.replace("grid", "list");
    } else if (layoutIcon.dataset.icon === "list") {
        layoutIcon.dataset.icon = "dashboard";
        main.classList.remove("list");
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

searchComponent.addEventListener("search", (e) => {
    const component = e.detail.input;
    const results = searchItems({
        input: component,
        items: quickNotes,
        property: "title",
    });

    renderNotes({
        container: notes,
        items: results,
        btn: addNoteBtn,
        placeholder: emptyState,
        template: noteTemplate
    });

    /*if (results.length === 0) { 
        renderNotes({
            container: notes,
            items: results,
            btn: addNoteBtn,
            placeholder: emptyState,
            template: noteTemplate
        });
    }; */
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    saveNote(quickNotes);
    form.reset();
    closeDialog(dialog);
    renderNotes(noteData);
});

notes.addEventListener("click", (e) => {
    const note = notes.querySelector(".note-card");
    const content = note.querySelector(".note-content");
    const deleteBtn = e.target.closest(".deleteBtn");
    const editBtn = e.target.closest(".editBtn");
    const copyBtn = e.target.closest(".copyBtn");
    const shareBtn = e.target.closest(".shareBtn");
    if (copyBtn) { copy(content.textContent, toastNotif) };
    if (deleteBtn) { deleteNote(deleteBtn, quickNotes) };
    if (editBtn) { editNote(editBtn, quickNotes) };
    //if (shareBtn) { editNote(editBtn, quickNotes) };
});

notes.addEventListener("pointerdown", (e) => {
    const checkbox = e.target.closest(".checkbox");
    const customCheckbox = notes.querySelectorAll(".custom-check");
    if (checkbox && customCheckbox) {
        customCheckbox.forEach(cb => { select(cb, checkbox) });
    };
});

function select(customCheckbox, checkbox) {
    setTimeout(() => {
        customCheckbox.classList.add("checked");
        checkbox.checked = true;
    }, 2000)};

function themeSwitch(themeBtn) {
    const themeIcon = themeBtn.querySelector(".icon");
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
    themeIcon.dataset.icon = isDark ? "sun" : "moon";
    initializeIcons(themeBtn);
}

function updateDate() {
    document.querySelectorAll("[data-created-at]").forEach(date => {
        date.textContent = relativeTime(date.dataset.createdAt)
    });
}

function renderToolBar() {
    const selectionToolbar = toolbarTemplate.content.cloneNode(true);
    const toolbarView = selectionToolbar.querySelector(".toolbar-view");
    selectionToolbar.querySelector(".select-all").textContent = `Select All (${ quickNotes.length })`;
    /*selectionToolbar.querySelector(".toolbar-close").addEventListener("click", () => {
        toolbarView.classList.add("hide");
        setTimeout(() => { toolbarView.remove()}, 1000);
    });*/
    document.body.prepend(selectionToolbar);
}

function saveNote(items) {
    const note = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        createdAt: new Date().toISOString()
    }
    items.unshift(note);
    localStorage.setItem("quickNotes", JSON.stringify(items));
};

function deleteNote(deleteBtn, items) {
    const note = deleteBtn.closest(".note-card");
    const id = note.dataset.id;
    note.classList.add("deleted");
    note.addEventListener("transitionend", () => {
        note.remove();
        const notes = items.filter(quickNote => { return quickNote.id != id });
        localStorage.setItem("quickNotes", JSON.stringify(notes));
    });
    toastNotif.showToast({
        status: "success",
        message: "Note deleted successfully!",
    });
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
        noteToEdit.title = noteTitle.textContent;
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
        main.classList.add("empty");
        btn.classList.add("focus");
        container.append(empty);
        return;
    } else {
        main.classList.remove("empty");
        btn.classList.remove("focus");
        items.forEach(quickNote => {
            const note = template.content.cloneNode(true);
            const noteCard = note.querySelector("article");
            const noteTitle = note.querySelector(".note-title");
            const noteDate = note.querySelector(".note-date");
            const checkbox = note.querySelector(".checkbox");
            const customCheckbox = note.querySelector(".custom-check");
            if (quickNote.createdAt) {
                noteDate.dataset.createdAt = quickNote.createdAt;
                noteDate.textContent = relativeTime(quickNote.createdAt);
            } if (quickNote.title === "") {
                quickNote.title = "Untitled Note";
                noteTitle.textContent = "Untitled Note";
            } else { noteTitle.textContent = quickNote.title };
            note.querySelector(".note-content").textContent = quickNote.content;
            /*noteCard.addEventListener("pointerdown", () => {
                setTimeout(() => {
                    customCheckbox.classList.add("checked");
                    checkbox.checked = true;
                }, 2000);
            });*/
            noteCard.dataset.id = quickNote.id;
            checkbox.id = quickNote.id;
            container.append(note);
            initializeIcons(noteCard);
        });
    }
}

updateDate();
renderToolBar();
renderNotes(noteData);
createIcons({ icons });
initializeIcons(document);
setInterval(() => { updateDate() }, 1000);