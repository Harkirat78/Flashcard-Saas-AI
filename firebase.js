// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirebase, getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH-6eUy6sFxn-XIU_m6oEeLFaVGnXPFsY",
  authDomain: "flashcardsaas-1dffd.firebaseapp.com",
  projectId: "flashcardsaas-1dffd",
  storageBucket: "flashcardsaas-1dffd.appspot.com",
  messagingSenderId: "459431297282",
  appId: "1:459431297282:web:483bdfdea53751bf39821b",
  measurementId: "G-82XV6VC8MV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app)

export {db}