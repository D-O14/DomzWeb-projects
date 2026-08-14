import { useState } from "react";

export default function () {
    const [color, setColor] = useState("#FFFFFF");
    function colorChange(e) { setColor(e.target.value) };
    return (
        <>
            <div className="color-picker">
                <h1 className="heading">Color Picker</h1>
                <div className="color-display" style={{ background: color }}>
                <p>Selected Color: {color}</p>
                </div>
                <label htmlFor="">Select a Color:</label>
                <input type="color" value={color} onChange={(e) => {colorChange(e)}} />
            </div>
        </>
    );
}