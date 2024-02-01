import React, { useState, useEffect } from 'react';
import './index.css';

const questions = [
 {
    questionText: 'What is the capital of Japan?',
    answerOptions: [
      { answerText: 'Beijing', isCorrect: false },
      { answerText: 'Seoul', isCorrect: false },
      { answerText: 'Tokyo', isCorrect: true },
      { answerText: 'Bangkok', isCorrect: false },
    ],
  },
  {
    questionText: 'Who wrote "Romeo and Juliet"?',
    answerOptions: [
      { answerText: 'Charles Dickens', isCorrect: false },
      { answerText: 'William Shakespeare', isCorrect: true },
      { answerText: 'Jane Austen', isCorrect: false },
      { answerText: 'Mark Twain', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the largest planet in our solar system?',
    answerOptions: [
      { answerText: 'Venus', isCorrect: false },
      { answerText: 'Jupiter', isCorrect: true },
      { answerText: 'Saturn', isCorrect: false },
      { answerText: 'Mars', isCorrect: false },
    ],
  },
  {
    questionText: 'In which year did the Titanic sink?',
    answerOptions: [
      { answerText: '1910', isCorrect: false },
      { answerText: '1912', isCorrect: true },
      { answerText: '1915', isCorrect: false },
      { answerText: '1920', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the largest mammal on Earth?',
    answerOptions: [
      { answerText: 'Elephant', isCorrect: false },
      { answerText: 'Blue Whale', isCorrect: true },
      { answerText: 'Giraffe', isCorrect: false },
      { answerText: 'Hippopotamus', isCorrect: false },
    ],
  },
  {
    questionText: 'Who wrote "The Great Gatsby"?',
    answerOptions: [
      { answerText: 'F. Scott Fitzgerald', isCorrect: true },
      { answerText: 'Ernest Hemingway', isCorrect: false },
      { answerText: 'J.K. Rowling', isCorrect: false },
      { answerText: 'George Orwell', isCorrect: false },
    ],
  },
  {
    questionText: 'Which planet is known as the "Red Planet"?',
    answerOptions: [
      { answerText: 'Mars', isCorrect: true },
      { answerText: 'Venus', isCorrect: false },
      { answerText: 'Jupiter', isCorrect: false },
      { answerText: 'Saturn', isCorrect: false },
    ],
  },
  {
    questionText: 'What is the capital of Australia?',
    answerOptions: [
      { answerText: 'Sydney', isCorrect: false },
      { answerText: 'Melbourne', isCorrect: false },
      { answerText: 'Canberra', isCorrect: true },
      { answerText: 'Brisbane', isCorrect: false },
    ],
  }, 
];

const timerDuration = 60;

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    correctAnswers: Array(questions.length).fill(0),
    wrongAnswers: Array(questions.length).fill(0),
  });

  const [remainingTime, setRemainingTime] = useState(timerDuration);
  const [quizStarted, setQuizStarted] = useState(false); // New state to track if the quiz has started

  useEffect(() => {
    let timer;

    if (!showScore && remainingTime > 0 && quizStarted) {
      timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setShowScore(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [remainingTime, showScore, quizStarted]);

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (isCorrect) {
      setScore(score + 5);
      setResult({
        ...result,
        correctAnswers: result.correctAnswers.map((value, i) => (i === currentQuestion ? value + 1 : value)),
      });
    } else {
      setResult({
        ...result,
        wrongAnswers: result.wrongAnswers.map((value, i) => (i === currentQuestion ? value + 1 : value)),
      });
    }

    setSelectedAnswerIndex(index);
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestion === questions.length - 1;

    if (!isLastQuestion) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setSelectedAnswerIndex(null); // Reset selected answer index for the new question
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswerIndex(null);
    setResult({
      correctAnswers: Array(questions.length).fill(0),
      wrongAnswers: Array(questions.length).fill(0),
    });
    setQuizStarted(false); // Reset quiz started state
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setRemainingTime(timerDuration);
  };

  return (
    <div className='quiz-app'>
      {showScore ? (
        <div className='score-section'>
          <p>You scored {score} out of {questions.length * 5}</p>
          {questions.map((_, i) => (
            <p key={i}>
              Question {i + 1}: Correct Answers: {result.correctAnswers[i]}, Wrong Answers: {result.wrongAnswers[i]}
            </p>
          ))}
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          {quizStarted ? (
            <>
              <div className='question-section'>
                <div className='question-count'>
                  <span>Question {currentQuestion + 1}</span>/{questions.length}
                </div>
                <div className='question-text'>{questions[currentQuestion].questionText}</div>
              </div>
              <div className='timer-section'>
                Time Remaining: {remainingTime} seconds
              </div>
              <div className='answer-section'>
                {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerOptionClick(answerOption.isCorrect, index)}
                    className={selectedAnswerIndex === index ? 'selected-answer' : null}
                  >
                    {answerOption.answerText}
                  </button>
                ))}
              </div>
              <button onClick={handleNextQuestion} disabled={selectedAnswerIndex === null}>
                Next
              </button>
            </>
          ) : (
            <div className='start-section'>
              <p>Click the button below to start the quiz!</p>
              <button onClick={handleStartQuiz}>Start Quiz</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}