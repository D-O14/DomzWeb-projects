console.log("Vite is running!");

import "@styles/base/main.css";
import { db } from "./config/firebase.config.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

set(ref(db, "test"), {
    status: "connected",
    works: true,
    time: Date.now()
});