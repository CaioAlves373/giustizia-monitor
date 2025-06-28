import { buscarProcesso } from '../monitor.js';

export default async function handler(req, res) {
  try {
    const resultado = await buscarProcesso();

    if (resultado) {
      res.status(200).json({
        message: '✅ Verificação executada com sucesso.',
        data: resultado,
      });
    } else {
      res.status(404).json({ message: 'Nenhum processo encontrado.' });
    }
  } catch (error) {
    console.error('Erro na verificação:', error);
    res.status(500).json({ message: '❌ Erro ao executar a verificação.', error: error.message });
  }
}
