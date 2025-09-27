import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GOOGLE_API_KEY })],
});

export default async function handler(req, res) {
  try {
    const models = ai.listModels(); // List models Genkit knows
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
