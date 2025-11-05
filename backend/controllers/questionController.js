const Question = require('../models/Question')
const Session = require('../models/Session')

exports.addQuestionsToSession = async (req, res) => {
    try {
        const { sessionId, questions } = req.body

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(400).json({ message: "Invalid Input Data"})
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found"})
        }

        const createdQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId, 
                question: q.question,
                answer: q.answer
            }))
        )

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save()

        res.status(201).json(createdQuestions)
    } catch( error) {
        console.error("Add Questions Error:", error)
        res.status(500).json({ success: false,  message: "Internal Server error", error: error.message })
    }
}

exports.togglePinQuestions = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id)

        if (!question){
            return res.status(404).json({ message: "Question not found"})
        }

        question.isPinned = !question.isPinned
        await question.save()

        res.status(200).json({ success: true, question});
    } catch( error) {
        console.error("Toggle Pin Error:", error)
        res.status(500).json({ success: false,  message: "Internal Server error", error: error.message })
    }
}

exports.updateQuestionNote = async (req, res) => {
    try {
        const questionId = req.params.id 
        const { note } = req.body

        const question = await Question.findById(questionId)
        if (!question) {
            return res.status(404).json({ success: false,  message: "Question not found"})
        }

        question.note = note || ""

        await question.save()

        res.status(200).json({ success: true, question})

    } catch( error) {
        console.error("Update Note Error:", error)
        res.status(500).json({ success: false,  message: "Internal Server error", error: error.message })
    }
}