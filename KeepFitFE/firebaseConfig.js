import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {Text} from 'react-native'
import { textChangeRangeIsUnchanged } from 'typescript';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgGhbHsRJGMSURyT89Y1G9IEp4NayXyN0",
  authDomain: "keepfit-77e90.firebaseapp.com",
  projectId: "keepfit-77e90",
  storageBucket: "keepfit-77e90.appspot.com",
  messagingSenderId: "902282727634",
  appId: "1:902282727634:web:ded7878bfce4b5bad95d0b",
  measurementId: "G-Z2YE8CET63"
};

export default firebaseConfig



