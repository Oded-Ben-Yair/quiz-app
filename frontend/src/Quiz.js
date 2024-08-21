import React, { useState, useEffect } from 'react';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timer, setTimer] = useState(45);
  const [scores, setScores] = useState([]); // Initialize state for scores

  useEffect(() => {
    fetch('http://localhost:3001/api/quiz/questions')
      .then(response => response.json())
      .then(data => {
        const shuffledQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 10); // Shuffle and select 10 questions
        setQuestions(shuffledQuestions);
        setCurrentQuestion(shuffledQuestions[0]);
        setTimer(45); // Set initial timer
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      moveToNextQuestion();
    }
  }, [timer]);

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect! The correct answer was: ${currentQuestion.answer}`);
    }

    // Highlight correct and incorrect options
    document.querySelectorAll('.option-button').forEach(button => {
      if (button.textContent === currentQuestion.answer) {
        button.classList.add('correct');
      } else if (button.textContent === selectedOption) {
        button.classList.add('incorrect');
      }
    });

    setTimeout(moveToNextQuestion, 3000); // Show feedback for 3 seconds
  };

  const moveToNextQuestion = () => {
    // Reset button classes
    document.querySelectorAll('.option-button').forEach(button => {
      button.classList.remove('correct', 'incorrect');
    });

    setFeedback('');
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentQuestion(questions[nextQuestionIndex]);
      setTimer(45); // Reset timer for the next question
    } else {
      setIsQuizOver(true);
    }
  };

  const handleNameChange = (e) => setPlayerName(e.target.value);

  const handleScoreSubmit = () => {
    fetch('http://localhost:3001/api/quiz/submit-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: playerName, score }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Score submission response:', data);
        alert('Score submitted successfully!');
        fetch('http://localhost:3001/api/quiz/scores')
          .then(response => response.json())
          .then(data => {
            setScores(data);
          })
          .catch(error => console.error('Error fetching scores:', error));
      })
      .catch(error => console.error('Error submitting score:', error));
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizOver(false);
    setTimer(45);
    setQuestions([]); // Clear questions to refetch them
    setFeedback('');
    setPlayerName('');
    
    fetch('http://localhost:3001/api/quiz/questions')
      .then(response => response.json())
      .then(data => {
        const shuffledQuestions = data.sort(() => 0.5 - Math.random()).slice(0, 10); // Shuffle and select 10 questions
        setQuestions(shuffledQuestions);
        setCurrentQuestion(shuffledQuestions[0]);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  const timerColor = timer > 15 ? '#4caf50' : timer > 5 ? '#ff9800' : '#f44336';

  if (isQuizOver) {
    return (
      <div className="quiz-container">
        <h1>Quiz Completed!</h1>
        <p>Your score: {score}</p>
        <input
          type="text"
          value={playerName}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="input-field"
        />
        <button className="submit-button" onClick={handleScoreSubmit}>Submit Score</button>

        {scores.length > 0 && (
          <div className="scoreboard">
            <h2>Top Scores</h2>
            <ul>
              {scores.map((score, index) => (
                <li key={index}>{index + 1}. {score.name} - {score.score}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="restart-button" onClick={restartQuiz}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Trivia Quiz</h1> {/* Changed from Quiz App to Trivia Quiz */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progressPercentage}%` }}></div>
      </div>
      <p>Question {currentQuestionIndex + 1} / 10</p>
      <p style={{ color: timerColor }}>Time remaining: {timer} seconds</p>
      {currentQuestion ? (
        <div>
          <p>{currentQuestion.question}</p>
          <ul>
            {currentQuestion.options.map((option, index) => (
              <li key={index}>
                <button className="option-button" onClick={() => handleAnswerClick(option)}>{option}</button>
              </li>
            ))}
          </ul>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Quiz;
