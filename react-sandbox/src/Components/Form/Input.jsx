import styles from "./Form.module.css";

export default function Input({ type = "text", placeholder = "Enter some text", id = "",
    className, value = "", event, icon }) {
    return (
        <>
            <label htmlFor={id} className="input-label">
                <div className={styles.input}>
                    <span>{icon}</span>
                    <input type={type} id={id} placeholder={placeholder} className={className}
                        onChange={event} defaultValue={value} />
                </div>
            </label>
        </>
    );
};