import { ai } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";

// Initialize Google AI provider
ai.use(googleAI({ apiKey: process.env.GOOGLE_API_KEY }));

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { prompt } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Run Gemini with Genkit
    const result = await ai.generate({
      model: "gemini-1.5-flash",
      input: prompt,
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Genkit error:", err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
}
