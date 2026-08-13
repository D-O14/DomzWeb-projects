import PropTypes from "prop-types";
import Button from "./Button/Button";

function Greeting({ username = "Guest", isLoggedIn = false }) {
    const welcomeMsg = <h2 className="welcome-msg">Welcome, {username}!</h2>;
    const loginPrompt = <h2 className="login-prompt">Please log in to continue to app!</h2>;
    return (
        <>
            {isLoggedIn ? welcomeMsg : loginPrompt}
        </>
    )
};

Greeting.PropTypes = {
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string,
}

export default Greeting;