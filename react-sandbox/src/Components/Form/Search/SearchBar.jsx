//import { Search } from "lucide";
import Input from "../Input/Input";
import styles from "./SearchBar.module.css";

export default function SearchBar() { 
    return (
        <>
            <Input type="search" id="searchInput" placeholder="Find anything you want.." />
        </>
    );
};