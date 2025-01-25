// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOxyvA8S1fMMDJvlEIn9wROlrE7y04Dcs",
  authDomain: "todo-app-50391.firebaseapp.com",
  projectId: "todo-app-50391",
  storageBucket: "todo-app-50391.firebasestorage.app",
  messagingSenderId: "58521296591",
  appId: "1:58521296591:web:ee626b10a977a175efa1ba",
  measurementId: "G-NF5M9BBJKX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);