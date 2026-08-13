import styles from "./Button.module.css";

function Button() {
    const btnStyles = {
        backgroundColor: "hsl(210, 100%, 50%)",
        color: "hsl(0, 0%, 100%)",
        padding: ".5em 1em",
        borderRadius: ".25em",
        border: "1px solid transparent",
        cursor: "pointer",
    };
    return (<><button style={btnStyles} className={styles.button}>Click Me</button></>)
};

export default Button;