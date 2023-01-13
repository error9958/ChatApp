import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEqbssbI7fwzJHm_4bGIXXVrMz8WeOt_M",
  authDomain: "chatapp-61d74.firebaseapp.com",
  projectId: "chatapp-61d74",
  storageBucket: "chatapp-61d74.appspot.com",
  messagingSenderId: "140452097198",
  appId: "1:140452097198:web:a46a45380c0b2ecd31d13f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

