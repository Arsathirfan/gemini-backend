import { genkit } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";

// Initialize Genkit once
genkit.use(googleAI({ apiKey: process.env.GOOGLE_API_KEY }));

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Ask Gemini
    const result = await genkit.run({
      model: "gemini-1.5-flash",
      input: prompt,
    });

    // Genkit returns a structured object → safest is to `JSON.stringify`
    return res.status(200).json(result);
  } catch (err) {
    console.error("Genkit crashed:", err);
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
