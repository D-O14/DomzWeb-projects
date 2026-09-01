import { useEffect, useState } from "react";
import styles from "./DropDown.module.css";
import { ChevronDown } from "lucide-react"

export default function DropDown({ ltr = true, items = [], property, selectText }) {
    useEffect(() => {
        const dropDown = document.getElementById("dropdown");
        ltr ? dropDown.dir = "ltr" : dropDown.dir = "rtl";
    });
    const [text, setText] = useState(selectText);
    const [active, setActive] = useState(false);
    function dropDown() { setActive(true) };
    function closeDropDown() { setActive(false) };
    function select(e) { setText(e.target.textContent) };
    return (
        <>
            <div className={styles.view}>
                <div className={styles.dropdown} id="dropdown">
                    <label className={!active ? styles.picker : `${ styles.picker } ${ styles.drop }`}
                        onClick={() => { !active ? dropDown() : closeDropDown() }}>
                        <span className={styles.selectText}>{text}</span>
                        <ChevronDown className={styles.chevron} />
                    </label>
                    <ul className={!active ? styles.select : `${ styles.select } ${ styles.drop }`}>
                        {items.map((item, index) => {
                            return <li key={index} value={item[property] || item} onClick={(e) => { select(e) }}>
                                {item[property] || item} {item.icon ? item.icon : ""}
                            </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}