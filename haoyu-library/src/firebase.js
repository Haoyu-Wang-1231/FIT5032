// Import the functions you need from the SDKs you need
// import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBL_cqLIUv-GLnLxlx0DHIbu60CWZWB2DU",
  authDomain: "fit5032-week6-22440.firebaseapp.com",
  projectId: "fit5032-week6-22440",
  storageBucket: "fit5032-week6-22440.firebasestorage.app",
  messagingSenderId: "416533769590",
  appId: "1:416533769590:web:88bda4e2a570cd62545e57"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);


export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
