const products = [
    { name: "Parfait Plate", price: 7.55, img: "/public/assets/images/cafe_items (4).jpg", category: "Pastry", tag_1: "New", tag_2: "Popular" },
    { name: "Fruit Fritters", price: 2.35, img: "/public/assets/images/cafe_items (6).jpg", category: "Pastry", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Strawberry Bread", price: 10.00, img: "/public/assets/images/cafe_items (7).jpg", category: "Pastry", tag_1: "Most Rated", tag_2: "Popular" },
    { name: "Chicken Pie", price: 12.5, img: "/public/assets/images/cafe_items (9).jpg", category: "Dish", tag_1: "Favorite", tag_2: "Most Ordered" },
    /*{name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},
    {name: "Parfait Plate", price: 7.55, img: "", category: "Pastry", tag_1: "New", tag_2: "Popular"},*/
]

const section = document.querySelector(".cards");
const filterBtn = document.querySelector("button")

function renderCards() {
    let cards = ""
    products.forEach(product => {
        cards += `
    <article class="card">   
        <figure>
            <img src="${ product.img }" class="product-img">
            <span class="category">${ product.category }</span>
        </figure>
        <div class="product">
            <div class="product-info">
                <h1 class="product-name">
                    ${ product.name }
                </h1>

                <span class="price">
                    $${ product.price }
                </span>
            </div>

            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ratione sequi itaque
                consequatur,
                odio accusantium quam dolor autem suscipit repudiandae?
            </p>

            <div class="tags">
                <span class="tag">${ product.tag_1 }</span>
                <span class="tag">${ product.tag_2 }</span>
            </div>

            <button class="cartBtn">Add To Cart</button>

        </div>
    </article>
    `
    });

    section.innerHTML += `${ cards }`;
}

renderCards();

function filterCards() {
    filterBtn.addEventListener("click", () => {
        const filteredProducts = products.filter((product) => {
            return product.category === "Pastry";
        });
        console.log(filteredProducts)
    })
}

filterCards()