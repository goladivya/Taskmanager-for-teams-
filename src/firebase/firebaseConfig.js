import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnFdWeT7XNUOT-V-MTC2aDMOOqDFItea8",
  authDomain: "todo-5b400.firebaseapp.com",
  projectId: "todo-5b400",
  storageBucket: "todo-5b400.firebasestorage.app",
  messagingSenderId: "464324634092",
  appId: "1:464324634092:web:15b9f8730a74917c9eccc9",
  measurementId: "G-J3GMXW132W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
