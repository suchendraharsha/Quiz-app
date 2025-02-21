import React from 'react';
import AnswerOption from '../AnswerOption/AnswerOption';
import './QuestionCard.css';

const QuestionCard = ({ question, options, selectedOption, optionClicked, correctAnswer, onOptionSelect,disabled,questionIndex}) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-number">Question:{questionIndex+1}</div>
      </div>
      <div className="question-text">{question}</div>
      <div className="options">
        {options.map((option, index) => (
          <AnswerOption
            key={index}
            text={option}
            isSelected={optionClicked && selectedOption === index}
            isCorrect={optionClicked && correctAnswer === index}
            isWrong={optionClicked && selectedOption === index && correctAnswer !== index}
            onClick={() => onOptionSelect(index)}
            isDisabled={disabled} // Pass disabled prop
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;