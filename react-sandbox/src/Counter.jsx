import React, { useState } from "react";
import Button from "./Button/Button";

const decrStyles = { background: "red" };
const incrStyles = { background: "hsl(120, 80%, 50%)" };

export default function Counter() { 
    const [count, setCount] = useState(0);
    const increment = () => { setCount(count + 1) };
    const decrement = () => {
        setCount(count - 1);
        if (count <= 0) { setCount(0) };
    };
    const reset = () => { setCount(0) };
    return (
        <>
            <p className="count">Count is {count}</p>
            <menu className="btn-group">
                <Button text="Increase Count" func={increment} style={incrStyles}/>
                <Button text="Reset Count" func={reset} />
                <Button text="Decrease Count" func={decrement} style={decrStyles} />
            </menu>
        </>
    )
};