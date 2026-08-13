import PropTypes from "prop-types";
import Button from "./Button/Button";
import profilePic from "./assets/abstract-waves.jpg";

function Card({ name="John Doe", desc="Just an average guy named John Doe" }) {
    return (
        <article className="card">
            <img src={profilePic} alt="Profile Picture" width="200px" height="150px" className="img" />
            <h2 className="heading">{name}</h2>
            <p className="desc">{desc}</p>
            <Button />
        </article>
    )
}

Card.propTypes = {
    name: PropTypes.string,
    desc: PropTypes.string,
};

export default Card;