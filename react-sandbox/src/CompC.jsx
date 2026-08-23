import CompD from "./CompD";
import { useContext } from "react";
import { UserContext } from "./CompA";

export default function CompC() { 
    const user = useContext(UserContext);
    return (
        <>
            <div className="box">
                <h1>ComponentC</h1>
                <h2>Hello again, {user}! You're almost at the end of the component!</h2>
                <CompD />
            </div>
        </>
    );
};