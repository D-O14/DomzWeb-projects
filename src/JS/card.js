const products = [
    { name: "Parfait Plate", price: 7.55, img: "/public/assets/images/cafe_items (4).jpg", category: "Combo", tag_1: "New", tag_2: "Popular" },
    { name: "Fruit Fritters", price: 2.35, img: "/public/assets/images/cafe_items (6).jpg", category: "Pastry", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Strawberry Bread", price: 10.00, img: "/public/assets/images/cafe_items (7).jpg", category: "Baked", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Chicken Pie", price: 12.5, img: "/public/assets/images/cafe_items (9).jpg", category: "Dish", tag_1: "Favorite", tag_2: "Most Ordered" },
    { name: "Cold Coffee", price: 2.16, img: "/public/assets/images/coffee.png", category: "Coffee", tag_1: "Best", tag_2: "Popular" },
    { name: "Banana Sandwich", price: 2.35, img: "/public/assets/images/pic_unsplash (6).jpg", category: "Combo", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Cup 'O' Coffee", price: 10.00, img: "/public/assets/images/pic_unsplash (7).jpg", category: "Coffee", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Mug 'O' Coffee", price: 12.5, img: "/public/assets/images/pic_unsplash (9).jpg", category: "Coffee", tag_1: "Favorite", tag_2: "Most Ordered" },
    { name: "Cheese Cake", price: 7.55, img: "/public/assets/images/pic_unsplash (4).jpg", category: "Pastry", tag_1: "New", tag_2: "Popular" },
    { name: "Salad", price: 2.35, img: "/public/assets/images/pic_unsplash (5).jpg", category: "Dish", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Cocktail", price: 10.00, img: "/public/assets/images/pic_unsplash (2).jpg", category: "Drink", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Pancakes", price: 12.5, img: "/public/assets/images/pic_unsplash (3).jpg", category: "Meal", tag_1: "Favorite", tag_2: "Most Ordered" },
];

const section = document.querySelector(".cards");
const filterBtn = document.querySelector("button");
const searchInput = document.querySelector("input");

function renderCards(items) {
    let cards = "";
    items.map(item => {
        cards += `
        <article class="card">   
        <figure>
            <img src="${ item.img }" class="product-img">
            <span class="category">${ item.category }</span>
        </figure>
        <div class="product">
            <div class="product-info">
                <h1 class="product-name">
                    ${ item.name }
                </h1>

                <span class="price">
                    $${ item.price }
                </span>
            </div>

            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ratione sequi itaque
                consequatur,
                odio accusantium quam dolor autem suscipit repudiandae?
            </p>

            <div class="tags">
                <span class="tag">${ item.tag_1 }</span>
                <span class="tag">${ item.tag_2 }</span>
            </div>

            <button class="cartBtn">Add To Cart</button>

        </div>
    </article>`
    }).join("");

    section.innerHTML = cards;
}

renderCards(products);

filterBtn.addEventListener("click", () => {
    const filteredProducts = products.filter(product => {
        return product.category === "Drink";
    });
    
    renderCards(filteredProducts);
});

searchInput.addEventListener("keyup", () => {
    let arr = [];
    let searchedVal = searchInput.value.toLowerCase();
    const searchedCards = products.filter(product => {
        return product.toLowerCase().startsWith(searchedVal) || product.toLowerCase().includes(searchedVal);
    })

    renderCards(searchedCards);
})