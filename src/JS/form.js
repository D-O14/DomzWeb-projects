const form = document.getElementById("form");
const name_input = document.getElementById("name-input");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const repeatPassword_input = document.getElementById("repeat-password-input");

form.addEventListener("submit", (e) => {
    let errors = [];
    if (name_input.value) {
        errors = getSignedUpFormErrors(name_input.value, email_input.value, password_input.value);
    } else  {
        errors = getLoginFormErrors()
    }

    if (errors.length > 0) {
        e.preventDefault();   
    }
})

function getSignedUpFormErrors(name, email, password) {
    let errors = [];

    if (name == "" || name == null) {
        errors.push("Name is required!");
        name.parentElement.classList.add("incorrect");
    }

    if (email == "" || email == null) {
        errors.push("E-mail is required!");
        email.parentElement.classList.add("incorrect");
    }

    if (password == "" || password == null) {
        errors.push("Password is required!");
        password.parentElement.classList.add("incorrect");
    }

    return errors;
}