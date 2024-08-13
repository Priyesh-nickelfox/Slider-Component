// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjEsInfdph3QpRkLl89EzSdHy8QMZUp6Y",
  authDomain: "login-auth-50b97.firebaseapp.com",
  projectId: "login-auth-50b97",
  storageBucket: "login-auth-50b97.appspot.com",
  messagingSenderId: "124449295692",
  appId: "1:124449295692:web:b536c4b67197ec1509d3e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// This line of code is like setting up a key that you can use to manage who can sign in or out of your app.
const auth = getAuth(app);

export default auth;