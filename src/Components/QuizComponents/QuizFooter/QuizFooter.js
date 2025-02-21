import React from 'react';
import './QuizFooter.css';

const QuizFooter = ({ onSeeResult, onNext,answersChecked,selectedOption , currentQuestionType}) => {

  let isDisabled = false;
  if (currentQuestionType === "multipleChoice") {
    isDisabled = (selectedOption === null || !answersChecked);
  } else if (currentQuestionType === "fillInBlank") {
    isDisabled = !answersChecked;
  }
  return (
    <div className="quiz-footer">
{/*       <div className="see-result" onClick={onSeeResult}>
        See Result 
      </div> */}
      <button className="next-button" onClick={onNext} style={{
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.6 : 1,
        cursor: isDisabled ? 'default' : 'pointer',
      }}>
        Next
      </button>
    </div>
  );
};

export default QuizFooter;