// pages/index.js
export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>📊 Giustizia Monitor</h1>
      <p>✅ A API está funcional!</p>
      <p>
        Clique aqui para consultar:{" "}
        <a href="/api/verificar-processo" style={{ color: 'blue' }}>
          /api/verificar-processo
        </a>
      </p>
    </div>
  );
}
