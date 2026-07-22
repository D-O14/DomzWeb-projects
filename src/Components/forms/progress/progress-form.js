import { icons } from "../../../Assets/Icons/icons.js";

const steps = document.querySelectorAll("li");
const formsContainer = document.querySelector(".forms");
const stepNum = document.querySelector(".step-num");
const stepContent = document.querySelectorAll(".step-content");
const formsTemplate = document.querySelectorAll(".form-template");
const formCompleted = document.querySelector(".form-completed");
let index = 0;

function renderForms(template, container) {
    template.forEach(template => {
        const form = template.content.cloneNode(true);
        container.append(form);
        initializeIcons(container);
    });
}

renderForms(formsTemplate, formsContainer);

const link = document.querySelector("a");
const forms = formsContainer.querySelectorAll("form");
const submitBtn = formsContainer.querySelector(".submitBtn");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");
const dropBox = formsContainer.querySelector(".drop-box");
const button = dropBox.querySelector("a");
const input = dropBox.querySelector("input");

link.addEventListener("click", (e) => { e.preventDefault() });

nxtBtn.forEach(btn => {
    btn.innerHTML += icons.chevronRight;
    btn.addEventListener("click", () => {
        index++;
        updateForm();
        progressForward();
        contentChange();
    });
});

backBtn.forEach(btn => {
    btn.querySelector("span").innerHTML = icons.chevronLeft;
    btn.addEventListener("click", () => {
        index--;
        updateForm();
        progressBackward();
        contentChange();
    });
});

submitBtn.addEventListener("click", () => {
    const submitted = formCompleted.content.cloneNode(true);
    formsContainer.replaceChildren(submitted);
});

function initializeIcons(container) {
    const svgs = container.querySelectorAll(".icon");
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

function progressForward() {
    stepNum.innerHTML = index + 1;
    steps[index].classList.add("active");
}

function progressBackward() {
    let formNum = index + 1;
    stepNum.innerHTML = formNum;
    steps[formNum].classList.remove("active");
}

function contentChange() {
    stepContent.forEach(step => { step.classList.remove("active") });
    stepContent[index].classList.add("active");
}

button.onclick = () => { input.click() };