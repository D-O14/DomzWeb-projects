const form = document.querySelector("form")
const name = document.getElementById("name");
const email = document.getElementById("email");
const dob = document.getElementById("dob");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const button = document.getElementById("submit");
const pass_toggle = document.getElementById("pass_toggle");
const confirmPass_toggle = document.getElementById("confirmPass_toggle");

const namePattern = /^[A-Za-z\s]+$/;
const agePattern = /^(?:1[0-1][0-9]|120|[1-9]?[0-9])$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[_@#$%^&*!]).{6,12}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const isValid =
        validateName() &&
        validateEmail() &&
        validateDOB() &&
        validatePass();

    if (isValid) {
        button.textContent = "Submitted";

        const user = {
            name: name.value,
            email: email.value,
            dateOfBirth: dob.value,
            password: password.value,
        }

        const user_serialized = JSON.stringify(user);
        localStorage.setItem("user", user_serialized);
        console.log(localStorage);
        
        setTimeout(() => {
            form.reset();
            button.textContent = "Submit";
        }, 500)
    }
});

function validateName() {
    name.value = name.value.replace(/\b\w/g, char => char.toUpperCase());
    name.value = name.value.replace(/\d/g, "");
    if (name.value === "" || name.value === null) {
        showError(name, "Name is required!");
        return false;
    } else if (!namePattern.test(name.value)) {
        showError(name, "Name can only be made up of letters!");
        return false;
    } else if (name.value === "User") {
        showError(name, `Name cannot be ${ name.value }`);
        return false;
    } else {
        clearError(name);
        return true;
    }
}

function validateEmail() {
    if (email.value === "" || email.value === null) {
        showError(email, "Email is required!");
        return false;
    } else if (!email.value.includes("@")) {
        showError(email, "E-mail must include @!");
        return false;
    } else if(!emailPattern.test(email.value)){
        showError(email, "E-mail must contain .net or .com after @!")
    } else {
        clearError(email)
        return true;
    }
}

function validateDOB() {
    const value = dob.value;
    const selectedDate = new Date(value);
    const today = new Date();

    if (!value) {
        showError(dob, "Date of birth is required");
        return false;
    } else if (selectedDate > today) {
        showError(dob, "Bisch, you ain't no time traveller");
        return false;  
    } else {
        clearError(dob);
        return true;
    }
};

function validatePass() {
    if (password.value === "" || password.value === null) {
        showError(password, "Password is required!");
        return false;
    } else if (!passwordPattern.test(password.value)) {
        showError(password, "Password pattern is not matched!")
        return false;
    } else if (password.value <= 6) {
        showError(password, "Password is too short")
    } else {
        clearError(password)
        return true;
    }
}

function validateConfirmPass() {
    if (password.value !== confirm_password.value) {
        showError(confirm_password, "Passwords do not match");
        return false;
    }  else {
        clearError(confirm_password)
        return true;
    }
}
function validatePass() {
    if (password.value === "" || password.value === null) {
        showError(password, "Password is required!");
        return false;
    } else if (!passwordPattern.test(password.value)) {
        showError(password, "Password pattern is not matched!")
        return false;
    } else if (password.value <= 6) {
        showError(password, "Password is too short")
    } else {
        clearError(password)
        return true;
    }
}

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

name.addEventListener("input", validateName);
email.addEventListener("input", validateEmail);
dob.addEventListener("input", validateDOB);
password.addEventListener("input", validatePass);
confirm_password.addEventListener("input", validateConfirmPass);

function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || error.tagName !== "P") {
        error = document.createElement("p");
        error.className = "textError";
        input.insertAdjacentElement("afterend", error)
    }

    error.textContent = message
    input.classList.add("error");
}

function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.tagName === "P") {
        error.textContent = "";
    }
    input.classList.remove("error")
}

/*const tableSection = document.getElementById("table");

const person1 = {
    id: crypto.randomUUID(),
    name: "Drew Mcarthy",
    age: 24,
    gender: "Male",
    isEmployed: true,
    hasDisease: false,
    isConvict: false,
    criminalRecord: true,
    role: "Manager",
    DateOfBirth: "26/05/2002",
}

const person2 = {
    id: crypto.randomUUID(),
    name: "Anna Beige",
    age: 36,
    gender: "Female",
    isEmployed: true,
    hasDisease: true,
    isConvict: false,
    criminalRecord: false,
    role: "CEO",
    DateOfBirth: "16/09/1990",
}

const person3 = {
    id: crypto.randomUUID(),
    name: "Lucius Dornell",
    age: 28,
    gender: "Male",
    isEmployed: false,
    hasDisease: true,
    isConvict: false,
    criminalRecord: true,
    role: "None",
    DateOfBirth: "12/06/1998",
}

const person4 = {
    id: crypto.randomUUID(),
    name: "Anna Beige",
    age: 47,
    gender: "Female",
    isEmployed: true,
    hasDisease: false,
    isConvict: false,
    criminalRecord: false,
    role: "Owner",
    DateOfBirth: "4/01/1973",
}

const person5 = {
    id: crypto.randomUUID(),
    name: "Lucas Elcastio",
    age: 24,
    gender: "Male",
    isEmployed: true,
    hasDisease: false,
    isConvict: false,
    criminalRecord: false,
    role: "Shareholder",
    DateOfBirth: "13/11/2002",
}

const people = []
people.push(person1, person2, person3, person4, person5);
console.log(people)


function table() {
    let rows = ""
    people.forEach(person => {
        rows += `
            <tr class="row">
                        <td>${ person.id }</td>
                        <td>${ person.name }</td>
                        <td>${ person.age }</td>
                        <td>${ person.gender }</td>
                        <td>${ person.hasDisease }</td>
                        <td>${ person.criminalRecord }</td>
                        <td>${ person.isConvict }</td>
                        <td>${ person.isEmployed }</td>
                        <td>${ person.role }</td>
                        <td>${ person.DateOfBirth }</td>
                    </tr> `

    })

    tableSection.innerHTML = `
            <table class="table">
                <thead class="header">
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Has Disease</th>
                    <th>Criminal Record</th>
                    <th>Imprisoned</th>
                    <th>Employed</th>
                    <th>Role</th>
                    <th>Date Of birth</th>
                </thead>
                <tbody class="body">
                    ${ rows }
                </tbody>
            </table>`;
}

table()*/