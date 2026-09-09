import "./quickNotes.css";
import "@components/toast/toast.js";
import searchItems from "@utils/input";
import { createIcons, icons } from "lucide";
import { relativeTime } from "@utils/date.js";
import { copy, share } from "@utils/actions.js";
import { initializeIcons } from "@assets/Icons/icons.js";
import "@components/form elements/input/search/searchInput";
import { closeDialog, createRipple } from "@utils/button.js";
import {
    sortUpdated, sortA_Z, sortZ_A, sortNewest, sortOldest, applyState, filterCreatedToday,
    filterCreatedYesterday, filterCreatedOlder, filterThisWeek
} from "@utils/utilities.js";
import { slideInY, slideInX } from "../../../Utilities/animation";

// 10 Imports statements, 22 Imports, 20 In use, 17 Functions, 15 In use, 16 Personal Functions, 1 object, 2 Web Components, 1 CSS

// 5 Arrays, 1 Set, 2 Objects, 1 function-created object, 3 raw Variables

let pressTimer;
let activeRow = null;
let deletedNotes = [];
let selectionMode = false;
let selectedNotes = new Set();
let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const notesInView = [...quickNotes];

// 25 Constants, 24 in use, 6 Buttons, 5 Templates, 2 Web Components, 2 inputs

const now = new Date().toISOString().slice(0, 10);
const today = now;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const main = document.querySelector("main");
const form = document.getElementById("form");
const notes = document.getElementById("notes");
const dialog = document.getElementById("dialog");
const sortRow = document.querySelector(".sort-row");
const themeBtn = document.getElementById("themeBtn");
const closeBtn = document.getElementById("closeBtn");
const layoutBtn = document.querySelector(".layoutBtn");
const cancelBtn = document.getElementById("cancelBtn");
const titleInput = document.getElementById("noteTitle");
const addNoteBtn = document.getElementById("addNoteBtn");
const emptyState = document.getElementById("emptyState");
const toastNotif = document.querySelector("toast-notif");
const filterRow = document.querySelector(".filter-row");
const filterBtn = document.getElementById("filterBtn");
const sortBtn = document.getElementById("sortBtn");
const resultsTemplate = document.getElementById("noResults");
const sortTemplate = document.getElementById("sortTemplate");
const contentInput = document.getElementById("noteContent");
const noteTemplate = document.getElementById("noteTemplate");
const searchComponent = document.querySelector("search-input");
const filterTemplate = document.getElementById("filterTemplate");

const noteData = {
    container: notes,
    items: quickNotes,
    btn: addNoteBtn,
    placeholder: emptyState,
    template: noteTemplate
}

const sortChips = [
    { label: "Recently Updated", func: () => { sortUpdated(notesInView, "updatedAt", renderNotes, noteData) }, className: "use" },
    { label: "Newest First", func: () => { sortNewest(notesInView, "createdAt", renderNotes, noteData) } },
    { label: "Oldest First", func: () => { sortOldest(notesInView, "createdAt", renderNotes, noteData) } },
    { label: "Title A-Z", func: () => { sortA_Z(notesInView, "title", renderNotes, noteData) } },
    { label: "Title Z-A", func: () => { sortZ_A(notesInView, "title", renderNotes, noteData) } },
];

const filterChips = [
    { label: "All", func: () => { renderNotes(noteData) }, className: "use" },
    { label: "Today", func: () => { filterCreatedToday(notesInView, today, renderNotes, noteData) } },
    { label: "Yesterday", func: () => { filterCreatedYesterday(notesInView, yesterday, renderNotes, noteData) } },
    { label: "This Week", func: () => { filterThisWeek(notesInView, renderNotes, noteData) } },
    { label: "Older", func: () => { filterCreatedOlder(notesInView, today, renderNotes, noteData) } },
];

// 15 Event Listeners, 1 Custom, 1 documenr, 5 same element

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

filterBtn.addEventListener("click", () => { activeRow === "filter" ? toggleClass(filterRow) : setActiveRow("filter") });

sortBtn.addEventListener("click", () => { activeRow === "sort" ? toggleClass(sortRow) : setActiveRow("sort") });

searchComponent.addEventListener("search", (e) => { applySearch(e, notesInView, noteData, resultsTemplate) });

form.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    saveNote(quickNotes);
    closeDialog(dialog);
    renderNotes(noteData);
});

notes.addEventListener("click", (e) => {
    const note = notes.querySelector(".note-card");
    if (!note) return;
    const content = note.querySelector(".note-content");
    const editBtn = e.target.closest(".editBtn");
    const copyBtn = e.target.closest(".copyBtn");
    if (copyBtn) { copy(content.textContent, toastNotif) };
    if (editBtn) { editNote(editBtn, quickNotes) };
});

notes.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const card = e.target.closest(".note-card");
    if (!card) return;
    const noteId = card.dataset.id;

    pressTimer = setTimeout(() => {
        enterSelectMode(noteId);
    }, 600);
});

notes.addEventListener("pointerup", () => { cancelPress() });
notes.addEventListener("pointercancel", () => { cancelPress() });

notes.addEventListener("change", (e) => {
    if (!e.target.matches(".checkbox")) return;
    const checkbox = e.target;
    const card = checkbox.closest(".note-card");
    const noteId = card.dataset.id;
    if (checkbox.checked) {
        selectedNotes.add(noteId)
    } else {
        selectedNotes.delete(noteId);
    };
    renderToolBar();
});

// 16 functions, 14 in use, 17 imported, 16 Personal, 15 In use, Total in use: 31 functions (sub-functions not included)

function themeSwitch(themeBtn) {
    const themeIcon = themeBtn.querySelector(".icon");
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark-mode" : "light-mode");
    themeIcon.dataset.icon = isDark ? "sun" : "moon";
    initializeIcons(themeBtn);
}

function createCard(note, quickNote) {
    const noteCard = note.querySelector("article");
    const noteDate = note.querySelector(".note-date");
    const noteSelect = note.querySelector(".checkbox");
    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    noteCard.dataset.id = quickNote.id;
    noteSelect.id = noteCard.dataset.id;
    noteContent.textContent = quickNote.content;
    noteDate.dataset.createdAt = quickNote.createdAt;
    noteDate.textContent = relativeTime(quickNote.updatedAt);
    quickNote.title ? noteTitle.textContent = quickNote.title : noteTitle.textContent = "Untitled Note";
    initializeIcons(noteCard);
    return noteCard;
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
            createCard(note, quickNote);
            selectUI(note, quickNote, selectionMode);
            container.append(note);
        });
    }
}

function applySearch(e, items, obj, template) {
    const component = e.detail.input;
    const results = searchItems({
        input: component,
        items: items,
        property: "title",
    });

    results.length === 0 ? renderNotes({ ...obj, placeholder: template }) :
        renderNotes({ ...obj, items: results });
}

function saveNote(items) {
    const note = {
        id: crypto.randomUUID(),
        title: titleInput.value.trim(),
        content: contentInput.value.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: [],
    }
    items.unshift(note);
    localStorage.setItem("quickNotes", JSON.stringify(items));
};

function updateDate() {
    document.querySelectorAll("[data-created-at]").forEach(date => {
        date.textContent = relativeTime(date.dataset.createdAt)
    });
}

function editNote(editBtn, items) {
    const note = editBtn.closest(".note-card");
    //const noteDate = note.querySelector(".note-date");
    const noteTitle = note.querySelector(".note-title");
    const noteContent = note.querySelector(".note-content");
    const id = note.dataset.id;
    noteTitle.setAttribute("contenteditable", true);
    noteContent.setAttribute("contenteditable", true);
    noteTitle.focus();
    noteContent.focus();
    const noteToEdit = items.find(quickNote => { return quickNote.id === id });
    //const updatedDate = items.map(item => { item.updatedAt = new Date().toISOString() });    
    noteTitle.addEventListener("input", () => {
        noteToEdit.title = noteTitle.textContent;
        localStorage.setItem("quickNotes", JSON.stringify(items));
    });
    noteContent.addEventListener("input", () => {
        noteToEdit.content = noteContent.textContent;
        localStorage.setItem("quickNotes", JSON.stringify(items));
    });
}

function cancelPress() {
    clearTimeout(pressTimer);
    pressTimer = null;
};

function enterSelectMode(noteId) {
    selectionMode = true;
    selectedNotes.add(noteId);
    renderNotes(noteData);
    renderToolBar();
}

function selectUI(note, quickNote, mode) {
    const noteCheck = note.querySelector(".checkbox");
    const noteSelect = note.querySelector(".custom-check");
    if (mode) {
        noteSelect.classList.add("checked");
        noteSelect.addEventListener("transsitionend", () => { noteCheck.checked = true });
    } else {
        noteSelect.classList.remove("checked");
        noteCheck.checked = false;
    }
    selectedNotes.has(quickNote.id) ? noteCheck.checked = true : "";
}

function renderToolBar() {
    const selectionToolbar = document.querySelector(".toolbar-body");
    const checkBox = selectionToolbar.querySelector(".check");
    const closeBtn = selectionToolbar.querySelector(".backBtn");
    const deleteBtn = selectionToolbar.querySelector(".delete-btn");
    const selectedCount = selectionToolbar.querySelector(".selected-count");
    const size = selectedNotes.size;
    console.log(checkBox);
    selectionMode ? selectionToolbar.classList.add("visible") :
        selectionToolbar.classList.remove("visible");
    switch (size) {
        case 0: selectedCount.textContent = "No notes selected";
            break;
        case 1: selectedCount.textContent = `${ size } Note Selected`;
            break;
        default: selectedCount.textContent = `${ size } Notes Selected`
    }
    if (size === quickNotes.length) {
        checkBox.checked = true;
        checkBox.addEventListener("click", () => {
            deselectAll();
            checkBox.checked = false;
        });
    } else {
        checkBox.checked = false;
        checkBox.addEventListener("click", () => {
            selectAll();
            checkBox.checked = true;
        });
    };
    deleteBtn.addEventListener("click", () => { deleteNote() });
    closeBtn.addEventListener("click", () => { exitSelectMode() });
    initializeIcons(selectionToolbar);
}

function selectAll() {
    quickNotes.forEach(note => { selectedNotes.add(note.id) });
    renderNotes(noteData);
    renderToolBar();
}

function deselectAll() {
    selectedNotes.clear();
    renderNotes(noteData);
    renderToolBar();
}

function exitSelectMode() {
    selectionMode = false;
    selectedNotes.clear();
    renderNotes({
        container: notes,
        items: quickNotes,
        btn: addNoteBtn,
        placeholder: emptyState,
        template: noteTemplate
    });
    renderToolBar();
}

function shareNote() {
    quickNotes.forEach(note => {
        const shareData = {
            title: note.title,
            text: note.content,
            url: note.id,
        };
    });
    console.log(shareData);
}

function deleteNote() {
    selectedNotes.forEach(noteId => {
        const note = notes.querySelector(`[data-id="${ noteId }"]`);
        note.classList.add("deleted");
        note.addEventListener("transitionend", () => {
            note.remove();
            deletedNotes = quickNotes.filter(note => { selectedNotes.has(note.id) });
            quickNotes = quickNotes.filter(note => { !selectedNotes.has(note.id) });
            localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
            exitSelectMode();
            toastNotif.showToast({
                status: "success",
                message: "Note deleted successfully!",
            });
        });
    });
}

function undoDelete(items, obj, data) {
    items.push(...obj);
    localStorage.setItem("quickNotes", JSON.stringify(items));
    obj = [];
    renderNotes(data);
};

function toggleClass(item, dependency) { item.classList.toggle("reveal", dependency) };

function renderChips(chips, template, row) {
    row.replaceChildren();
    chips.forEach(chip => {
        const clone = document.importNode(template.content, true);
        const btn = clone.querySelector("button");
        const icon = clone.querySelector(".icon");
        btn.innerHTML = `
            ${ chip.label }
            <span class="icon" data-icon="${ chip.className ? "tick" : "" }"></span>`;
        chip.className ? btn.classList.add(chip.className) : "";
        btn.addEventListener("click", () => {
            chip.func();
            const activeBtn = row.querySelector(".use");
            if (activeBtn && activeBtn !== btn) {
                activeBtn.classList.remove("use");
                activeBtn.querySelector(".icon").dataset.icon = "";
            }
            btn.classList.add("use");
            icon.dataset.icon = "tick";
            initializeIcons(btn);
        });
        row.append(clone);
    });
    initializeIcons(row);
}

function displayRows() {
    toggleClass(filterRow, activeRow === "filter");
    toggleClass(sortRow, activeRow === "sort");
}

function setActiveRow(row) {
    activeRow = row;
    displayRows();
};


updateDate();
slideInX(".title");
renderNotes(noteData);
createIcons({ icons });
slideInY(".header-btn");
//undoDelete(quickNotes, deletedNotes, noteData);
renderChips(sortChips, sortTemplate, sortRow);
renderChips(filterChips, filterTemplate, filterRow);
initializeIcons(document);
setInterval(() => { updateDate() }, 1000);