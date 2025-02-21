import React from 'react';
import './FillInBlankQuestion.css';
const FillInBlankQuestion = ({
    question, // Add the question prop
    userAnswer,
    onAnswerChange,
    onSubmitAnswer,
    isAnswerCorrect,
    answersChecked,
}) => {
    return (
        <div className="question-card">
            <p>{question}</p> {/* Display the question */}
            <input
                type="text"
                value={userAnswer}
                onChange={onAnswerChange}
                disabled={answersChecked}
                className="fill-in-input"
            />
            {!answersChecked && (
                <button onClick={onSubmitAnswer} className="submit-button">
                    Submit
                </button>
            )}
            {answersChecked && isAnswerCorrect !== null && (
                <p className={isAnswerCorrect ? 'correct-answer' : 'incorrect-answer'}>
                    {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
            )}
        </div>
    );
};

export default FillInBlankQuestion;