const form = document.querySelector("form")
const name = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const password = document.getElementById("password");
const button = document.querySelector("button");

const namePattern = /^[A-Za-z\s]+$/gi;
const agePattern = /^(?:1[0-1][0-9]|120|[1-9]?[0-9])$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*[_@#$%^&*!]).{6,12}$/;

const inputs = [];
inputs.push(name, email, age, password);

button.addEventListener("click", (e) => {
    e.preventDefault();
    
    let isValid = true;

    if (name.value == "" || name.value == null) {
        showError(name, "Name is required")
    } else if (!namePattern.test(name.value)) {
        showError(name, "Name can only be made up of letters!");
    } else {
        clearError(name)
        console.log(`Your name is ${ name.value }`)
    }

    if (email.value == "" || email.value == null) {
        showError(email, "Email is required")
    } else if (!email.value.includes("@")) {
        showError(email,"E-mail must include @!");    
    } else {
        clearError(email)
        console.log(`Your E-mail is ${ email.value }`)
    }

    if (age.value == "" || age.value == null) {
        showError(age, "Age is required");
    } else if (age.value < 18) {
        showError(age, "You cannot fill this form!")
    } else {
        clearError(age)
        console.log(`You are ${ age.value } years old`)
    }

    if (password.value == "" || password.value == null) {
        showError(password, "Password is required")
    } else if (!passwordPattern.test(password.value)) {
        showError(password, "Password pattern is not matched")
    } else {
        clearError(password)
        console.log(`Your password is ${ password.value }`)
    }

    if (isValid) {
        const user = {
            name: name.value,
            email: email.value,
            age: age.value,
            password: password.value,
        }

        const user_serialized = JSON.stringify(user);
        localStorage.setItem("user", user_serialized);
        console.log(localStorage)
        
    }
})

name.addEventListener("input", () => {
    name.value = name.value.replace(/\b\w/g, char => char.toUpperCase());
})

age.addEventListener("input", () => {
    if (age.value > 120) {
        age.value = 120;
    }
    age.value = age.value.replace(/\D/g, "")
})

function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || error.tagName !== "P") {
        error = document.createElement("p");
        error.className = "textError";
        input.insertAdjacentElement("afterend", error)
    }

    error.textContent = message
    input.classList.add("error")
}

function clearError(input) {
    const error = input.nextElementSibling;
    if (error && error.tagName === "p") {
        error.style.display = "none";
    }
    input.classList.remove("error")
}


console.log(localStorage);

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