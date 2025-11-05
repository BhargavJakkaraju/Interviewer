const { GoogleGenerativeAI } = require('@google/generative-ai')
const { conceptExplainPrompt, questionAnswerPrompt } = require('../utils/prompts')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generateInterviewQuestions = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body

        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "missing request data" })
        }

        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
        const result = await model.generateContent(prompt)
        const response = result.response

        let rawText = response.text()
        const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        const data = JSON.parse(cleanedText)

        res.status(200).json(data)
    } catch (error) {
        console.error("AI Generation Error:", error)
        res.status(500).json({ message: "Failed to generate questions", error: error.message })
    }
}

const generateConceptExplanation = async (req, res) => {
    try {
        const { question } = req.body

        if (!question) {
            return res.status(400).json({ message: "Missing required Fields " })
        }

        const prompt = conceptExplainPrompt(question)
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })
        const result = await model.generateContent(prompt)
        const response = result.response

        let rawText = response.text()
        const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        const data = JSON.parse(cleanedText)

        res.status(200).json(data)

    } catch (error) {
        console.error("AI Generation Error:", error)
        res.status(500).json({ message: "Failed to generate explanation", error: error.message })
    }
}
module.exports = { generateConceptExplanation, generateInterviewQuestions }