const body = document.body;
const nav = document.querySelector("nav");
const cards = document.querySelector(".cards");
const cardSection = document.querySelector(".cards-section");
const searchTemplate = document.querySelector(".searchTemplate");
const cardTemplate = document.querySelector(".cardTemplate");
const noResTemplate = document.querySelector(".noResults");

products = [
    {name: "Shawarma", price: 10, img: "food (1).jpg"},
    {name: "Tikki Mursala", price: 12, img: "food (2).jpg"},
    {name: "Beef stew", price: 15, img: "food (3).jpg"},
]

function render(container, array) {
    container.innerHTML = "";
    array.forEach(arr => {
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector("img").src = arr.img; 
        card.querySelector("h1").textContent = arr.name;
        card.querySelector(".price").textContent = `$${arr.price}`;
        container.append(card);
    });
}

render(cards, products);

function searchBar(template, container) {
    const searchBar = template.content.cloneNode(true);
    const searchInput = searchBar.querySelector(".search-input");
    searchInput.addEventListener("input", () => { search(searchData) });
    container.append(searchBar);
}

searchBar(searchTemplate, nav);

const searchInput = body.querySelector(".search-input");
const searchData = {
    array: products,
    input: searchInput,
    container: cards,
}

function search({ array, input, container }) {
    let searchedVal = input.value.trim().toLowerCase();
    const searched = array.filter(arr => {
        return arr.name.toLowerCase().startsWith(searchedVal);
    });

    render(container, searched);

    if (searched.length === 0) {
        container.innerHTML = "";
        const noResults = noResTemplate.content.cloneNode(true);
        container.append(noResults);
    }
}

search(searchData);