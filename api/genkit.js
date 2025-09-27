import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// ✅ Initialize Genkit with Google AI provider
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY, // put your key in Vercel Environment Variables
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

    // ✅ Use the correct Gemini model names for Genkit
    // Available models: gemini-1.5-pro, gemini-1.5-flash, gemini-2.0-pro, gemini-2.5-flash
    const result = await ai.generate({
      model: 'googleai/gemini-1.5-pro', // ← Changed from gemini-2.5-pro
      input: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    res.status(200).json({
      success: true,
      text: result.outputText,
    });
  } catch (err) {
    console.error('Genkit error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Unknown error occurred',
    });
  }
}
