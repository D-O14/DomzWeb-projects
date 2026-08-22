import { useEffect, useState } from "react";
import Button from "./Button/Button";

export default function MyComp() {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        window.addEventListener("resize", () => { handleResize() });
        return () => { 
            window.removeEventListener("resize", () => { handleResize() });
        };
    }, []);
    useEffect(() => { document.title = `size: ${ width } x ${ height }` }, [width, height]);
    function handleResize() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    return (
        <>
            <div className="dimensions">
                <label>Window width: {width}px</label>
                <label>Window height: {height}px</label>
            </div>
        </>
    );
}