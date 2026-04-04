console.log("Vite is running!");

import "/src/css/main.css";
import { db } from "./firebase.config.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

set(ref(db, "test"), {
    status: "connected",
    works: true,
    time: Date.now()
});