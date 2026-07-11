const searchTemplate = document.querySelector("template");
const searchData = {
    array: "",
    input: "",
    container: "",
    template: "",
}

function searchBar() {
    const searchBar = searchTemplate.content.cloneNode(true);
    const searchInput = searchBar.querySelector(".search-input");
    searchInput.addEventListener("input", () => { search(searchData) });
    document.body.append(searchBar);
}

searchBar();

function search({ array, input, container, template }) {
    let searchedVal = input.value.trim().toLowerCase();
    const searched = array.filter(arr => {
        return arr.value.toLowerCase().includes(searchedVal);
    });

    render(container, searched);

    if (searched.length === 0) {
        container.innerHTML = "";
        const noResults = template.content.cloneNode(true);
        container.append(noResults);
    }
}
