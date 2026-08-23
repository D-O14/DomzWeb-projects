import { createContext, useState } from "react";
import CompB from "./CompB";

export const UserContext = createContext();

export default function CompA() {
    const user = useState("DomzWeb");
    return (
        <>
            <div className="box">
                <h1>ComponentA</h1>
                <h2>Hello, {user}</h2>
                <UserContext.Provider value={user}>
                    <CompB user={user} />
                </UserContext.Provider>
            </div>
        </>
    );
};