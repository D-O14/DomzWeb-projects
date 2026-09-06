import "@components/toast/toast.js";
import "./notes_app.css";
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

let pressTimer;
let deletedNotes = [];
let selectionMode = false;
let selectedNotes = new Set();
let quickNotes = JSON.parse(localStorage.getItem("quickNotes")) || [];
const now = new Date().toISOString().slice(0, 10);
const today = now;
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const viewedNotes = [...quickNotes];

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
const searchTemplate = document.getElementById("noResults");
const searchComponent = document.querySelector("search-input");
const sortRow = document.querySelector(".sort-row");
const sortTemplate = document.getElementById("sortTemplate");
const filterTemplate = document.getElementById("filterTemplate");
const filterRow = document.querySelector(".filter-row");
const filterBtn = document.getElementById("filterBtn");
const sortBtn = document.getElementById("sortBtn");

const noteData = {
    container: notes,
    items: quickNotes,
    btn: addNoteBtn,
    placeholder: emptyState,
    template: noteTemplate
}

const sortChips = [
    { label: "Recently Updated", func: () => { sortUpdated(viewedNotes, "updatedAt", renderNotes, noteData) }, className: "use" },
    { label: "Newest First", func: () => { sortNewest(viewedNotes, "createdAt", renderNotes, noteData) } },
    { label: "Oldest First", func: () => { sortOldest(viewedNotes, "createdAt", renderNotes, noteData) } },
    { label: "Title A-Z", func: () => { sortA_Z(viewedNotes, "title", renderNotes, noteData) } },
    { label: "Title Z-A", func: () => { sortZ_A(viewedNotes, "title", renderNotes, noteData) } },
];

const filterChips = [
    { label: "All", func: () => { renderNotes(noteData) }, className: "use" },
    { label: "Today", func: () => { filterCreatedToday(viewedNotes, today, renderNotes, noteData) } },
    { label: "Yesterday", func: () => { filterCreatedYesterday(viewedNotes, yesterday, renderNotes, noteData) } },
    { label: "This Week", func: () => { filterThisWeek(viewedNotes, renderNotes, noteData) } },
    { label: "Older", func: () => { filterCreatedOlder(viewedNotes, today, renderNotes, noteData) } },
];
filterBtn.addEventListener("click", () => { toggleClass(filterRow) });
sortBtn.addEventListener("click", () => { toggleClass(sortRow) });

function renderChips(chips, template, row) {
    chips.forEach(chip => {
        const clone = template.content.cloneNode(true);
        const btn = clone.querySelector("button");
        if (chip.className) {
            btn.innerHTML =
                `${ chip.label }
        <span class="icon" data-icon="tick"></span>`;
            btn.classList.add(chip.className)
        } else {
            btn.innerHTML =
                `${ chip.label }
        <span class="icon" data-icon=""></span>`;
        }
        btn.addEventListener("click", () => {
            chip.func();
            const activeBtn = row.querySelector(".use");
            const activeIcon = activeBtn.querySelector(".icon");
            const icon = btn.querySelector(".icon");
            applyState(activeIcon, true, "");
            applyState(icon, false, "tick");
            activeBtn.classList.remove("use");
            btn.classList.add("use");
            initializeIcons(btn);
        });
        initializeIcons(row);
        row.append(clone);
    });
}

function toggleClass(item) { item.classList.toggle("reveal") };

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
            placeholder: searchTemplate,
            template: noteTemplate
        });
    };*/
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
    const editBtn = e.target.closest(".editBtn");
    const copyBtn = e.target.closest(".copyBtn");
    if (copyBtn) { copy(content.textContent, toastNotif) };
    if (editBtn) { editNote(editBtn, quickNotes) };
});

notes.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    const card = e.target.closest(".note-card");
    const checkbox = card.querySelector(".checkbox");
    const customCheckbox = card.querySelector(".custom-check");
    const noteId = card.dataset.id;
    if (!card) return;
    pressTimer = setTimeout(() => {
        customCheckbox.classList.add("checked");
        customCheckbox.addEventListener("transitionend", () => {
            checkbox.checked = true;
        }, { once: true });
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
    const toolbarView = document.querySelector(".toolbar-view");
    const selectAllBtn = toolbarView.querySelector(".select-all");
    const selectedCount = toolbarView.querySelector(".selected-count");
    const closeBtn = toolbarView.querySelector(".toolbar-close");
    const deleteBtn = toolbarView.querySelector(".delete");
    if (selectionMode) {
        toolbarView.classList.add("visible");
    } else {
        toolbarView.classList.remove("visible");
    };
    selectedCount.textContent = `${ selectedNotes.size }`;
    selectAllBtn.textContent =
        selectedNotes.size === quickNotes.length
            ? `Deselect All (${ selectedNotes.size })`
            : `Select All (${ quickNotes.length })`;
    if (selectedNotes.size === quickNotes.length) {
        selectAllBtn.addEventListener("click", () => { deselectAll() });
    } else {
        selectAllBtn.addEventListener("click", () => { selectAll() });
    };
    deleteBtn.addEventListener("click", () => { deleteNote() });
    closeBtn.addEventListener("click", () => { exitSelectMode() });
    initializeIcons(toolbarView);
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

function undoDelete() {
    quickNotes.push(...deletedNotes);
    localStorage.setItem("quickNotes", JSON.stringify(quickNotes));
    deletedNotes = [];
    renderNotes(noteData);
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
            noteDate.dataset.createdAt = quickNote.createdAt;
            noteDate.textContent = relativeTime(quickNote.updatedAt);
            if (quickNote.title === "") {
                quickNote.title = "Untitled Note";
                noteTitle.textContent = "Untitled Note";
            } else { noteTitle.textContent = quickNote.title };
            note.querySelector(".note-content").textContent = quickNote.content;
            noteCard.dataset.id = quickNote.id;
            checkbox.id = quickNote.id;
            if (selectionMode) {
                customCheckbox.classList.add("checked");
            } else {
                customCheckbox.classList.remove("checked");
                checkbox.checked = false;
            };
            if (selectedNotes.has(quickNote.id)) { checkbox.checked = true };
            container.append(note);
            initializeIcons(noteCard);
        });
    }
}

updateDate();
renderNotes(noteData);
createIcons({ icons });
renderChips(sortChips, sortTemplate, sortRow);
renderChips(filterChips, filterTemplate, filterRow);
initializeIcons(document);
setInterval(() => { updateDate() }, 1000);