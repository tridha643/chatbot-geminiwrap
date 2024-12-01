const { Configuration, GenerativeModel } = require('google-generativeai');
require('dotenv').config();

const apiKey = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: apiKey,
});

const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  top_k: 40,
  max_output_tokens: 8192,
  response_mime_type: 'text/plain',
};

const model = new GenerativeModel({
  modelName: 'gemini-1.5-flash',
  generationConfig: generationConfig,
});

async function generateResponse(inputText) {
  const response = await model.generateContent([
    'you are a medical chatbot and you answer questions only related to medical topics strictly. if the user asks a question outside medical topics , provide the response "I am sorry , but I can answer medicine related questions only."',
    'input: what is cytoplasm your mom ?',
    'output: ',
  ]);
  return response.text;
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question('Enter your prompt: ', async (input) => {
  const response = await generateResponse(input);
  console.log('Bot: ', response);
  readline.close();
});