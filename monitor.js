// monitor.js
import { db } from './firebase.js';
import { doc, getDoc } from 'firebase/firestore';

async function buscarProcesso() {
  const docId = "gkBrxTRhjyQB4APeNWhi";
  const docRef = doc(db, "processos", docId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();

      // ✅ Log (opcional)
      console.log(`🧾 Processo: ${data.id}`);
      console.log(`📍 Tribunal: ${data.registro}`);
      console.log(`📆 Última verificação: ${data.timestamp.toDate()}`);
      console.log(`🔗 Link: ${data.url}`);
      console.log("----------");

      // ✅ Retornar os dados para a API
      return {
        id: data.id,
        registro: data.registro,
        timestamp: data.timestamp.toDate(),
        url: data.url,
      };
    } else {
      console.log("Nenhum documento encontrado com esse ID.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    throw error;
  }
}

export { buscarProcesso };
