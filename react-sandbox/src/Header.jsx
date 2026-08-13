import Button from "./Button/Button";

export default function Header() {
    return (
        <header className="header">
            <h2 className="logo">DomzWeb</h2>
            <nav className="navbar">
                <ul className="links">
                    <li className="active"><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Blog</a></li>
                </ul>
            </nav>
            <menu className="buttons">
                <Button text="Login" />
                <Button text="Sign Up" />
            </menu>
        </header>
    );
};