// public/firebase-messaging-sw.js

// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCTEAdA2dFI1x0PI99ICJ6njshYFHo1Fsw",
  authDomain: "giustizia-monitor.firebaseapp.com",
  projectId: "giustizia-monitor",
  storageBucket: "giustizia-monitor.firebasestorage.app",
  messagingSenderId: "549601134780",
  appId: "1:549601134780:web:e44ed502e864c8b9b828b9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Mensagem recebida em segundo plano:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png'
  });
});
