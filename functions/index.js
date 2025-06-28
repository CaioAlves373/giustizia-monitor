const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.monitorarProcessosAgendado = functions.pubsub
  .schedule("every 3 hours")
  .timeZone("America/Sao_Paulo") // Brasil
  .onRun(async (context) => {
    console.log("🕒 Rodando verificação automática...");

    try {
      const snapshot = await db.collection("processos").get();

      if (snapshot.empty) {
        console.log("Nenhum processo encontrado.");
        return null;
      }

      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("📄 Processo:");
        console.log(`🧾 Processo: ${data.id}`);
        console.log(`📍 Tribunal: ${data.registro}`);
        console.log(`📆 Última verificação: ${data.timestamp.toDate()}`);
        console.log(`🔗 Link: ${data.url}`);
        console.log("----------");
      });

      return null;
    } catch (error) {
      console.error("Erro ao buscar processos:", error);
      return null;
    }
  });
