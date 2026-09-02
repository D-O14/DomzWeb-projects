import styles from "./Tooltip.module.css";
import Button from "../Button/Button";
import { useState } from "react";

export default function Tooltip({ header, content = "This is a tooltip" }) {
    const [revealed, setRevealed] = useState(false);
    function reveal() { !revealed ? setRevealed(true) : setRevealed(false) };
    return (
        <>
            <div className={styles.view}></div>
            <div className={!revealed ? styles.tooltip : `${ styles.tooltip } ${ styles.revealed }`}>
                <h1>{header}</h1>
                <p className={styles.info}>{content}</p>
            </div>
            <Button className={styles.showBtn} text="Show" func={() => reveal()} />
        </>
    );
}