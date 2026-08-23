import styles from "./Toast.module.css";

export default function Greeting({ username = "Guest", isLoggedIn = false }) {
    const welcomeMsg = <h2 className={styles.welcomeMsg}>Welcome, {username}!</h2>;
    const loginPrompt = <h2 className={styles.loginPrompt}>Please log in to continue to app!</h2>;

    return (
        <>
            {isLoggedIn ? welcomeMsg : loginPrompt}
        </>
    )
};