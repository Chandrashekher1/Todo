// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { api_key } from "./constant";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: api_key,
  authDomain: "todo1-5e7a8.firebaseapp.com",
  projectId: "todo1-5e7a8",
  storageBucket: "todo1-5e7a8.firebasestorage.app",
  messagingSenderId: "282091945054",
  appId: "1:282091945054:web:ef261d9d9a1b21c2c8c8cf",
  measurementId: "G-1R8D50NVM9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);