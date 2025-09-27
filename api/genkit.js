import { genkit } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";

// Initialize Genkit with GoogleAI
genkit.use(googleAI({ apiKey: process.env.GOOGLE_API_KEY }));

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST supported" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Call Gemini with Genkit
    const response = await genkit.run({
      model: "gemini-1.5-flash",
      input: prompt,
    });

    res.status(200).json({ text: response.output });
  } catch (err) {
    console.error("Genkit Error:", err);
    res.status(500).json({ error: err.message });
  }
}
