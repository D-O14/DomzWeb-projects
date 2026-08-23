import { useContext } from "react";
import { UserContext } from "./CompA";

export default function CompD() { 
    const user = useContext(UserContext);
    return (
        <>
            <div className="box">
                <h1>ComponentD</h1>
                <h2>Bye, {user}</h2>
            </div>
        </>
    );
};