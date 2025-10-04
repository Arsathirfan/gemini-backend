from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os

app = FastAPI()

# ✅ Get the Gemini API key from environment variable
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("⚠️ GEMINI_API_KEY not found in environment variables.")

# Gemini API endpoint
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# Request body model
class PromptRequest(BaseModel):
    prompt: str


# ✅ POST endpoint — Send prompt to Gemini and return response
@app.post("/generate_new")
def generate_new(req: PromptRequest):
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": req.prompt}
                ]
            }
        ]
    }

    response = requests.post(GEMINI_URL, headers=headers, json=payload)

    if response.status_code == 200:
        data = response.json()
        try:
            ai_text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"response": ai_text}
        except (KeyError, IndexError):
            return {"error": "Unexpected API response format", "raw": data}
    else:
        return {
            "error": "Gemini API call failed",
            "status_code": response.status_code,
            "details": response.text,
        }


# ✅ GET endpoint — Health check or home route
@app.get("/")
def home():
    return {"message": "FastAPI Gemini backend is running!"}
