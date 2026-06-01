/*const products = [
    { id: crypto.randomUUID(), name: "Parfait Plate", price: 7.55, img: "/public/assets/images/cafe_products (4).jpg", category: "Fruit", tag_1: "New", tag_2: "Popular", rating: 4.65},
    { id: crypto.randomUUID(), name: "Fruit Fritters", price: 2.35, img: "/public/assets/images/cafe_products (6).jpg", category: "Fruit", tag_1: "New", tag_2: "Popular", rating: 4.8},
    { id: crypto.randomUUID(), name: "Strawberry Bread", price: 10.00, img: "/public/assets/images/cafe_products (7).jpg", category: "Baked", tag_1: "New", tag_2: "Popular", rating: 5.0},
    { id: crypto.randomUUID(), name: "Chicken Pie", price: 12.5, img: "/public/assets/images/cafe_products (9).jpg", category: "Baked", tag_1: "Favorite", tag_2: "New", rating: 4.95},
    { id: crypto.randomUUID(), name: "Coffee Cup", price: 2.16, img: "/public/assets/images/coffee.png", category: "Drink", tag_1: "Popular", tag_2: "450kcal", rating: 4.16},
    { id: crypto.randomUUID(), name: "Banana Sandwich", price: 2.35, img: "/public/assets/images/pic_unsplash (6).jpg", category: "Fruit", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { id: crypto.randomUUID(), name: "Cup 'O' Coffee", price: 10.00, img: "/public/assets/images/pic_unsplash (7).jpg", category: "Drink", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { id: crypto.randomUUID(), name: "Mug 'O' Coffee", price: 12.5, img: "/public/assets/images/pic_unsplash (9).jpg", category: "Drink", tag_1: "Favorite", tag_2: "Popular", rating: 4.16 },
    { id: crypto.randomUUID(), name: "Cheese Cake", price: 7.55, img: "/public/assets/images/pic_unsplash (4).jpg", category: "Pastry", tag_1: "New", tag_2: "New", rating: 3.76 },
    { id: crypto.randomUUID(), name: "Salad", price: 2.35, img: "/public/assets/images/pic_unsplash (5).jpg", category: "Healthy", tag_1: "Popular", tag_2: "500kcal", rating: 4.8 },
    { id: crypto.randomUUID(), name: "Cocktail", price: 10.00, img: "/public/assets/images/pic_unsplash (2).jpg", category: "Drink", tag_1: "New", tag_2: "Popular", rating: 4.86 },
    { id: crypto.randomUUID(), name: "Pancakes", price: 12.5, img: "/public/assets/images/pic_unsplash (3).jpg", category: "Breakfast", tag_1: "Favorite", tag_2: "700kcal", rating: 4.7 },
];*/

const cardSection = document.querySelector(".cards");
const searchBox = document.querySelector(".search");
const resultBox = document.querySelector(".results");
const resCard = document.querySelector("#resCardTemp");
const loader = document.querySelector(".loader");
const empty = document.querySelector(".empty");
const cancel = document.querySelector(".cancel");
const cardTemplate = document.querySelector("#cardTemplate");
const filterBtn = document.querySelectorAll(".filterBtn");
const filters = document.querySelector(".filters");
const filter = document.querySelector(".filter");

let products = [];
let searchedProducts = [];

filter.addEventListener("click", () => {
    filters.classList.add("open");
});

filterBtn.forEach(filter => {
    filter.addEventListener("click", () => {
        filter.classList.add("filtered");
    })
})

searchBox.addEventListener("focus", () => {
    const box = searchBox.closest(".box");
    box.classList.add("focus");
    resultBox.classList.add("active");
    cardSection.classList.add("blur");
    /*const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("url", "/search");
    history.replaceState({}, "", `/${ myUrl.toString() }`);*/
})

searchBox.addEventListener("blur", () => {
    resultBox.classList.remove("active");
})

function renderCards(products) {
    cardSection.innerHTML = "";
    products.forEach(product => {
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector(".name").textContent = `${ product.title }`;
        card.querySelector(".price").textContent = `$${ product.price }`;
        card.querySelector(".img").src = `${ product.thumbnail }`;
        card.querySelector(".desc").textContent = `${product.description}`
        /*card.querySelector(".category").textContent = `${ product.category }`;
        card.querySelector(".tag_1").textContent = `${ product.tag_1 }`;
        card.querySelector(".tag_2").textContent = `${ product.tag_2 }`;
        card.querySelector(".rating").innerHTML += `${ product.rating }`;*/

        cardSection.append(card);
    })

}

const productAPI = 'https://dummyjson.com/products';
async function getProducts() {
    try {
        const res = await fetch(productAPI);
        if (!res.ok) {
            throw new Error("Fetch Failed");
        }
        const data = await res.json();
        products = data.products;
        searchedProducts = products;
        renderCards(products);
        loadResults(products);
        localStorage.setItem("products", JSON.stringify(products));
        
    } catch (error) {
        console.log(error);
        /*setTimeout(() => {
            showToast("failure", "Oops! Failed to fetch products");
        }, 3200);*/
    } finally {
        console.log("Fetch Complete");
        /*setTimeout(() => {
            showToast("success", "Fetch Complete");
        }, 3500);*/
    }
}

getProducts();

function loadResults(items) {
    resultBox.innerHTML = "";
    items.forEach(item => {
        const results = resCard.content.cloneNode(true);
        results.querySelector(".resCard").dataset.id = `${ item.id }`;
        results.querySelector(".img").src = `${ item.thumbnail }`;
        results.querySelector(".product-name").textContent = `${ item.title }`;
        results.querySelector(".res-price").textContent = `$${ item.price }`; 
        results.querySelector(".description").textContent = `${ item.description }`; 
        //results.querySelector(".res-category").textContent = `${ product.category }`;
        resultBox.append(results);
    });
}


function searchProducts(products) {
    let searchedVal = searchBox.value.toLowerCase();
    const searchedRes = products.filter(product => {
        return product.title.toLowerCase().startsWith(searchedVal) || product.title.toLowerCase().includes(searchedVal);
    });

    loadResults(searchedRes);

    /*const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("search", searchedVal);
    history.replaceState({}, "", `?${ myUrl.toString() }`);*/

    if (searchedRes.length === 0) {
        resultBox.innerHTML = "";
        const emptyState = empty.content.cloneNode(true);
        resultBox.append(emptyState);
    };
}

resultBox.addEventListener("click", (e) => {
    const card = e.target.closest(".resCard");
    if (!card) return;
    const id = card.dataset.id;
    const category = card.querySelector(".res-category").textContent;
    const state = history.replaceState({}, "", `/product=${ id }&category=${ category }`);
    const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("searched", state);
})

let timeout;
searchBox.addEventListener("input", (e) => {
    clearTimeout(timeout);
    loader.classList.add("loading");
    timeout = setTimeout(() => {
        searchProducts(searchedProducts);
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