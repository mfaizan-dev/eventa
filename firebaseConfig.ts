// Import necessary Firebase modules
import { initializeApp } from "firebase/app";
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} = require("firebase/firestore");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOcd7L5DswUTS8mCr54DFIY3oGU4tTAcs",
  authDomain: "eventa-d893e.firebaseapp.com",
  projectId: "eventa-d893e",
  storageBucket: "eventa-d893e.appspot.com",
  messagingSenderId: "127597181045",
  appId: "1:127597181045:web:c52a9f6e547eef06a6603c",
  measurementId: "G-XHC831H6XG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export {
  db,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
};
