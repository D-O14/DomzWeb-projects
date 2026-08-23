import Button from "../Button/Button";

export default function Header({ links = [] }) {
    const data = links.map(link => {
        return <li key={link.location} className="link">
            <a href={link.path} className={link.className ? link.className : ""}>
                {link.location}
            </a>
        </li>
    });
    return (
        <header className="header">
            <h2 className="logo">DomzWeb</h2>
            <nav className="navbar">
                <ul className="links">{data}</ul>
            </nav>
            <menu className="buttons">
                <Button text="Login" />
                <Button text="Sign Up" />
            </menu>
        </header>
    );
};