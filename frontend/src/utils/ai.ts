import axios from 'axios';

const token = import.meta.env.VITE_OPENROUTER_API_KEY

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    Authorization: `Bearer ${token}`,
    'HTTP-Referer': 'http://localhost:5173/',
    'X-Title': 'Edukita AI Feedback',
  },
});

export default openRouter;
