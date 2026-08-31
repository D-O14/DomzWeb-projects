import { Search, CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

export default function SearchBar({ items = [], icon = <Search />, property, placeholder="Search..." }) {
    useEffect(() => {
        function focusInput(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === "/") {
                e.preventDefault();
                const input = document.querySelector("input");
                input.focus();
            };
        }
        function refresh(e) {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "R") {
                e.preventDefault();
                location.reload();
            };
        }
        document.addEventListener("keydown", (e) => {
            focusInput(e);
            refresh(e);
        });
        return () => {
            document.removeEventListener("keydown", (e) => {
                focusInput(e);
                refresh(e);
            });
        };
    });
    const [query, setQuery] = useState("");
    const results = items.filter(item => {
        return item[property].toLowerCase().includes(query.toLowerCase().trim());
    });

    return (
        <>
            <label htmlFor="searchInput">
                <div className={styles.input}>
                    <span className={styles.search}>{icon}</span>
                    <input type="search" id="searchInput" placeholder={placeholder} onChange={(e) => { setQuery(e.target.value) }}
                        value={query} autoComplete="off" />
                    <button className={styles.closeBtn} aria-label="clear search button">
                        <span className="icon"><CircleXIcon /></span>
                    </button>
                    <kbd className={styles.shortcut}>ctrl + /</kbd>
                </div>
            </label>
            <ol>
                {results.map((item, index) => {
                    return <li key={index}>{item[property]}</li>
                })}
            </ol>
        </>
    );
};