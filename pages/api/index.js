// pages/api/index.js
export default function handler(req, res) {
  res.status(200).json({
    message: '✅ A API está funcional!',
    rota: '/api/verificar-processo',
  });
}
