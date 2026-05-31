const form = document.querySelector("form");
const nameInp = document.getElementById("nameInp");
const userNameInp = document.getElementById("userNameInp");
const emailInp = document.getElementById("emailInp");
const passInp = document.getElementById("passInp");
const bio = document.getElementById("bio");
const submit = document.querySelector("button");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    //document.title = "Creating Account...";
    accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    const profile = {
        name: nameInp.value,
        username: userNameInp.value,
        email: emailInp.value,
        password: passInp.value,
        bio: bio.value,
    };

    accounts.push(profile);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    console.log(profile);
});

