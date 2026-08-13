import profilePic from "./assets/abstract-waves.jpg";
import Button from "./Button/Button";

function Card(props) {
    return (
        <article className="card">
            <img src={profilePic} alt="Profile Picture" width="200px" height="150px" className="img" />
            <h2 className="heading">{props.name}</h2>
            <p className="desc">{props.desc}</p>
            <Button />
        </article>
    )
}

export default Card;