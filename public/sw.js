// public/sw.js
self.addEventListener('push', function (event) {
  const data = event.data?.json() || {};
  const title = data.title || 'Atualização no processo';
  const options = {
    body: data.body || 'Verifique se houve alguma mudança.',
    icon: '/icon.png',
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
