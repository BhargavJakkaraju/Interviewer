const express = require('express')
const { togglePinQuestions, updateQuestionNote, addQuestionsToSession } = require('../controllers/questionController')
const { protect } = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/add', protect, addQuestionsToSession)
router.post('/:id', protect, togglePinQuestions)
router.post('/:id', protect, updateQuestionNote)

module.exports = router;
