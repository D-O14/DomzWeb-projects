const form = document.querySelector("form")
const name = document.getElementById("name");
const email = document.getElementById("email");
const age = document.getElementById("age");
const password = document.getElementById("password");
const button = document.querySelector("button");


button.addEventListener("click", (e) => {
    e.preventDefault()
})

button.onclick = function () {
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

const inputs = [];
inputs.push(name, email, age, password);

button.addEventListener("click", (e) => {
    e.preventDefault();
    if (name.value == "" || name.value == null) {
        const textError = document.createElement("p");
        textError.className = "textError";
        textError.textContent = "Name is required!";
        document.body.appendChild(textError);
        console.log(textError);
    } else {
        console.log(`Your name is ${ name.value }`)
    }

    if (email.value == "" || email.value == null) {
        const emailError = document.createElement("p");
        emailError.className = "textError";
        emailError.textContent = "E-mail is required!";
        document.body.appendChild(emailError);
        console.log(emailError);
    } else {
        console.log(`Your E-mail is ${ email.value }`)
    }

    if (age.value == "" || age.value == null) {
        const ageError = document.createElement("p");
        ageError.className = "textError";
        ageError.textContent = "Age is required";
        document.body.appendChild(ageError);
        console.log(ageError);
    } else {
        console.log(`You are ${ age.value } years old`)
    }

    if (password.value == "" || password.value == null) {
        const passError = document.createElement("p");
        passError.className = "textError";
        passError.textContent = "Password is required";
        document.body.appendChild(passError);
        console.log(passError);
    } else {
        console.log(`Your password is ${ password.value }`)
    }

})

console.log(localStorage);

const tableSection = document.getElementById("table")

const person1 = {
    id: crypto.randomUUID,
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

table()