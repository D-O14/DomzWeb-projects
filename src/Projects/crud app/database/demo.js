import "./demo.css";
import { formatTime } from "@utils/date";
//import { initializeIcons } from "@assets/Icons/icons";

const id = document.querySelectorAll(".user-id");
const createdAt = document.querySelectorAll(".user-createdAt");

id.forEach(id => { id.textContent = crypto.randomUUID() });
createdAt.forEach(date => { date.textContent = formatTime(new Date()) });

//initializeIcons(document);