import openRouter from './ai';

export const generateFeedbackAI = async (grade?: number): Promise<string> => {
  let prompt = '';

  if (grade === undefined || grade === null) {
    prompt = 'Write a short positive and educational feedback for a student in general. Maximum 70 characters.';
  } else if (grade < 50) {
    prompt = `The student scored ${grade}. Write a short motivational and educational feedback to encourage them. Maximum 70 characters.`;
  } else if (grade < 100) {
    prompt = `The student scored ${grade}. Write a short supportive feedback to help them improve further. Maximum 70 characters.`;
  } else {
    prompt = 'The student scored a perfect 100. Write a short encouraging feedback to help them maintain their performance. Maximum 70 characters.';
  }

  const response = await openRouter.post('/chat/completions', {
    model: import.meta.env.VITE_OPENROUTER_MODEL,
    messages: [
      { role: 'system', content: 'You are a wise and positive teacher.' },
      { role: 'user', content: prompt },
    ],
  });

  return response.data.choices[0]?.message?.content.trim() || '';
};
