import { useState } from "react";
import Button from "./Button/Button";

export default function () {
    const [foods, setFoods] = useState(["Apple", "Orange", "Banana"]);
    function addFood() { 
        const newFood = document.getElementById("foodInput").value;
        document.getElementById("foodInput").value = "";
        setFoods(prevFoods => [...foods, newFood]);
    };
    function removeFood(index) { 
        const newFoods = foods.filter((_, i) => i !== index);
        setFoods(newFoods);
    };
    return (
        <>
            <div className="list">
                <h2>List of Foods</h2>
                <ul>
                    {foods.map((food, index) => {
                        return <li key={index} onClick={() => { removeFood(index) }}>{food}</li>
                    })}
                </ul>
                <input type="text" id="foodInput" placeholder="Enter food name" />
                <Button text="Add food" func={() => { addFood() }}/>
            </div>
        </>
    );
}