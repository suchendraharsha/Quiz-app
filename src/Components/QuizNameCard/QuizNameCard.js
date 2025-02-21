import React from 'react';
import './QuizNameCard.css'; // Import your CSS file

const QuizNameCard = ({ title, description, buttonText,onClick}) => {
  return (
    <div className="quiz-card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button  onClick={onClick} className="card-button">{buttonText}</button>
      </div>
    </div>
  );
};

export default QuizNameCard;