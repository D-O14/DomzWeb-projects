import { icons } from "../../../Assets/Icons/icons.js";

const steps = document.querySelectorAll("li");
const formsContainer = document.querySelector(".forms");
//const stepNum = document.querySelector(".step-num");
const stepContent = document.querySelectorAll(".step-content");
const formsTemplate = document.querySelectorAll(".form-template");
const formCompleted = document.querySelector(".form-completed");
let index = 0;

function renderForms(template, container) {
    template.forEach(template => {
        const form = template.content.cloneNode(true);
        container.append(form);
        initializeIcons();
    });
}

renderForms(formsTemplate, formsContainer);

const forms = formsContainer.querySelectorAll("form");
const submitBtn = formsContainer.querySelector(".submitBtn");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");
const dropBox = formsContainer.querySelector(".drop-box");
const input = dropBox.querySelector("input");
const nameInput = document.getElementById("name");

nxtBtn.forEach(btn => {
    btn.innerHTML += icons.chevronRight;
    btn.addEventListener("click", () => {
        index++;
        updateForm();
        progressForward();
    });
});

backBtn.forEach(btn => {
    btn.querySelector("span").innerHTML = icons.chevronLeft;
    btn.addEventListener("click", () => {
        index--;
        updateForm();
        progressBackward();
    });
});

submitBtn.addEventListener("click", () => {
    const submitted = formCompleted.content.cloneNode(true);
    formsContainer.replaceChildren(submitted);
});

function initializeIcons() {
    const svgs = document.querySelectorAll(".icon");
    svgs.forEach(svg => { svg.innerHTML = icons[svg.dataset.icon] });
}

function updateForm() {
    forms.forEach(form => {
        form.classList.remove("active");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            form.reset();
        })
    });
    forms[index].classList.add("active");
}

function progressForward() { steps[index].classList.add("active") };

function progressBackward() {
    let formNum = index + 1;
    steps[formNum].classList.remove("active");
}

function showError(input, message) {
    //const field = input.closest("label");
    const error = input.closest(".textError");
    input.classList.add("error");
    error.textContent = message;
    console.log(input);
    console.log(error);
    return false;
}

function clearError(input) { 
    //const error = input.closest(".textError");
    input.classList.remove("error");
    return true;
}

dropBox.addEventListener("click", () => { input.click() });