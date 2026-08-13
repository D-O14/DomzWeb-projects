import React, { useState } from "react";
import Button from "./Button/Button";

export default function MyComp() {
    const [name, setName] = useState("Guest");
    const [age, setAge] = useState(0);
    const [employed, setEmployed] = useState(false);
    const update = () => { setName("DomzWeb") };
    const increment = () => { setAge(age + 1) };
    const toggle = () => { setEmployed(!employed) };
    return (
        <div>
            <p>Name: {name}</p>
            <Button text="Set Name" func={update} />

            <p>Age: {age}</p>
            <Button text="Set Age" func={increment} />

            <p>Employed: {employed ? "Yes":"No"}</p>
            <Button text="Toggle Status" func={toggle} />
        </div>
    )
}