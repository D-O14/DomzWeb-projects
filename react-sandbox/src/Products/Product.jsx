import cafeImg from "../assets/cafe_items (1).jpg";
import { Heart, Star, ShoppingCart } from "lucide-react";
import Button from "../Button/Button";
import "./product.css";

export default function ({ category = "food", tag = "Popular", name = "Breakfast", price = 1.00, rating = 5.0,
    desc = "The most important meal of the day" }) {
    return (
        <>
            <article class="card">
                <div class="card-header">
                    <img src={cafeImg} alt="Decorative Image" class="img"/>
                        <span class="category">{category}</span>
                        <menu class="options"><Button text={<Heart/>}/></menu>
                </div>
                <div class="card-content">
                    <div class="tags">
                        <span class="tag">${tag}</span>
                        <span class="rating">
                            <Star/>{rating}
                        </span>
                    </div>
                    <div class="specs">
                        <h1 class="name">{name}</h1>
                        <span class="price">{price}</span>
                    </div>
                    <p class="desc">{desc}</p>
                    <menu class="specs"><Button text={<ShoppingCart />}/></menu>
                </div>
            </article>
        </>
    )
}