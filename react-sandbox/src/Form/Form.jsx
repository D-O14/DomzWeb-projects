import Input from "./Input";
import Select from "./Dropdown/Select";
import Button from "../Button/Button";
import FilePicker from "./Pickers/FilePicker";

const options = ["Hawaii", "South America", "Norway", "Canada"];

export default function () {
    return (
        <>
            <form noValidate autoComplete="on" autoCapitalize="on" autoCorrect="on">
                <FilePicker />
                <Input type="text" placeholder="Please type in a name" id="nameInput"
                    name="name" required />
                <Input type="email" placeholder="Please provide a email" id="emailInput"
                    name="email" autoComplete="email" />
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