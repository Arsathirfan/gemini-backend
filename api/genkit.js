import { genkit } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";

const ai = genkit({
  plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY })],
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    const result = await ai.generate({
      model: "gemini-2.0-flash",
      input: prompt,
    });

    res.status(200).json({ text: result.output[0].content });
  } catch (err) {
    console.error("Genkit Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
