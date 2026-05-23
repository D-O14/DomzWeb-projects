const menu = document.querySelector("article");
const select = document.querySelector(".select");
const ul = document.querySelector("ul");
const searchInput = document.querySelector("input");

let countries = ["Afghanistan", "Algeria", "Argentina", "Australia", "Bangladesh", "Belgium", "Bhutan", "Brazil", "Canada",
    "China", "Denmark", "Ethiopia", "Finland", "France", "Germany", "Hungary", "Iceland", "India", "Ireland", "Indonesia", "Iran", "Italy",
    "Japan", "Malaysia", "Maldives", "Mexico", "Morocco", "Nepal", "Netherlands", "Nigeria", "Norway", "Pakistan", "Peru", "Russia",
    "Romania", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Uganda", "Ukraine", "United States",
    "United Kingdom", "Vietnam"
];

let countries = new Set(countries);

function renderCountry(array) {
    let lists = "";
    array.forEach(array => {
        lists += `<li onclick="updateName(this)">${ array }</li>`;
    });

    ul.innerHTML = lists;
}

renderCountry(countries);


function updateName(selected) { 
    menu.classList.toggle("active");
    select.firstElementChild.textContent = selected.innerHTML;
}

searchInput.addEventListener("keyup", () => {
    let arr = [];
    let searchedVal = searchInput.value.toLowerCase();
    const filteredCountries = countries.filter(country => {
        return country.toLowerCase().startsWith(searchedVal) || country.toLowerCase().includes(searchedVal);
    })
    
    renderCountry(filteredCountries);
})

select.addEventListener("click", () => {
    menu.classList.toggle("active");
})
