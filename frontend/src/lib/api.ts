import axios from 'axios';

// Instância para chamadas da API Next.js localmente (Client-side)
const api = axios.create({
  baseURL: '/api/proxy', // Chamadas do React Client Componentes vão pro Proxy Next.js
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

