import { useState } from "react";
import styles from "./Feedback.module.css";
import Button from "../Button/Button";
import { X } from "lucide-react";

export default function Feedback({ className, icon, content, dismissable, interact, /*username = "Guest", isLoggedIn = false*/ }) {
    /*const welcomeMsg = <h2 className={styles.welcomeMsg}>Welcome, {username}!</h2>;
        const loginPrompt = <h2 className={styles.loginPrompt}>Please log in to continue to app!</h2>;*/

    function displayMenu() {
        return <menu className={styles.menu}>
            <Button className={styles.secondaryBtn} text="Remind me Later" />
            <Button className={styles.primaryBtn} text="Install Now" />
        </menu>
    }
    return (
        <>
            <div className={className}>
                <div className={styles.content}>
                    <span className={styles.icon}>{icon}</span>
                    <div className={styles.toastMsg}>{content}</div>
                    {dismissable ? <Button className={styles.closeBtn} text={<X />} /> : ""}
                </div>
                {interact ? displayMenu() : ""}
            </div>
        </>
    );
}