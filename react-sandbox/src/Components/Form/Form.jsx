import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Form.module.css";
import Input from "./Input/Input";
import Feedback from "../Toast/Feedback";
import { createContext } from "react";
import { CheckCircle, Lock, Mail, Phone, User } from "lucide-react";
import Card from "../Products/Card";

/*<Feedback
    type="message"
    interact={false}
    dismissable={true}
    icon={<CheckCircle />}
    content="Form Submitted Successfully"
    className={!revealed ? `${ styles.toast }` : `${ styles.toast } ${ styles.revealed }`}
/>*/

export const UserContext = createContext();

export default function Form() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [revealed, setRevealed] = useState(false);

    function updateName(e) { setName(e.target.value); };
    function updateEmail(e) { setEmail(e.target.value) };
    function updatePassword(e) { setPassword(e.target.value) };
    function updatePhoneNumber(e) { setPhoneNumber(e.target.value) };
    function reveal() { !revealed ? setRevealed(true) : setRevealed(false) };

    function addUser(e) {
        e.preventDefault();
        const newUser = { userName: name, userEmail: email, pass: password, tel: phoneNumber };
        setUsers(prevUsers => [...users, newUser]);
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        reveal();

    };
    return (
        <>
            <div className="form">
                <form noValidate onSubmit={(e) => { addUser(e) }} autoComplete="off" autoCapitalize="on"
                    autoCorrect="on">
                    <Input type="text" id="nameInput" icon={<User />} placeholder="Your name" value={name}
                        event={(e) => { updateName(e) }} />
                    <Input type="email" id="emailInput" icon={<Mail />} placeholder="Your e-mail" value={email}
                        event={(e) => { updateEmail(e) }} />
                    <Input type="password" id="passwordInput" icon={<Lock />} placeholder="Your password" value={password}
                        event={(e) => { updatePassword(e) }} />
                    <Input type="tel" id="telInput" icon={<Phone />} placeholder="Your phone number" value={phoneNumber}
                        event={(e) => { updatePhoneNumber(e) }} />
                    <menu>
                        <Button text="Submit" func={(e) => { addUser(e) }} className={styles.submitBtn} />
                    </menu>
                </form>
            </div>

            <UserContext.Provider value={name}>
                <Card name={name} />
            </UserContext.Provider>
        </>
    );
}