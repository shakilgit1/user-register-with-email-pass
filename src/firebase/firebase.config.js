// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxI-wfu1YIQAVwN7ofLLv66Za4UTvyQPg",
  authDomain: "email-password-auth-3bdb5.firebaseapp.com",
  projectId: "email-password-auth-3bdb5",
  storageBucket: "email-password-auth-3bdb5.appspot.com",
  messagingSenderId: "556619252877",
  appId: "1:556619252877:web:58e41c290e65d699090ec4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;