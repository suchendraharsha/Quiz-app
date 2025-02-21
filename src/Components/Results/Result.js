import React from 'react';
import './Result.css';
import QuizHeader from '../QuizComponents/QuizHeader/QuizHeader';
import QuizFooter from '../QuizComponents/QuizFooter/QuizFooter';
import ProgressCircle from '../ProgressCircle/ProgressCircle';

const Result = ({ questions, userAnswers, onRestart, onGoBack }) => {
  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.type === 'multipleChoice') {
        if (userAnswers[index] === question.correctAnswerIndex) {
          score++;
        }
      } else if (question.type === 'fillInBlank') {
        if (
          userAnswers[index] &&
          userAnswers[index].trim().toLowerCase() === question.correctAnswer.toLowerCase()
        ) {
          score++;
        }
      }
    });
    return score;
  };

  const score = calculateScore();
  const totalQuestions = questions.length;

  return (
    <div className="result-page">
      <QuizHeader title="Quiz Results" questionCount={`${totalQuestions} Questions`} onGoBack={onGoBack}/>
      <div className="result-content">
        <div className="score-container"> {/* Container for heading and circle */}
          <div className="score-heading">
            <h2>Your Score:</h2>
            <p>
              {score === totalQuestions
                ? 'Congratulations! You got all questions correct!'
                : score >= totalQuestions / 2
                  ? 'Good job! You passed the quiz.'
                  : 'You can do better. Try again!'}
            </p>
          </div>
          <div className="progress-circle-wrapper">
            <ProgressCircle answered={score} total={totalQuestions} />
          </div>
        </div>

        <div className="answers-review">
          <h3>Answers Review:</h3>
          {questions.map((question, index) => (
            <div key={index} className="answer-review-item">
              <p><strong>Question:</strong> {question.question}</p>
              {question.type === 'multipleChoice' ? (
                <div>
                  <p><strong>Your Answer:</strong> {question.options[userAnswers[index]]}</p>
                  <p><strong>Correct Answer:</strong> {question.options[question.correctAnswerIndex]}</p>
                </div>
              ) : (
                <div>
                  <p><strong>Your Answer:</strong> {userAnswers[index]}</p>
                  <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                </div>
              )}
              <p className={
                (question.type === 'multipleChoice' && userAnswers[index] === question.correctAnswerIndex) ||
                (question.type === 'fillInBlank' && userAnswers[index] && userAnswers[index].trim().toLowerCase() === question.correctAnswer.toLowerCase()) ? 'correct-answer' : 'incorrect-answer'
              }>
                {
                  (question.type === 'multipleChoice' && userAnswers[index] === question.correctAnswerIndex) ||
                  (question.type === 'fillInBlank' && userAnswers[index] && userAnswers[index].trim().toLowerCase() === question.correctAnswer.toLowerCase()) ? 'Correct' : 'Incorrect'
                }
              </p>
            </div>
          ))}
        </div>

        <button onClick={onRestart} className="restart-button">Restart Quiz</button>
        <button onClick={onGoBack} className="go-back-button">Go Back</button>
      </div>
      {/* <QuizFooter onSeeResult={() => { }} onNext={() => { }} /> */}
    </div>
  );
};

export default Result;