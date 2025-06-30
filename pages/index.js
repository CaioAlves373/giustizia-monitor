// pages/index.js
import { useEffect, useState } from 'react';

export default function Home() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [pushAtivo, setPushAtivo] = useState(false);

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

  async function ativarNotificacoes() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      alert('Seu navegador não suporta notificações push.');
      return;
    }

    try {
      // Solicita permissão para notificações
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permissão para notificações negada.');
        return;
      }

      // Registra o service worker
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('✅ Service Worker registrado:', registration);

      // Espera o service worker estar ativo
      await new Promise((resolve) => {
        if (registration.active) {
          resolve();
        } else if (registration.installing) {
          registration.installing.addEventListener('statechange', (e) => {
            if (e.target.state === 'activated') resolve();
          });
        } else if (registration.waiting) {
          registration.waiting.addEventListener('statechange', (e) => {
            if (e.target.state === 'activated') resolve();
          });
        }
      });

      // Inscreve para receber notificações push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          'BMpwcBsA_TDTSWbbRCbphCupYC8uN-rCZL2b8eM4z68E8r2e9cYTSgNMgBLvLERgW83-RqM7HGKY4W_olgaFEFs',
      });

      console.log('🔔 Inscrição feita:', subscription);

      // Envia a inscrição para seu backend salvar
      const res = await fetch('/api/salvar-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscription }),
      });

      if (res.ok) {
        setPushAtivo(true);
        alert('Notificações ativadas com sucesso!');
      } else {
        throw new Error('Falha ao salvar inscrição');
      }
    } catch (error) {
      console.error('Erro ao ativar notificações:', error);
      alert('Erro ao ativar notificações.');
    }
  }

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>📋 Giustizia Monitor</h1>

      <button onClick={ativarNotificacoes} disabled={pushAtivo}>
        {pushAtivo ? '🔔 Notificações Ativas' : 'Ativar Notificações Push'}
      </button>

      <hr style={{ margin: '2rem 0' }} />

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
