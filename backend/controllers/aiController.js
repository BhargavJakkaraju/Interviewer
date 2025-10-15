const { GoogleGenAI } = require('@google/genai')
const { conceptExplainPrompt } = require('../utils/prompts')

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })