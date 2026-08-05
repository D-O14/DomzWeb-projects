import { initializeApp } from "firebase/app";
import { getDatabase }  from "firebase/database";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA4mEdLnAaIUkHoRHQDwcAO0XQcEMm79xc",
  authDomain: "domzweb-projects.firebaseapp.com",
  projectId: "domzweb-projects",
  databaseURL: "https://domzweb-projects-default-rtdb.firebaseio.com/",
  storageBucket: "domzweb-projects.firebasestorage.app",
  messagingSenderId: "790562424717",
  appId: "1:790562424717:web:4b552c94385c7bfe2edfc4",
  measurementId: "G-BQVKFWCVBV"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);