// webpush.js
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:seu-email@email.com',
  'BMpwcBsA_TDTSWbbRCbphCupYC8uN-rCZL2b8eM4z68E8r2e9cYTSgNMgBLvLERgW83-RqM7HGKY4W_olgaFEFs',
  'CHAVE_PRIVADA_VAPID'
);

export default webpush;
