import express from "express";
import bodyParser from "body-parser";
import { genkit } from "@genkit-ai/core";
import { googleAI } from "@genkit-ai/googleai";

const app = express();
app.use(bodyParser.json());

// Init Genkit with Gemini provider
genkit.use(googleAI({ apiKey: process.env.GOOGLE_API_KEY }));

app.post("/api/genkit", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt" });
    }

    // Call Gemini via Genkit
    const response = await genkit.run({
      model: "gemini-1.5-flash", // You can change to "gemini-1.5-pro" if needed
      input: prompt,
    });

    res.json({ text: response.output });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default app;
