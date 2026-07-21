const submitBtn = document.querySelector(".submitBtn");
const nextBtn = document.querySelectorAll(".nextBtn");
const backBtn = document.querySelectorAll(".backBtn");
const mainForm = document.querySelectorAll(".main");
const steps = document.querySelectorAll("li");
const stepContent = document.querySelectorAll(".step-content");
const stepNum = document.querySelector(".step-num");
const dropArea = document.querySelector(".drop-box");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
let index = 0;

nextBtn.forEach(btn => {
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
        progressBackward()
        contentChange();
    });
});

function updateForm() {
    mainForm.forEach(main => { main.classList.remove("active") });
    mainForm[index].classList.add("active");
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
    stepContent.forEach(step => {
        step.classList.remove("active");
        step.classList.add("d-none");
    });
    stepContent[index].classList.remove("d-none");
    stepContent[index].classList.add("active");
}

button.onclick = () => { input.click() };