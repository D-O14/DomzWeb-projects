import { useState } from "react";
import Button from "../../Button/Button";
import styles from "./Counter.module.css";
import { Plus, Minus, RotateCcw } from "lucide-react";

export default function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => { setCount(prevCount => count + 1) };
    const decrement = () => { count <= 0 ? setCount(0) : setCount(prevCount => count - 1) };
    return (
        <>
            <menu className={styles.counter}>
                <Button text={<Minus />} func={() => { decrement() }} className={styles.decrBtn} />
                <p className={styles.count}>{count}</p>
                <Button text={<Plus />} func={() => { increment() }} className={styles.incrBtn} />
            </menu>
        </>
    )
};