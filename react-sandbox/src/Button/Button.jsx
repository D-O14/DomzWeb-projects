import styles from "./Button.module.css";

const click = () => { console.log("clicked") }

export default function Button({ text = "Button", func = { click }, style={ styles } }) {
    return (
        <>
            <button className={styles.button} onClick={func} style={style}>{text}</button>
        </>
    );
};