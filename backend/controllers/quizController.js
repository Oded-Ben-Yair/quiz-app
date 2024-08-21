import Question from '../models/questionModel.js';
import Score from '../models/scoreModel.js';

export const getQuestions = async (req, res) => {
    try {
        // Fetch random questions from each difficulty level
        const easyQuestions = await Question.aggregate([{ $match: { difficulty: 'easy' } }, { $sample: { size: 3 } }]);
        const mediumQuestions = await Question.aggregate([{ $match: { difficulty: 'medium' } }, { $sample: { size: 3 } }]);
        const hardQuestions = await Question.aggregate([{ $match: { difficulty: 'hard' } }, { $sample: { size: 4 } }]);

        const questions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const submitScore = async (req, res) => {
  try {
      const { name, score } = req.body;
      const newScore = new Score({ name, score });
      await newScore.save();
      res.status(200).json({ message: 'Score submitted successfully!' });
  } catch (error) {
      console.error('Error submitting score:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};

// Function to get the top scores for the scoreboard
export const getScores = async (req, res) => {
  try {
      const scores = await Score.find().sort({ score: -1 }).limit(10);
      res.status(200).json(scores);
  } catch (error) {
      console.error('Error fetching scores:', error);
      res.status(500).json({ message: 'Server Error' });
  }
};



// Function to check answers and calculate score
export const submitAnswers = async (req, res) => {
  try {
    const userAnswers = req.body.answers; // Assuming the format { questionId: selectedOptionIndex, ... }
    const questionIds = Object.keys(userAnswers);

    // Fetch the corresponding questions based on IDs received
    const questions = await Question.find({
      '_id': { $in: questionIds }
    });

    let score = 0;
    questions.forEach(question => {
      const correctAnswer = question.options[question.correctAnswer];
      const userAnswer = question.options[userAnswers[question._id]];
      if (correctAnswer === userAnswer) {
        score++; // Increment score for each correct answer
      }
    });

    res.json({
      score,
      total: questions.length,
      correct: score,
      incorrect: questions.length - score
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing answers", error });
  }
};
