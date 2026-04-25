const tableSection = document.getElementById("table");

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

table()