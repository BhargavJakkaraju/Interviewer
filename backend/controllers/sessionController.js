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
        const session = await Session.find({ user: req.user.id }).sort({ createdAt: -1 }).populate('questions')
        res.status(200).json(session)
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
}

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate({ path: "questions", options: { sort: {isPinned: -1, createdAt: 1}}}).exec()

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found"})
        }

        res.status(200).json({ sucess: true, session })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error "})
    }
};

exports.deleteSession = async(req, res) => {
    try {
        const session = await Session.findById(req.params.id)

        if (!session) {
            return res.status(404).json({ success: false, message: "Session not found"});
        }

        if (session.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "User does not own this session"});
        }

        await Question.deleteMany({ session: session._id});
        await session.deleteOne();

        res.status(200).json({ message: "Deleted Session"})
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error " })
    }
};

