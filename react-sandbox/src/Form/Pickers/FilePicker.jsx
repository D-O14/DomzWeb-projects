import { useState } from "react";

export default function () {
    const [img, setImg] = useState();
    function changeImg(e) { setImg(e.target.value) };
    return (
        <>
            <div className="file-picker">
                <h1 className="heading">Image Preview</h1>
                <div className="img-preview">
                    <img src={img} alt="" />
                </div>
                <input type="file" name="filePicker" onChange={(e) => { changeImg(e) }}/>
            </div>
        </>
    );  
};