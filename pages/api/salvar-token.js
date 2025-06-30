// pages/api/salvar-token.js
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { subscription } = req.body;

  if (!subscription || !subscription.endpoint) {
    return res.status(400).json({ message: 'Inscrição inválida' });
  }

  try {
    await addDoc(collection(db, 'subscriptions'), {
      subscription,
      createdAt: serverTimestamp(),
    });

    res.status(201).json({ message: 'Token salvo com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar token:', error);
    res.status(500).json({ message: 'Erro ao salvar token' });
  }
}
