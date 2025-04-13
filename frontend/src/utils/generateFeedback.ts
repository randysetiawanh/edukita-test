import openRouter from './ai';

export const generateFeedbackAI = async (grade?: number): Promise<string> => {
  let prompt = '';

  if (grade === undefined || grade === null) {
    prompt = 'Buatkan feedback singkat dari guru untuk siswa secara umum. Gunakan nada positif dan edukatif. Maksimal 70 karakter.';
  } else if (grade < 50) {
    prompt = `Nilai siswa adalah ${grade}. Buat feedback motivatif, edukatif, dan positif. Nada penyemangat. Maksimal 70 karakter.`;
  } else if (grade < 100) {
    prompt = `Nilai siswa adalah ${grade}. Buat feedback dukungan semangat untuk mengejar ketertinggalan. Maksimal 70 karakter.`;
  } else {
    prompt = 'Nilai siswa adalah 100. Buat feedback positif untuk mempertahankan prestasi. Maksimal 70 karakter.';
  }

  const response = await openRouter.post('/chat/completions', {
    model: import.meta.env.VITE_OPENROUTER_MODEL,
    messages: [
      { role: 'system', content: 'Kamu adalah guru yang bijak dan positif.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.data.choices[0]?.message?.content.trim() || '';
};
