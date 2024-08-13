// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRsURz3xJ2QDf7MlmLuG3l6ChIZrXZTeQ",
  authDomain: "astro-d7240.firebaseapp.com",
  projectId: "astro-d7240",
  storageBucket: "astro-d7240.appspot.com",
  messagingSenderId: "677006972917",
  appId: "1:677006972917:web:d82f68ecbce85154d632bc",
  measurementId: "G-QY0DFMQCY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
// const analytics = getAnalytics(app);