import styles from "./Tooltip.module.css";

export default function Tooltip({ header, text="This is a tooltip" }) {
    return (
        <>
            <div className={styles.view}>
                <div className={styles.tooltip}>
                    <h1>{header}</h1>
                    <p className={styles.info}>{text}</p>
                </div>
            </div>
        </>
    );
}