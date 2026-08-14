import React, { useState } from "react";
import Button from "./Button/Button";
import { Plus, Minus, RotateCcw } from "lucide-react";

const decrStyles = { background: "red" };
const incrStyles = { background: "hsl(120, 80%, 50%)" };

export default function Counter() { 
    const [count, setCount] = useState(0);
    const increment = () => { setCount(prevCount => count + 1) };
    const decrement = () => {
        setCount(prevCount => count - 1);
        if (count <= 0) { setCount(0) };
    };
    const reset = () => { setCount(0) };
    return (
        <>
            <p className="count">Count is {count}</p>
            <menu className="btn-group">
                <Button text={<Plus/>} func={increment} style={incrStyles}/>
                <Button text={<RotateCcw/>} func={reset} />
                <Button text={<Minus />} func={decrement} style={decrStyles} />
            </menu>
        </>
    )
};