import React from 'react';
import './QuizHeader.css';

const QuizHeader = ({ title, questionCount,onGoBack }) => {
  return (
    <div className="quiz-header">
      <div className="back-arrow" onClick={onGoBack}>←</div>
      <div className="header-content">
        <div className="title">{title}</div>
        <div className="question-count">{questionCount}</div>
      </div>
    </div>
  );
};

export default QuizHeader;