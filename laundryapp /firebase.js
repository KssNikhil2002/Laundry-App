// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUaJ6sjsP7EoETm2ZiCn3iVFSlhVPfyOY",
  authDomain: "laundryapp-4e6c4.firebaseapp.com",
  projectId: "laundryapp-4e6c4",
  storageBucket: "laundryapp-4e6c4.appspot.com",
  messagingSenderId: "761361832923",
  appId: "1:761361832923:web:75f5bc0bf2fc9d5f74a5fe"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const db = getFirestore();

