import express from 'express';
import { getQuestions, submitAnswers, submitScore, getScores } from '../controllers/quizController.js';

const router = express.Router();

router.get('/questions', getQuestions);
router.post('/submit', submitAnswers);
router.post('/submit-score', submitScore); // New route for score submission
router.get('/scores', getScores); // New route for fetching the scoreboard

export default router;
