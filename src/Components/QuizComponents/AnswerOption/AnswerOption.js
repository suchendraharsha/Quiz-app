import React from 'react';
import './AnswerOption.css';

const AnswerOption = ({ text, isSelected, isCorrect, isWrong, onClick,isDisabled }) => {
  let className = 'answer-option';
  if (isSelected) className += ' selected';
  if (isCorrect) className += ' correct';
  if (isWrong) className += ' wrong';

  return (
    <div
      className={className}
      onClick={isDisabled ? null : onClick}
      style={{
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'default' : 'pointer',
      }}
    >
      {text}
    </div>
  );
};

export default AnswerOption;