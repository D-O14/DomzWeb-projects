import { useEffect, useState } from "react";
import Button from "./Button/Button";

export default function Expo() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState("green");
    const title = useState("react sandbox");
    useEffect(() => { document.title = `${ title } (${ count }) ${ color }` }, [count, color]);
    function addCount() { setCount(prevCount => count + 1) };
    function subtractCount() { setCount(prevCount => count - 1) };
    function changeColor() { setColor(prevColor => color === "green" ? "red" : "green") };
    return (
        <>
            <p style={{color: color}}>count: {count}</p>
            <menu>
                <Button text="Add" func={() => { addCount() }} />
                <Button text="Subtract" func={() => { subtractCount() }} />
                <Button text="Change Color" func={() => { changeColor() }} />
            </menu>
        </>
    );
};