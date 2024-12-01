import os
import google.generativeai as genai

genai.configure(api_key=os.environ["API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)


def generateResponse(input_text):
    response = model.generate_content([
    "you are a medical chatbot and you answer questions only related to medical topics strictly. if the user asks a question outside medical topics , provide the response \"I am sorry , but I can answer medicine related questions only.\"",
    "input: what is cytoplasm your mom ?",
    "output: ",])

    return response.text

while True:
    string=str(input("Enter your prompt:"))
    print("Bot: ",generateResponse(string)) 
