import { ArrowBigDown, Globe, Home } from "lucide-react";

const links = [
    { location: "Home", icon: <Home />, path: "#" },
    { location: "About", icon: <ArrowBigDown />, path: "#" },
    { location: "Projects", icon: <ArrowBigDown />, path: "#" },
    { location: "Studio", icon: <ArrowBigDown />, path: "#" },
];

export default function Navbar({ links = [] }) {
    return (
        <>
            <header>
                <nav>
                    <a href=""><Globe />DomzWeb</a>
                    <div className="nav">
                        <ul className="menu">

                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
};