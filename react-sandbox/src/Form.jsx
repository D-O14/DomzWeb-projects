import Input from "./Input";
import Button from "./Button/Button";
import Select from "./Select";

const options = ["Hawaii", "South America", "Norway", "Canada"];

export default function () {
    return (
        <>
            <form noValidate autoComplete="on" autoCapitalize="on" autoCorrect="on">
                <Input type="text" placeholder="Please type in a name" id="nameInput"
                    autoFocus name="name" required/>
                <Input type="email" placeholder="Please provide a email" id="emailInput"
                    name="email" autoComplete="email"/>
                <Input type="password" placeholder="Provide a secure password" id="passwordInput"
                    autoComplete="current-password" name="password" />
                <Select items={options} />
                <menu>
                    <Button text="Submit" />
                </menu>
            </form>
        </>
    )
};