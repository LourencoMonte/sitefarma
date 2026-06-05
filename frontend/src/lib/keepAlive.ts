/**
 * Mantém o backend Render acordado com ping periódico a cada 14 minutos.
 * Resolve o problema de cold start que causava 100% de erro nas requisições.
 */
const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://sitefarma.onrender.com';
const PING_INTERVAL_MS = 14 * 60 * 1000; // 14 minutos

export function startKeepAlive(): void {
  const ping = async () => {
    try {
      await fetch(`${BACKEND_URL}/medications/`, { method: 'GET' });
    } catch {
      // Silencia erros de ping — não deve impactar o usuário
    }
  };

  ping(); // Ping imediato ao carregar
  setInterval(ping, PING_INTERVAL_MS);
}
