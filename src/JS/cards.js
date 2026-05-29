const products = [
    { name: "Parfait Plate", price: 7.55, img: "/public/assets/images/cafe_items (4).jpg", category: "Fruity", tag_1: "New", tag_2: "Popular", rating: 4.65},
    { name: "Fruit Fritters", price: 2.35, img: "/public/assets/images/cafe_items (6).jpg", category: "Fruity", tag_1: "New", tag_2: "Popular", rating: 4.8},
    { name: "Strawberry Bread", price: 10.00, img: "/public/assets/images/cafe_items (7).jpg", category: "Baked", tag_1: "New", tag_2: "Popular", rating: 5.0},
    { name: "Chicken Pie", price: 12.5, img: "/public/assets/images/cafe_items (9).jpg", category: "Baked", tag_1: "Favorite", tag_2: "New", rating: 4.95},
    { name: "Coffee Cup", price: 2.16, img: "/public/assets/images/coffee.png", category: "Drink", tag_1: "Popular", tag_2: "450kcal", rating: 4.16},
    { name: "Banana Sandwich", price: 2.35, img: "/public/assets/images/pic_unsplash (6).jpg", category: "Fruity", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { name: "Cup 'O' Coffee", price: 10.00, img: "/public/assets/images/pic_unsplash (7).jpg", category: "Drink", tag_1: "Popular", tag_2: "New", rating: 4.16 },
    { name: "Mug 'O' Coffee", price: 12.5, img: "/public/assets/images/pic_unsplash (9).jpg", category: "Drink", tag_1: "Favorite", tag_2: "Popular", rating: 4.16 },
    { name: "Cheese Cake", price: 7.55, img: "/public/assets/images/pic_unsplash (4).jpg", category: "Pastry", tag_1: "New", tag_2: "New", rating: 3.76 },
    { name: "Salad", price: 2.35, img: "/public/assets/images/pic_unsplash (5).jpg", category: "Healthy", tag_1: "Popular", tag_2: "500kcal", rating: 4.8 },
    { name: "Cocktail", price: 10.00, img: "/public/assets/images/pic_unsplash (2).jpg", category: "Drink", tag_1: "New", tag_2: "Popular", rating: 4.86 },
    { name: "Pancakes", price: 12.5, img: "/public/assets/images/pic_unsplash (3).jpg", category: "Breakfast", tag_1: "Favorite", tag_2: "700kcal", rating: 4.7 },
];

const cardSection = document.querySelector(".cards");
/*const filterBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
const filter = document.querySelector(".filter");
const menu = document.querySelector(".menu");
const buttons = document.querySelectorAll(".filterBtn");
*/
const cardTemplate = document.querySelector("template");


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

/*filter.addEventListener("click", () => { menu.classList.toggle("open") });

buttons.forEach(button => {
    button.addEventListener("click", () => {
        filterBtn.textContent = button.textContent;
        menu.classList.remove("open");

        buttons.forEach(button => {
            button.classList.remove("active");
        })

        button.classList.add("active");
    })
})

menu.addEventListener("click", e => {
    const button = e.target.closest("button");
    const filter = button.dataset.filter;
    if (!button) return;

    if (filter === "cheap") {
        const filtered = products.filter(product => {
            return product.price < 10;
        })
        console.log(filter, filtered)
        renderCards(filtered);
    } else if (filter === "new") {
        const filtered = products.filter(product => {
            return product.tag_1 === "New";
        })
        console.log(filter, filtered)
        renderCards(filtered);
    } else if (filter === "rated") {
        const filtered = products.filter(product => {
            return product.tag_1 === "New";
        })
        console.log(filter, filtered)
        renderCards(filtered);
    } else if (filter === "expensive") {
        const filtered = products.filter(product => {
            return product.price >= 10;
        })
        console.log(filter, filtered)
        renderCards(filtered);
    } else if (filter === "popular") {
        const filtered = products.filter(product => {
            return product.tag_1 === "Popular";
        })
        console.log(filter, filtered)
        renderCards(filtered);
    }
})

function searchProducts(value) {
    let arr = [];
    let searchedVal = searchInput.value.toLowerCase();
    const searchedCards = products.filter(product => {
        return product.name.toLowerCase().startsWith(searchedVal) && product.name.toLowerCase().includes(searchedVal);
    });    

    renderCards(searchedCards);
}

let timeout;
searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        searchProducts(e.target.value);
    }, 500)
});
*/
