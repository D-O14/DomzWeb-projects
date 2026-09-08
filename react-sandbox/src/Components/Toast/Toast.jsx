import styles from "./Toast.module.css";
import Button from "../Button/Button";
import { Clock, X } from "lucide-react";

export default function Toast({ dismissable, message, content, icon, interact }) {
    

    function displayMenu() {
       return <menu className={styles.menu}>
            <Button className={styles.secondaryBtn} text="Remind me Later" />
            <Button className={styles.primaryBtn} text="Install Now" />
        </menu>
    }

    return (
        <>
            <div className={styles.view}>
                <div className={styles.toast}>
                    <span className={styles.icon}>{icon}</span>
                    <div className={styles.toastContent}>
                        <h1 className={styles.message}>{message}</h1>
                        <p className={styles.content}>{content}</p>
                        {dismissable ? <Button className={styles.closeBtn} text={<X />} /> : ""}
                        {interact ? displayMenu() : ""}
                    </div>
                </div>
            </div>
        </>
    )
};