// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2f442.firebaseapp.com",
  projectId: "mern-estate-2f442",
  storageBucket: "mern-estate-2f442.firebasestorage.app",
  messagingSenderId: "7337921856",
  appId: "1:7337921856:web:aebe81879b0f2475a2bea5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);