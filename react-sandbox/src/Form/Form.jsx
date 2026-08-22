//import Input from "./Input";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Form.module.css";
import { Lock, Mail, Phone, User } from "lucide-react";

/*<Input type="text" id="nameInput" value={name} placeholder="Your name"
    event={(e) => { updateName(e) }} icon={<User />} />
<Input type="email" id="emailInput" value={email} placeholder="Your e-mail"
    event={(e) => { updateEmail(e) }} icon={<Mail />} />
<Input type="tel" id="telInput" value={phoneNumber} placeholder="Your phone number"
    event={(e) => { updateNumber(e) }} icon={<Phone />} />*/

export default function Form() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function updateName(e) { setName(e.target.value); };
    function updateEmail(e) { setEmail(e.target.value) };
    function updatePassword(e) { setPassword(e.target.value) };
    function updatePhoneNumber(e) { setPhoneNumber(e.target.value) };
    function addUser(e) {
        e.preventDefault();
        const newUser = { user_name: name, user_email: email, pass: password, tel: phoneNumber };
        setUsers(prevUsers => [...users, newUser]);
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
    };
    return (
        <>
            <div className="form">
                <form noValidate onSubmit={(e) => { addUser(e) }} autoComplete="off" autoCapitalize="on"
                    autoCorrect="on">
                    <label htmlFor="nameInput">
                        <div className={styles.input}>
                            <span>{<User />}</span>
                            <input type="text" id="nameInput" placeholder="Your name"
                                value={name} onChange={(e) => { updateName(e) }} />
                        </div>
                    </label>
                    <label htmlFor="emailInput">
                        <div className={styles.input}>
                            <span>{<Mail />}</span>
                            <input type="email" id="emailInput" placeholder="Your e-mail"
                                autoComplete="username" value={email} onChange={(e) => { updateEmail(e) }} />
                        </div>
                    </label>
                    <label htmlFor="passwordInput">
                        <div className={styles.input}>
                            <span>{<Lock />}</span>
                            <input type="password" id="passwordInput" placeholder="Your password"
                                autoComplete="new-password" value={password} onChange={(e) => { updatePassword(e) }} />
                        </div>
                    </label>
                    <label htmlFor="telInput">
                        <div className={styles.input}>
                            <span>{<Phone />}</span>
                            <input type="tel" id="telInput" placeholder="Your phone number"
                                autoComplete="new-password" value={phoneNumber} onChange={(e) => { updatePhoneNumber(e) }} />
                        </div>
                    </label>
                    <menu>
                        <Button text="Submit" func={(e) => { addUser(e) }} className={styles.submitBtn} />
                    </menu>
                </form>
            </div>
            <ul>
                {users.map((user, index) => {
                    return <li key={index}>{user.user_name}</li>
                })}
            </ul>
        </>
    );
}