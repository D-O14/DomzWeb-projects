const products = [
    { name: "Parfait Plate", price: 7.55, img: "/public/assets/images/cafe_items (4).jpg", category: "Fruit", tag_1: "New", tag_2: "Popular", rating: 4.65},
    { name: "Fruit Fritters", price: 2.35, img: "/public/assets/images/cafe_items (6).jpg", category: "Fruit", tag_1: "New", tag_2: "Popular", rating: 4.8},
    { name: "Strawberry Bread", price: 10.00, img: "/public/assets/images/cafe_items (7).jpg", category: "Baked", tag_1: "New", tag_2: "Popular", rating: 5.0},
    { name: "Chicken Pie", price: 12.5, img: "/public/assets/images/cafe_items (9).jpg", category: "Baked", tag_1: "Favorite", tag_2: "New", rating: 4.95},
    { name: "Coffee Cup", price: 2.16, img: "/public/assets/images/coffee.png", category: "Drink", tag_1: "Popular", tag_2: "450kcal", rating: 4.16},
    { name: "Banana Sandwich", price: 2.35, img: "/public/assets/images/pic_unsplash (6).jpg", category: "Fruit", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { name: "Cup 'O' Coffee", price: 10.00, img: "/public/assets/images/pic_unsplash (7).jpg", category: "Drink", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { name: "Mug 'O' Coffee", price: 12.5, img: "/public/assets/images/pic_unsplash (9).jpg", category: "Drink", tag_1: "Favorite", tag_2: "Popular", rating: 4.16 },
    { name: "Cheese Cake", price: 7.55, img: "/public/assets/images/pic_unsplash (4).jpg", category: "Pastry", tag_1: "New", tag_2: "New", rating: 3.76 },
    { name: "Salad", price: 2.35, img: "/public/assets/images/pic_unsplash (5).jpg", category: "Healthy", tag_1: "Popular", tag_2: "500kcal", rating: 4.8 },
    { name: "Cocktail", price: 10.00, img: "/public/assets/images/pic_unsplash (2).jpg", category: "Drink", tag_1: "New", tag_2: "Popular", rating: 4.86 },
    { name: "Pancakes", price: 12.5, img: "/public/assets/images/pic_unsplash (3).jpg", category: "Breakfast", tag_1: "Favorite", tag_2: "700kcal", rating: 4.7 },
];

const cardSection = document.querySelector(".cards");
const searchBox = document.querySelector(".search");
const resultBox = document.querySelector(".results");
const resCard = document.querySelector(".resCardTemp");
const loader = document.querySelector(".loader");
const empty = document.querySelector(".empty");
const cancel = document.querySelector(".cancel");
const cardTemplate = document.querySelector("#cardTemplate");

searchBox.addEventListener("focus", () => {
    const box = searchBox.closest(".box");
    box.classList.add("focus");
    resultBox.classList.add("active");
    const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("url", "/search");
    history.replaceState({}, "", `?${ myUrl.toString() }`);
})

function renderCards(items) {
    cardSection.innerHTML = "";
    items.forEach(item => {
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector(".name").textContent = `${ item.name }`;
        card.querySelector(".price").textContent = `$${ item.price }`;
        card.querySelector(".img").src = `${ item.img }`;
        card.querySelector(".category").textContent = `${ item.category }`;
        card.querySelector(".tag_1").textContent = `${ item.tag_1 }`;
        card.querySelector(".tag_2").textContent = `${ item.tag_2 }`;
        card.querySelector(".rating").innerHTML += `${ item.rating }`;

        cardSection.append(card);
    })

}

renderCards(products);

function loadResults(items) {
    resultBox.innerHTML = "";
    items.forEach(item => {
        /*const results = resCard.content.cloneNode(true);
        results.querySelector(".img").src = `${ item.img }`;
        results.querySelector(".name").textContent = `${ item.name }`;
        results.querySelector(".price").textContent = `$${ item.price }`;
        results.querySelector(".category").textContent = `${ item.category }`;
        resultBox.append(results);*/
    });
}

loadResults(products);


function searchProducts(items) {
    let searchedVal = searchBox.value.toLowerCase();
    const searchedRes = items.filter(item => {
        return item.name.toLowerCase().startsWith(searchedVal) || item.name.toLowerCase().includes(searchedVal);
    });

    loadResults(searchedRes);

    const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("search", searchedVal);
    history.replaceState({}, "", `?${ myUrl.toString() }`);

    if (searchedRes.length === 0) {
        resultBox.innerHTML = "";
        const emptyState = empty.content.cloneNode(true);
        resultBox.append(emptyState);
    };
}

let timeout;
searchBox.addEventListener("input", (e) => {
    clearTimeout(timeout);
    loader.classList.add("loading");
    timeout = setTimeout(() => {
        searchProducts(products);
        loader.classList.remove("loading");
    }, 1000);

    searchBox.value.trim() === "" ? cancel.classList.remove("visible") : cancel.classList.add("visible");
});

cancel.addEventListener("click", () => {
    searchBox.value = "";
    loadResults(products);
})

document.addEventListener("keydown", (e) => {
    if (e.key === "/" && e.ctrlKey) {
        searchBox.focus();
    }
})