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
const skeleton = document.querySelector(".skeleton");
const toast = document.createElement("div");

let products = [];
let searchedProducts = [];
let wasOffline = false;

/*window.addEventListener("offline", () => {
    wasOffline = true;
    showToast("warning", "You are offline");
})

window.addEventListener("online", () => {
    if (wasOffline) {
        showToast("success", "Connection Restored")
    }

    wasOffline = false;
    getProducts();
});*/

filter.addEventListener("click", () => {
    filters.classList.toggle("open");
});

filterBtn.forEach(filter => {
    filter.addEventListener("click", () => {
        filter.classList.toggle("filtered");
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
    cardSection.classList.remove("blur");
})

function renderCards(products) {
    cardSection.innerHTML = "";
    products.forEach(product => {
        const card = cardTemplate.content.cloneNode(true);
        card.querySelector(".name").textContent = `${ product.title }`;
        card.querySelector(".price").textContent = `$${ product.price }`;
        card.querySelector(".img").src = `${ product.thumbnail }`;
        card.querySelector(".desc").textContent = `${ product.description }`
        card.querySelector(".category").textContent = `${ product.category }`;
        card.querySelector(".tag_1").textContent = `${ product.tags[0] }`;
        card.querySelector(".tag_2").textContent = `${ product.tags[1] }`;
        card.querySelector(".rating").innerHTML += `${ product.rating }`;

        cardSection.append(card);
    })

}

const productAPI = 'https://dummyjson.com/products';
async function getProducts() {
    showSkeleton();
    try {
        const cachedProducts = JSON.parse(localStorage.getItem("products"));
        if (cachedProducts) {
            renderCards(cachedProducts);
            loadResults(cachedProducts);
            console.log("Getting Cached Products")
            return;
        };

        const res = await fetch(productAPI);
        if (!res.ok) {
            throw new Error("Fetch Failed");
        }

        const data = await res.json();
        products = data.products;
        searchedProducts = products;
        localStorage.setItem("products", JSON.stringify(products));
        renderCards(products);
        loadResults(products);

    } catch (error) {
        console.log(error);
    } finally {
        console.log("Fetch Complete");
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
        results.querySelector(".res-category").textContent = `${ item.category }`;
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

/*resultBox.addEventListener("click", (e) => {
    const card = e.target.closest(".resCard");
    if (!card) return;
    const id = card.dataset.id;
    const category = card.querySelector(".res-category").textContent;
    const state = history.replaceState({}, "", `/product=${ id }&category=${ category }`);
    const myUrl = new URLSearchParams(window.location.search);
    myUrl.set("searched", state);
})*/

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
});

let warningIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-warning"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>`
let failureIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-failure"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`;
let successIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
fill="currentColor" class="icon icon-check">
<path stroke="none" d="M0 0h24v24H0z" fill="none" />
<path
    d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
</svg>`;

function showToast(type, msg) {
    toast.className = "toast";
    toast.classList.add(type);
    toast.setAttribute("role", "alert")
    toast.innerHTML = `
    ${ type === "warning" ? warningIcon : type === "failure" ? failureIcon : successIcon }
    <div class="toast-content">
        <p class="toastText">${ msg }</p>
    </div>
        `;
    document.body.prepend(toast)

    setTimeout(() => {
        toast.classList.add("close");
    }, 3000);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}

function showSkeleton() {
    cardSection.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const skeletonScreen = skeleton.content.cloneNode(true);
        cardSection.append(skeletonScreen);
    };
};