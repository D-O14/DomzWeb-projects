const submitBtn = document.querySelector(".submitBtn");
const nextBtn = document.querySelectorAll(".nextBtn");
const backBtn = document.querySelectorAll(".backBtn");
const mainForm = document.querySelectorAll(".main");
const steps = document.querySelectorAll("li");
const stepNum = document.querySelectorAll(".step-num");
const dropArea = document.querySelector(".drop-box");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("input");
const stepNumContent = document.querySelectorAll(".steps-content");
let index = 0;

nextBtn.forEach(function(nextBtnForm){
    nextBtnForm.addEventListener("click", () => {
        index++;
        updateForm();
        progressForward();
        contentChange();
    })
});

backBtn.forEach(function (backBtnForm) {
    backBtnForm.addEventListener("click", () => {
        index--;
        updateForm();
        progressBackward()
        contentChange();
    })
});

function updateForm() {
    mainForm.forEach(main => {
        main.classList.remove("active");
    })
    mainForm[index].classList.add("active");
}

function progressForward() {
    stepNum.innerHTML = index+1;
    steps[index].classList.add("active");
}

function progressBackward() {
    let formNum = index + 1;
    steps[formNum].classList.remove("active");
    stepNum.innerHTML = formNum;
}

function contentChange() {
    stepNumContent.forEach(function (content) {
        content.classList.remove("active");
        content.classList.add("d-none");
    });
    stepNumContent[index].classList.add("active")
}

button.onclick = () => {
    input.click();
}