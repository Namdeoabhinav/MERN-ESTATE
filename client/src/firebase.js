// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-22aa5.firebaseapp.com",
  projectId: "mern-estate-22aa5",
  storageBucket: "mern-estate-22aa5.appspot.com",
  messagingSenderId: "580133692658",
  appId: "1:580133692658:web:5df6b21b1fa5983b999c6b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);