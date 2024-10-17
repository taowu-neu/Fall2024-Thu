// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_ULaflCWAorZY6WlfWtEx36_A2DbL1Og",
  authDomain: "project-5692792490226174028.firebaseapp.com",
  projectId: "project-5692792490226174028",
  storageBucket: "project-5692792490226174028.appspot.com",
  messagingSenderId: "1064410914496",
  appId: "1:1064410914496:web:7f43cf9c87dfbbeb3a5725",
  measurementId: "G-J4G9C225XP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);