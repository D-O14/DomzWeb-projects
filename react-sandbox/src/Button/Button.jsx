import styles from "./Button.module.css";
import React, { useState } from "react";

const click = (e) => { e.target.textContent = "Clicked" };
export default function Button({ text = "Button", func = (e) => { click(e) } , style={ styles } }) {
    return (
        <>
            <button className={styles.button} onClick={func} style={style}>{text}</button>
        </>
    );
};