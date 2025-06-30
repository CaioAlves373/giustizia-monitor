// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCTEAdA2dFI1x0PI99ICJ6njshYFHo1Fsw",
  authDomain: "giustizia-monitor.firebaseapp.com",
  projectId: "giustizia-monitor",
  storageBucket: "giustizia-monitor.firebasestorage.app",
  messagingSenderId: "549601134780",
  appId: "1:549601134780:web:e44ed502e864c8b9b828b9"
};

const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// Push Messaging
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

async function solicitarPermissaoENotificar() {
  if (!messaging) {
    alert("Firebase Messaging não está disponível neste ambiente.");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Permissão negada para notificações.");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BMpwcBsA_TDTSWbbRCbphCupYC8uN-rCZL2b8eM4z68E8r2e9cYTSgNMgBLvLERgW83-RqM7HGKY4W_olgaFEFs"
    });

    console.log("🔑 Token FCM gerado:", token);
    alert("✅ Notificações ativadas com sucesso!");

    // Aqui você pode futuramente salvar esse token no Firestore, se quiser

  } catch (error) {
    console.error("Erro ao ativar notificações:", error);
    alert("❌ Erro ao ativar notificações.");
  }
}

export { db, messaging, getToken, onMessage, solicitarPermissaoENotificar };
