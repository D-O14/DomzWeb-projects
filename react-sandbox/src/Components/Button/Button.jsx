import styles from "./Button.module.css";

function click (e) { console.log(`${e.target.textContent} Button was clicked!`) };
export default function Button({ text = "Button", func = (e) => { click(e) },
    style = { styles }, className = { styles } }) {
    return (
        <>
            <button className={className} onClick={func} style={style}>{text}</button>
        </>
    );
};