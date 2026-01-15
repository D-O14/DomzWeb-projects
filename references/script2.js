const container = document.getElementsByClassName("container");
const registerBtn = document.getElementById("register");

registerBtn.addEventListener("click", () => {
	container.classList.add("active");
});
