import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import styles from "./Clock.module.css";
import sunImg from "../../assets/sunny.jpg";
import nightImg from "../../assets/night-time.jpg";

export default function Clock({ country = "London" }) {
    const [time, setTime] = useState(new Date());
    const isDay = time.getHours() >= 6 && time.getHours() < 18;
    const meridiem = time.getHours() >= 12 ? "PM" : "AM";

    useEffect(() => {
        const intervalId = setInterval(() => { setTime(new Date()) }, 1000);
        return () => { clearInterval(intervalId) };
    }, []);


    function formatTime() {
        let hours = time.getHours();
        let minutes = time.getMinutes();
        //let seconds = time.getSeconds();
        hours = hours % 12 || 12;
        return `${ padZero(hours) }:${ padZero(minutes) }`;
    };
    
    function padZero(num) { return (num < 10 ? "0" : "") + num };

    return (
        <>
            <div className={styles.clockView}>
                <div className={styles.clock}>
                    <img src={isDay ? sunImg : nightImg} alt="An image of the time of day" />
                    <span className={styles.location}><MapPin size={16}/> {country}</span>
                    <span className={styles.offset}>UTC-5</span>
                    <time className={styles.time}>
                        {formatTime()}
                        <span className={styles.meridiem}>{meridiem}</span>
                    </time>
                    <span className={styles.timeOfDay}>{isDay ? "☀️ Day" : "🌑 Night"}</span>
                </div>
            </div>
        </>
    );
};