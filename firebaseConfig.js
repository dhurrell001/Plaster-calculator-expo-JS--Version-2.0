// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBERdH9vMUkFda_2Z9RRY5fKDWuTXtHV7Y",
  authDomain: "plastercalculator.firebaseapp.com",
  projectId: "plastercalculator",
  storageBucket: "plastercalculator.firebasestorage.app",
  messagingSenderId: "390633248515",
  appId: "1:390633248515:web:50c3f01cc9ab35fffd7b36",
  measurementId: "G-V8WYHZK5SJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Test Firebase
console.log("Firebase initialized:", app.name);

export { storage, ref, getDownloadURL };
