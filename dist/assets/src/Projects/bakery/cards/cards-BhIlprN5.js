import"../../../../modulepreload-polyfill-loNJNkyP.js";var e=[{name:`Parfait Plate`,price:7.55,img:`/public/assets/images/cafe_items (4).jpg`,category:`Combo`,tag_1:`New`,tag_2:`Popular`},{name:`Fruit Fritters`,price:2.35,img:`/public/assets/images/cafe_items (6).jpg`,category:`Pastry`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Strawberry Bread`,price:10,img:`/public/assets/images/cafe_items (7).jpg`,category:`Baked`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Chicken Pie`,price:12.5,img:`/public/assets/images/cafe_items (9).jpg`,category:`Dish`,tag_1:`Favorite`,tag_2:`Most Ordered`},{name:`Cold Coffee`,price:2.16,img:`/public/assets/images/coffee.png`,category:`Coffee`,tag_1:`Best`,tag_2:`Popular`},{name:`Banana Sandwich`,price:2.35,img:`/public/assets/images/pic_unsplash (6).jpg`,category:`Combo`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Cup 'O' Coffee`,price:10,img:`/public/assets/images/pic_unsplash (7).jpg`,category:`Coffee`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Mug 'O' Coffee`,price:12.5,img:`/assets/images/pic_unsplash (9).jpg`,category:`Coffee`,tag_1:`Favorite`,tag_2:`Most Ordered`},{name:`Cheese Cake`,price:7.55,img:`/assets/images/pic_unsplash (4).jpg`,category:`Pastry`,tag_1:`New`,tag_2:`Popular`},{name:`Salad`,price:2.35,img:`/public/assets/images/pic_unsplash (5).jpg`,category:`Dish`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Cocktail`,price:10,img:`/public/assets/images/pic_unsplash (2).jpg`,category:`Drink`,tag_1:`Most Rated`,tag_2:`Popular`},{name:`Pancakes`,price:12.5,img:`/public/assets/images/pic_unsplash (3).jpg`,category:`Meal`,tag_1:`Favorite`,tag_2:`Most Ordered`}],t=document.querySelector(`.cards`),n=document.querySelector(`button`);function r(){let n=``;e.forEach(e=>{n+=`
    <article class="card">   
        <figure>
            <img src="${e.img}" class="product-img">
            <span class="category">${e.category}</span>
        </figure>
        <div class="product">
            <div class="product-info">
                <h1 class="product-name">
                    ${e.name}
                </h1>

                <span class="price">
                    $${e.price}
                </span>
            </div>

            <p class="description">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis ratione sequi itaque
                consequatur,
                odio accusantium quam dolor autem suscipit repudiandae?
            </p>

            <div class="tags">
                <span class="tag">${e.tag_1}</span>
                <span class="tag">${e.tag_2}</span>
            </div>

            <button class="cartBtn">Add To Cart</button>

        </div>
    </article>
    `}),t.innerHTML+=`${n}`}r();function i(){n.addEventListener(`click`,()=>{let t=e.filter(e=>e?.category===`Coffee`);console.log(t)})}i();