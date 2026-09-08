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

// 10 Imports statements, 22 Imports, 20 In use, 17 Functions, 15 In use, 16 Personal Functions, 1 object, 2 Web Components, 1 CSS

// 5 Arrays, 1 Set, 2 Objects, 1 function-created object, 3 raw Variables

let pressTimer;
/*let currentFilter = "all";
let currentSort = "recently updated";*/
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

/*const filterChips = [
    { label: "All", func: () => { renderNotes(noteData) }, className: "use" },
    { label: "Today", func: () => { filterCreatedToday(notesInView, today, renderNotes, noteData) } },
    { label: "Yesterday", func: () => { filterCreatedYesterday(notesInView, yesterday, renderNotes, noteData) } },
    { label: "This Week", func: () => { filterThisWeek(notesInView, renderNotes, noteData) } },
    { label: "Older", func: () => { filterCreatedOlder(notesInView, today, renderNotes, noteData) } },
];*/

const filterChips = [
    { label: "All", value: `${this.label}`.toLowerCase() },
    { label: "Today", value: `${ this.label }`.toLowerCase() },
    { label: "Yesterday", value: `${ this.label }`.toLowerCase() },
    { label: "This Week", value: `${ this.label }`.toLowerCase().replaceAll(" ", "") },
    { label: "Older", value: `${ this.label }`.toLowerCase() },
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

/*filterRow.addEventListener("click", event => {
    const btn = event.target.closest("button[data-value]");
    if (!btn) return;
    selectFilter(btn.dataset.value);
});

sortRow.addEventListener("click", event => {
    const btn = event.target.closest("button[data-value]");
    if (!btn) return;
    selectSort(btn.dataset.value);
});*/

filterBtn.addEventListener("click", () => {
    //renderChips(filterChips, filterTemplate, filterRow);
    toggleClass(filterRow);
});
sortBtn.addEventListener("click", () => {
    //renderChips(sortChips, sortTemplate, sortRow);
    toggleClass(sortRow);
});

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
    const checkbox = card.querySelector(".checkbox");
    const customCheckbox = card.querySelector(".custom-check");
    const noteId = card.dataset.id;

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
    const noteSelect = note.querySelector(".checkbox");
    const noteCheck = note.querySelector(".custom-check");
    noteSelect.checked = false;
    mode ? noteSelect.classList.add("checked") : noteCheck.classList.remove("checked");
    selectedNotes.has(quickNote.id) ? noteSelect.checked = true : "";
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

function toggleClass(item) { item.classList.toggle("reveal") };

/*function applyFilter(filter) {
    currentFilter = filter;
    renderNotes(noteData);
}

function applySort(sort) {
    currentSort = sort;
    renderNotes(noteData);
}

function selectFilter(value) {
    currentFilter = value;
    renderFilterChips();
    renderNotes({ ...noteData, items: notesInView });
}

function renderChips(chips, template, row, activeValue) {
    row.replaceChildren();
    chips.forEach(chip => {
        const clone = document.importNode(template.content, true);
        const btn = clone.querySelector("button");
        const icon = clone.querySelector(".icon");
        btn.textContent = chip.label;
        btn.dataset.value = chip.value;
        const isActive = chip.value === activeValue;
        btn.classList.toggle("use", isActive);
        isActive ? icon.dataset.icon = "tick" : "";

        if (chip.value === activeValue) {
            btn.classList.add("use");
            icon.dataset.icon = "tick";
        }
        row.append(clone);
    });
    initializeIcons(row);
}*/

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

updateDate();
renderNotes(noteData);
createIcons({ icons });
//undoDelete(quickNotes, deletedNotes, noteData);
renderChips(sortChips, sortTemplate, sortRow);
renderChips(filterChips, filterTemplate, filterRow);
initializeIcons(document);
setInterval(() => { updateDate() }, 1000);