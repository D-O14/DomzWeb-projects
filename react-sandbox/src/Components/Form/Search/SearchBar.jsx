import { Search, CircleXIcon } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";

//const [query, setQuery] = useState("");
export default function SearchBar({ className = `${styles.input}`, event, items = [], icon = <Search />, property,
    placeholder = "Search..." }) {
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
    
    return (
        <>
            <label htmlFor="searchInput">
                <div className={className}>
                    <span className={styles.searchIcon}>{icon}</span>
                    <input type="search" id="searchInput" placeholder={placeholder} onChange={(e) => {event(e)}}
                     autoComplete="off" />
                    <button className={styles.closeBtn} aria-label="clear search button">
                        <span className="icon"><CircleXIcon /></span>
                    </button>
                    <kbd className={styles.shortcut}>ctrl + /</kbd>
                </div>
            </label>
        </>
    );
};