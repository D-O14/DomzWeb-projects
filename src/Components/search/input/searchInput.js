const searchTemplate = document.querySelector("template");
const noResults = document.querySelector(".noResults");

function searchBar() {
    const searchBar = searchTemplate.content.cloneNode(true);
    const searchInput = searchBar.querySelector(".search-input");
    searchInput.addEventListener("input", () => { search(searchData) });
    document.body.append(searchBar);
}

searchBar();

const searchInput = document.querySelector(".search-input");
const body = document.body;

const searchData = {
    array: "",
    input: searchInput,
    container: body,
    template: noResults,
}

function search({ array, input, container, template }) {
    let searchedVal = input.value.trim().toLowerCase();
    const searched = array.filter(arr => {
        return arr.name.toLowerCase().startsWith(searchedVal);
    });

    render(body, searched);

    if (searched.length === 0) {
        container.innerHTML = "";
        const noResults = template.content.cloneNode(true);
        container.append(noResults);
    }
}