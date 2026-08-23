import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

export default function Clock() {
    const [time, setTime] = useState(new Date());
    useEffect(() => { 
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => { clearInterval(intervalId) };
    }, []);

    function formatTime() { 
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";
        //hours = hours % 12 || 12;
        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    };

    function padZero(num) { return (num < 10 ? "0" : "") + num };
    
    return (
        <>
            <div className={styles.clockContainer}>
                <div className={styles.clock}>
                    <span>{formatTime()}</span>
                </div>
            </div>
        </>
    );
};