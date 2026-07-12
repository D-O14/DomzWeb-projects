const body = document.body;
const nav = document.querySelector("nav");
const searchTemplate = document.querySelector(".searchTemplate");
//const noResTemplate = document.querySelector(".noResults");

products = [
    { name: "Shawarma", price: 10, img: "food (1).jpg" },
    { name: "Tikki Mursala", price: 12, img: "food (2).jpg" },
    { name: "Beef stew", price: 15, img: "food (3).jpg" },
    { name: "Cheese burger", price: 15, img: "pic_unsplash (3).jpg" },
    { name: "Ham Sandwich", price: 15, img: "pic_unsplash (4).jpg" },
    { name: "Chicken Salad", price: 15, img: "pic_unsplash (6).jpg" },
]

function searchComponent(template, container) {
    const searchComponent = template.content.cloneNode(true);
    const searchInput = searchComponent.querySelector(".search-input");
    const searchDropdown = searchComponent.querySelector(".search-dropdown");
    searchInput.addEventListener("input", () => { search(searchData) });
    container.append(searchComponent);
}

searchComponent(searchTemplate, nav);

const searchInput = body.querySelector(".search-input");
const searchDropdown = body.querySelector(".search-dropdown");

const searchData = {
    array: products,
    input: searchInput,
    container: searchDropdown,
}

const searchBox = body.querySelector(".search-dropdown");
const dropdownTemplate = searchBox.querySelector(".dropdown-template");
function render(container, array) {
    container.innerHTML = "";
    array.forEach(arr => {
        const dropdown = dropdownTemplate.content.cloneNode(true);
        dropdown.querySelector("img").img = arr.img;
        dropdown.querySelector(".name").textContent = arr.name;
        dropdown.querySelector(".price").textContent = `$${ arr.price }`;
        container.append(dropdown);
    });
}

render(searchDropdown, products);

function search({ array, input, container }) {
    let searchedVal = input.value.trim().toLowerCase();
    const searched = array.filter(arr => {
        return arr.name.toLowerCase().startsWith(searchedVal);
    });

    render(container, searched);

    /*if (searched.length === 0) {
        container.innerHTML = "";
        const noResults = noResTemplate.content.cloneNode(true);
        container.append(noResults);
    }*/
}

search(searchData);