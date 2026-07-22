import { icons } from "../../../Assets/Icons/icons.js";

const steps = document.querySelectorAll("li");
const formsContainer = document.querySelector(".forms");
const stepNum = document.querySelector(".step-num");
const stepContent = document.querySelectorAll(".step-content");
const formsTemplate = document.querySelectorAll(".form-template");
const formCompleted = document.querySelector(".completed-template"); 
let index = 0;

function renderForms(template, container) {
    template.forEach(template => {
        const form = template.content.cloneNode(true);
        container.append(form);
    });
}

renderForms(formsTemplate, formsContainer);

const forms = formsContainer.querySelectorAll("form");
//const nameInput = document.getElementById("name");
//const label = nameInput.closest("label");
const submitBtn = formsContainer.querySelector(".submitBtn");
const nxtBtn = formsContainer.querySelectorAll(".nxtBtn");
const backBtn = formsContainer.querySelectorAll(".backBtn");
const dropBox = formsContainer.querySelector(".drop-box");
const button = dropBox.querySelector("button");
const input = dropBox.querySelector("input");
/*const icon = label.querySelector(".icon");
icon.innerHTML += icons.profile;*/


nxtBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        index++;
        updateForm();
        progressForward();
        contentChange();
    });
});

backBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        index--;
        updateForm();
        progressBackward();
        contentChange();
    });
});

/*submitBtn.addEventListener("click", () => {
    const submitted = formCompleted.content.cloneNode(true);
    formsContainer.replaceChildren(submitted);
});*/

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