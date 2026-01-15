const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", (e) => {
	e.preventDefault();

	validateInputs();
});

const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};

const setSucess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

const isValidEmail = (email) => {};

const validateInputs = () => {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();

	if (usernameValue === "") {
		setError(username, "Username is required");
	} else {
		setSucess(username);
	}

	if (emailValue === "") {
		setError(email, "Email is required");
	} else {
		setSucess(email);
	}
};

const toastBox = document.getElementById("toastBox");
const successMsg = '<img src="images/greencheck.jpeg">Sign in successful.';
const errorMsg = "Sign in failed, please try again.";
const invalidMsg = "Invalid input.";

function showToast(msg) {
	const toast = document.createElement("div");
	toast.classList.add("toast");
	toast.innerHTML = msg;
	toastBox.appendChild(toast);

	if (msg.includes("error")) {
		toast.classList.add("error");
	}

	if (msg.includes("Invalid")) {
		toast.classList.add("invalid");
	}

	setTimeout(() => {
		toast.remove();
	}, 6000);
}
