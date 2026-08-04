const searchInput = document.querySelector("input");
const rows = document.querySelectorAll("tr");

function search() {
    rows.forEach((row, index) => {
        let data = row.textContent;
        let searched = searchInput.value;
        row.classList.toggle("hide", data.indexOf(searched) < 0);
    });
};

searchInput.addEventListener("input", () => { search() });