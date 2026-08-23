import { useState } from "react";

export default function () {
    const [color, setColor] = useState("#FFFFFF");
    function colorChange(e) {
        setColor(e.target.value);
        document.body.style.background = e.target.value;
    };
    return (
        <>
            <div className={styles.colorPicker}>
                <h1 className={styles.heading}>Color Picker</h1>
                <div className={styles.colorDisplay}>
                    <p>Selected Color: {color}</p>
                </div>
                <label htmlFor="colorPicker">Select a Color:</label>
                <input type="color" id="colorPicker" value={color} onChange={(e) => { colorChange(e) }} />
            </div>
        </>
    );
}