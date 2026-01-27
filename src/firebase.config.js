// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALPIE4PNr6FeAvebTsC920wn8EAjkqmHk",
  authDomain: "myquizweb-eba58.firebaseapp.com",
  projectId: "myquizweb-eba58",
  storageBucket: "myquizweb-eba58.firebasestorage.app",
  messagingSenderId: "84104706100",
  appId: "1:84104706100:web:47d39f8b0561f40d147261"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);