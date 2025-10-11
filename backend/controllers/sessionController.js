const Session = require('../models/Session');
const Question = require('../models/Question');


exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body
        const userId = req.user._id
        const session = await Session.create ({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
            questions

        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer
                });
                return question._id
            })
        )
        session.question = questionDocs;
        await session.save();

        res.status(201).json({success: true, session})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
};

exports.getMySession = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
}


exports.getSessionById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
};

exports.deleteSession = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
};

