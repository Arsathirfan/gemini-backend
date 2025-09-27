import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

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

    // Generate text using the correct current Genkit syntax
    const response = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'), // ✅ Use googleAI.model() method
      prompt: prompt, // ✅ Simple prompt format
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    res.status(200).json({
      success: true,
      text: response.text, // ✅ Use response.text property
    });
  } catch (err) {
    console.error('Genkit error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'Unknown error occurred',
    });
  }
}
