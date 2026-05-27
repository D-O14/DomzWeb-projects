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
const filterBtn = document.querySelector("button");
const searchInput = document.querySelector("input");
const filter = document.querySelector(".filter");
const menu = document.querySelector(".menu");
const buttons = document.querySelectorAll(".filterBtn");

function renderCards(items) {
    let cards = "";
    items.map(item => {
        cards += `
        <article class="card">
            <div class="card-header">
                <img src="${item.img}" alt="Decorative Image" class="img">
                <span class="category">${item.category}</span>
                <div class="options">
                    <button class="likeBtn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon heart">
                            <path
                                d="M12 8.81056L13.6352 6.48845C14.2721 5.58412 15.3179 5 16.5 5C18.433 5 20 6.567 20 8.5C20 11.3788 18.0407 14.1215 15.643 16.3358C14.4877 17.4027 13.3237 18.2603 12.4451 18.8521C12.2861 18.9592 12.1371 19.0571 11.9999 19.1456C11.8627 19.0571 11.7137 18.9592 11.5547 18.8521C10.6761 18.2604 9.51216 17.4028 8.35685 16.3358C5.95926 14.1216 4 11.3788 4 8.5C4 6.567 5.567 5 7.5 5C8.68209 5 9.72794 5.58412 10.3648 6.48845L12 8.81056ZM10.5557 3.92626C9.68172 3.3412 8.63071 3 7.5 3C4.46243 3 2 5.46243 2 8.5C2 16 11.9999 21.4852 11.9999 21.4852C11.9999 21.4852 22 16 22 8.5C22 5.46243 19.5376 3 16.5 3C15.3693 3 14.3183 3.3412 13.4443 3.92626C12.8805 4.3037 12.3903 4.78263 12 5.33692C11.6097 4.78263 11.1195 4.3037 10.5557 3.92626Z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="card-content">
                <div class="tags">
                    <span class="tag">${item.tag_1}</span>
                    <span class="tag">${item.tag_2}</span>
                    <span class="rating">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon star">
                            <path
                                d="M11.9998 17L6.12197 20.5902L7.72007 13.8906L2.48926 9.40983L9.35479 8.85942L11.9998 2.5L14.6449 8.85942L21.5104 9.40983L16.2796 13.8906L17.8777 20.5902L11.9998 17Z">
                            </path>
                        </svg>
                        ${item.rating}
                    </span>
                </div>
                <div class="specs">
                    <h1 class="name">${item.name}</h1>
                    <span class="price">$${item.price}</span>
                </div>

                <p class="desc">
                    Creamy iced coffee with cocoa foam made from pure, fresh, imported cocoa beans.
                </p>

                <menu class="specs">
                    <button class="cartBtn" aria-label="Add To Cart Button">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none"
                            class="icon cart">
                            <path
                                d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z">
                            </path>
                        </svg>
                        <span>Add To Cart</span>
                    </button>
                </menu>
            </div>
        </article>`
    }).join("");

    cardSection.innerHTML = cards;
}

renderCards(products);

filter.addEventListener("click", () => { menu.classList.toggle("open") });

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

