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
const firebaseConfig = {
  apiKey: "AIzaSyBO7bV5HQXv9SQf8tInY0eE3Q352Ysjw_c",
  authDomain: "eventa-38b90.firebaseapp.com",
  projectId: "eventa-38b90",
  storageBucket: "eventa-38b90.appspot.com",
  messagingSenderId: "406569583083",
  appId: "1:406569583083:web:8685ab77fcfe28a99a59ae",
  measurementId: "G-X36V073M2J",
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
