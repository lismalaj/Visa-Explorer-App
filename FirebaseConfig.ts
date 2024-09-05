// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "**************",
  authDomain: "visaexplo***",
  projectId: "visaexplo***",
  storageBucket: "visaexp****",
  messagingSenderId: "647*****",
  appId: "1:64******************"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const FIRESTORE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_AUTH, FIRESTORE_DB};
