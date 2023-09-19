import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCRBGEBvqvAjJu9m39Hell7PtVW8Ys78s8",
    authDomain: "react-firebase-crud-65641.firebaseapp.com",
    projectId: "react-firebase-crud-65641",
    storageBucket: "react-firebase-crud-65641.appspot.com",
    messagingSenderId: "986001101098",
    appId: "1:986001101098:web:4c3c591dea604c82cdce53"
};

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
export const db = getFirestore(app)