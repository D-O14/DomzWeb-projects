import { icons } from "../../Assets/Icons/icons";

//const dropZone = document.querySelector(".drop-zone");
const input = document.querySelector("input");

/*dropZone.addEventListener("click", () => {
    input.click()
});*/

input.addEventListener("change", () => {
    for (const file of input.files) {
        if (file.size > 30000) {
            console.log(`${ file.name } is too big! Max is 500kb`);
            console.log(file.size);
        }
    }
})

/*function initializeIcons() {
    const svgs = document.querySelectorAll(".icon");
    svgs.forEach(svg => { svg.innerHTML = icons[svg.dataset.icon] });
};

initializeIcons();*/