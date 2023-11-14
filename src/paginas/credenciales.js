// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
      apiKey: "AIzaSyD5Q4LD7F8ypr-za04xmDyAm9m4dyCedK8",
      authDomain: "medicamentos-9058a.firebaseapp.com",
      projectId: "medicamentos-9058a",
      storageBucket: "medicamentos-9058a.appspot.com",
      messagingSenderId: "76406187442",
      appId: "1:76406187442:web:1649203500985055ddb0ab",
      measurementId: "G-QE15KGQXCB"
    };

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;