import { chat, genkit } from 'genkit/beta';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';

// Initialize Genkit with Google AI
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY, // Put your key in environment variables
    }),
  ],
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

    // Generate text using Gemini 2.0 Flash model with beta syntax
    const result = await chat({
      model: gemini20Flash,
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
    });
  }
}
