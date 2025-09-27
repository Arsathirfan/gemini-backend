import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Initialize Genkit with Google AI
const ai = genkit({
  plugins: [googleAI()],
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST method allowed' });
    }

    const { prompt } = req.body || {};
    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt in request body' });
    }

    // Generate content with Gemini
    const result = await ai.generate({
      model: 'googleai/gemini-1.5-flash',
      prompt: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    res.status(200).json({
      success: true,
      text: result.text,
    });
  } catch (err) {
    console.error('Genkit error:', err);
    res.status(500).json({ 
      success: false,
      error: err.message || 'Unknown error occurred',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
