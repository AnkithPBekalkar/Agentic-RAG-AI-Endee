import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

model = genai.GenerativeModel("gemini-2.5-flash")

def call_gemini(prompt: str):
    response = model.generate_content(prompt)
    return response.text.strip()
