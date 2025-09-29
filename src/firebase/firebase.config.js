// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx3cz-_9NshUDUpyXKXp6F3lzKkVTonJI",
  authDomain: "the-vagabond-tour.firebaseapp.com",
  projectId: "the-vagabond-tour",
  storageBucket: "the-vagabond-tour.firebasestorage.app",
  messagingSenderId: "519753082669",
  appId: "1:519753082669:web:0d474479a2fbcdf43555a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;