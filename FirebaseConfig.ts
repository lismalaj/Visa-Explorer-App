// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTmrTe0IGXxjTKueADjMfIC98pz_yvHYg",
  authDomain: "visaexplorer-828a3.firebaseapp.com",
  projectId: "visaexplorer-828a3",
  storageBucket: "visaexplorer-828a3.appspot.com",
  messagingSenderId: "647634365855",
  appId: "1:647634365855:web:deb594047ea716f1fae1aa"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_AUTH, FIRESTORE_DB};