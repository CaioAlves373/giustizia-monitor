// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTEAdA2dFI1x0PI99ICJ6njshYFHo1Fsw",
  authDomain: "giustizia-monitor.firebaseapp.com",
  projectId: "giustizia-monitor",
  storageBucket: "giustizia-monitor.firebasestorage.app",
  messagingSenderId: "549601134780",
  appId: "1:549601134780:web:e44ed502e864c8b9b828b9"
};

// Inicializa o app e exporta o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
