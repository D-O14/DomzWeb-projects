import styles from "./Chips.module.css";
import { Check } from "lucide-react";

export default function Chips({ data=[{}] }) {
    return (
        <>
            <menu className={styles.row}>
                {data.map((chip, index) => {
                    return <button key={index} onClick={(e) => { chip?.action(e) }}
                        className={styles.chip}>
                        {chip.label}
                        <span>{chip.className? <Check /> : ""}</span>
                    </button>
                })}
            </menu>
        </>
    )   
}