// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await fetch('/api/verificar-processo');
        const json = await res.json();

        if (res.ok) {
          setDados(json.data);
        } else {
          setErro(json.message);
        }
      } catch (err) {
        setErro('Erro ao buscar dados.');
        console.error(err);
      }
    }

    carregarDados();
  }, []);

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>📋 Giustizia Monitor</h1>

      {erro && <p style={{ color: 'red' }}>❌ {erro}</p>}

      {dados ? (
        <div>
          <p><strong>🧾 Processo:</strong> {dados.id}</p>
          <p><strong>📍 Tribunal:</strong> {dados.registro}</p>
          <p><strong>📅 Última verificação:</strong> {new Date(dados.timestamp).toLocaleString()}</p>
          <p><strong>🔗 Link:</strong> <a href={dados.url} target="_blank" rel="noopener noreferrer">Acessar Processo</a></p>
        </div>
      ) : (
        !erro && <p>⏳ Carregando dados...</p>
      )}
    </main>
  );
}
