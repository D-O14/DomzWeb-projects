import "@components/toast/toast.js";
import "./notes_app.css";
import "@components/tooltip/tooltip";
import searchItems from "@utils/input";
import "@components/buttons/regular/button";
import { createIcons, icons } from "lucide";
import { getCurrentTime } from "@utils/date.js";
import { copy, share } from "@utils/actions.js";
import { createRipple, closeDialog } from "@utils/button.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import "@components/form elements/input/search/searchInput";

let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const main = document.querySelector("main");
const form = document.getElementById("form");
const notes = document.getElementById("notes");
const dialog = document.getElementById("dialog");
const themeBtn = document.getElementById("themeBtn");
//const saveBtn = document.getElementById("saveBtn");
const closeBtn = document.getElementById("closeBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("noteTitle");
const addNoteBtn = document.getElementById("addNoteBtn");
const emptyState = document.getElementById("emptyState");
const toastNotif = document.querySelector("toast-notif");
const tooltip = document.querySelector("tool-tip");
//const tooltip = tooltipComponent.querySelector(".tooltip");
const searchComponent = document.querySelector("search-input");
const contentInput = document.getElementById("noteContent");
const noteTemplate = document.getElementById("noteTemplate");
const layoutBtn = document.querySelector(".layoutBtn");
//const buttons = document.querySelectorAll("button");


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

addNoteBtn.addEventListener("onClick", () => {
    dialog.showModal();
    dialog.classList.add("open");
});

addNoteBtn.addEventListener("onHover", () => {
    tooltip.addEventListener("reveal", (e) => {
        const component = e.detail.tooltip;
        component.classList.add("revealed");
    })
    //tooltip.classList.toggle("revealed");
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

/*buttons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        createRipple(e, btn);
    });
})*/

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
        date: getCurrentTime(),
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
            const date = note.querySelector(".date");
            /*if (note.contains(date)) { date.textContent = `${ quickNote.date }` };
            else {
                date.textContent = "";
            };*/
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
createIcons({ icons });
initializeIcons(document);