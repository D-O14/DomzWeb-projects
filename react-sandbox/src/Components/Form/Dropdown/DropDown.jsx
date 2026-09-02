import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import { ChevronDown } from "lucide-react"

export default function DropDown({ ltr = true, options = [], property, selectText="Choose one" }) {
    const [text, setText] = useState(selectText);
    const [active, setActive] = useState(false);
    function dropDown() { !active ? setActive(true) : setActive(false) };
    function select(e) { setText(e.target.textContent) };
    return (
        <>
            <div className={styles.view}>
                <div className={styles.dropdown} style={{direction: ltr ? "ltr" : "rtl"}} id="dropdown">
                    <label className={!active ? styles.picker : `${ styles.picker } ${ styles.drop }`}
                        onClick={() => {dropDown()}}>
                        <span className={styles.selectText}>{text}</span>
                        <ChevronDown className={styles.chevron} />
                    </label>
                    <ul className={!active ? styles.select : `${ styles.select } ${ styles.drop }`}>
                        {options.map((option, index) => {
                            return <li key={index} value={option[property] || option} onClick={(e) => { select(e) }}>
                                {option[property] || option} {option.icon ? option.icon : ""}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}