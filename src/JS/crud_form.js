const form = document.querySelector("form")
const name = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const button = document.getElementById("submit");
const pass_toggle = document.getElementById("pass_toggle");
const confirmPass_toggle = document.getElementById("confirmPass_toggle");
const male = document.getElementById("male");
const female = document.getElementById("female");
const genderGroup = document.querySelector(".gender");
const span = document.querySelector("span");

const title = document.title;

document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        document.title = "Oi! You aren't finished here!"
    } else if (document.visibilityState === "visible") {
        document.title = title;
    }
});

const namePattern = /^[A-Za-z\s]+$/;
const agePattern = /^(?:1[0-1][0-9]|120|[1-9]?[0-9])$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[_@#$%^&*!]).{6,12}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isValid =
            validateName(name) &&
            validateEmail(email) &&
            validateDOB(dob) &&
            validatePass(password) &&
            validateConfirmPass(confirm_password) &&
            getGender();

        if (isValid) {
            span.textContent = "Submitted";

            button.classList.add("loading")
            button.setAttribute("disabled", "true")

            setTimeout(() => {
                button.classList.remove("loading")
                button.removeAttribute("disabled") 
            }, 3000)


            const users = JSON.parse(localStorage.getItem("users")) || []
            const user = {
                id: crypto.randomUUID(),
                name: name.value,
                email: email.value,
                password: password.value,
                dateOfBirth: dob.value,
                age: calcAge(dob.value),
                gender: getGender()
            }

            const existingUser = users.find(user => {
                return user.email === email.value
            })

            if (existingUser) {
                existingUser.name = name.value;
                existingUser.email = email.value;
                existingUser.gender = getGender();
                existingUser.dateOfBirth = dob.value;
                existingUser.age = calcAge(dob.value);
                existingUser.password = password.value;
            } else {
                users.push(user)
            }

            console.log(user);
            localStorage.setItem("users", JSON.stringify(users));
            console.log(localStorage);

            setTimeout(() => {
                form.reset();
                span.textContent = "Submit";
                document.title = "Redirecting..."
            }, 4000)

            setTimeout(() => {
                window.location.href = "/src/crud_table.html"
            }, 4500)
        }
    });
}

export function validateName(Input) {
    Input.value = Input.value.replace(/\b\w/g, char => char.toUpperCase());
    Input.value = Input.value.replace(/\d/g, "");
    if (Input.value === "" || Input.value === null) {
        showError(Input, "Name is required!");
        return false;
    } else if (!namePattern.test(Input.value)) {
        showError(Input, "Name can only be made up of letters!");
        return false;
    } else if (Input.value === "User") {
        showError(Input, `Name cannot be ${ Input.value }`);
        return false;
    } else {
        clearError(Input);
        return true;
    }
}

export function validateEmail(Input) {
    if (Input.value === "" || Input.value === null) {
        showError(Input, "Email is required!");
        return false;
    } else if (!Input.value.includes("@")) {
        showError(Input, "E-mail must include @!");
        return false;
    } else if (!emailPattern.test(Input.value)) {
        showError(Input, "E-mail must contain .net or .com after @!")
    } else {
        clearError(Input)
        return true;
    }
}

export function getGender() {
    if (male.checked) {
        return "Male";
    }

    if (female.checked) {
        return "Female";
    }

    if (!male.checked && !female.checked) {
        showError(genderGroup, "Please select a gender");
        return false;
    }
}

export function validateDOB(Input) {
    const value = Input.value;
    const selectedDate = new Date(value);
    const today = new Date();
    const age = calcAge(Input.value);

    if (!value) {
        showError(Input, "Date of birth is required");
        return false;
    } else if (selectedDate > today) {
        showError(Input, "Bisch, you ain't no time traveller");
        return false;
    } else if (age < 18) {
        showError(Input, "You must be 18 years old!");
        return false;
    } else {
        clearError(Input);
        return true;
    }
};

export function calcAge(date) {
    const today = new Date();
    const birthDate = new Date(date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age--
    }

    return age;
}

function validatePass(Input) {
    if (Input.value === "" || Input.value === null) {
        showError(Input, "Password is required!");
        return false;
    } else if (!passwordPattern.test(Input.value)) {
        showError(Input, "Password pattern is not matched!")
        return false;
    } else if (Input.value <= 6) {
        showError(Input, "Password is too short")
    } else {
        clearError(Input)
        return true;
    }
}

function validateConfirmPass(Input) {
    if (Input.value !== password.value) {
        showError(Input, "Passwords do not match");
        return false;
    } else {
        clearError(Input)
        return true;
    }
}

if (pass_toggle) {
    pass_toggle.addEventListener("click", () => {
        if (password.type === "password") {
            password.type = "text";
            pass_toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off">
            <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
            <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
            <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
            <path d="m2 2 20 20" />
        </svg>`
        } else {
            password.type = "password"
            pass_toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>`
        }
    })
}

if (confirmPass_toggle) {
    confirmPass_toggle.addEventListener("click", () => {
        if (confirm_password.type === "password") {
            confirm_password.type = "text";
            confirmPass_toggle.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off">
                <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143" />
                <path d="m2 2 20 20" />
            </svg>`
        } else {
            confirm_password.type = "password";
            confirmPass_toggle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye">
            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
            <circle cx="12" cy="12" r="3" />
        </svg>`
        }
    })
}

if (name) {
    name.addEventListener("input", () => { validateName(name) });
}
if (email) {
    email.addEventListener("input", () => { validateEmail(email) });
}

if (dob) {
    dob.addEventListener("input", () => { validateDOB(dob) });
}

if (password) {
    password.addEventListener("input", () => { validatePass(password) });
}

if (confirm_password) {
    confirm_password.addEventListener("input", () => { validateConfirmPass(confirm_password) });
}

export function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || error.tagName !== "P") {
        error = document.createElement("p");
        error.className = "textError";
        input.insertAdjacentElement("afterend", error)
    }

    error.textContent = message
    input.classList.add("error");
}

export function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.tagName === "P") {
        error.textContent = "";
    }
    input.classList.remove("error")
}