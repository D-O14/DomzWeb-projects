import { useState } from "react";
import styles from "./FilePicker.module.css";

export default function () {
    const [img, setImg] = useState();
    function changeImg(e) { setImg(e.target.value) };
    return (
        <>
            <div className={styles.filePicker}>
                <h1 className={styles.heading}>Image Preview</h1>
                <div className={styles.imgPreview}>
                    <img src={img} alt="File Picked Image" />
                </div>
                <input type="file" name="file" onChange={(e) => { changeImg(e) }} />
            </div>
        </>
    );
};