import Button from "./Button/Button";
import profilePic from "./assets/abstract-waves.jpg";

export default function Card({ name="John Doe", desc="Just an average guy named John Doe" }) {
    return (
        <article className="card">
            <img src={profilePic} alt="Profile Picture" width="200px" height="150px" className="img"
            loading="lazy" decoding="async"/>
            <h2 className="heading">{name}</h2>
            <p className="desc">{desc}</p>
            <Button text="View Profile"/>
        </article>
    )
};