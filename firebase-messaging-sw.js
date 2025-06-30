// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCTEAdA2dFI1x0PI99ICJ6njshYFHo1Fsw",
  authDomain: "giustizia-monitor.firebaseapp.com",
  projectId: "giustizia-monitor",
  storageBucket: "giustizia-monitor.firebasestorage.app",
  messagingSenderId: "549601134780",
  appId: "1:549601134780:web:e44ed502e864c8b9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Mensagem recebida:', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: '/icon.png' // coloque um ícone pequeno na pasta public
  });
});
