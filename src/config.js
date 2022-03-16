import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDocs, collection } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBlO9KA68Xclh6NSiq8igsjAyWY__uP76U",
    authDomain: "class-906aa.firebaseapp.com",
    projectId: "class-906aa",
    storageBucket: "class-906aa.appspot.com",
    messagingSenderId: "397132249400",
    appId: "1:397132249400:web:cbc2257bee8aad9a9be9cd",
    measurementId: "G-9DWDHNTMLW"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export { firebaseApp, db, doc, getDocs, collection };