import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9i4e6eF3nOjMpJOakPK0dyk8ACC20Bs0",
  authDomain: "destinations-69159.firebaseapp.com",
  projectId: "destinations-69159",
  storageBucket: "destinations-69159.firebasestorage.app",
  messagingSenderId: "671231185839",
  appId: "1:671231185839:web:40cb98fbb444c26ec5955a",
  measurementId: "G-1ZH1PWXT2Y",
};

// Inicjalizacja aplikacji Firebase
const app = initializeApp(firebaseConfig);

// Eksportujemy usługi Authentication oraz bazy danych Firestore,
// żeby korzystać z nich w innych plikach (np. w formularzu logowania)
export const auth = getAuth(app);
export const db = getFirestore(app);
