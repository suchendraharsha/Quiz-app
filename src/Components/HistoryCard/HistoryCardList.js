import React,{useState} from "react";
import "./HistoryCardList.css"; // Create this CSS file
import ProgressCircle from "../ProgressCircle/ProgressCircle";
import diamond from '../../Images/diamond.png'
import ResultPopup from "../Results/ResultPopup";
const HistoryCard = ({ quizIndex,answers,quizTitle,quizDescription,questions,icon }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleCardClick = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log("Popup opened. isPopupOpen:", isPopupOpen);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    console.log("Popup closed. isPopupOpen:", isPopupOpen);
  };
  const calculateCorrectAnswers = () => {
    if (!answers || !questions) return 0;

    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (questions[index]) {
        if (questions[index].type === "multipleChoice") {
          if (answer === questions[index].correctAnswerIndex) {
            correctCount++;
          }
        } else if (questions[index].type === "fillInBlank") {
          if (answer && questions[index].correctAnswer && answer.toLowerCase().trim() === questions[index].correctAnswer.toLowerCase().trim()) {
            correctCount++;
          }
        }
      }
    });
    return correctCount;
  };

  const correctAnswers = calculateCorrectAnswers();
  const totalQuestions = questions ? questions.length : 0;
  console.log(totalQuestions);
  return (
    <div className="quiz-bar" onClick={handleCardClick}>
      <div className="quiz-bar-content">
        <div className="icon-container">
          <img src={icon} alt="Quiz Icon" className="quiz-icon" />
        </div>
        <div className="text-container">
          <div className="title">quiz-{quizIndex+1} : {quizTitle}</div>
          <div className="description">{quizDescription}</div>
        </div>
      </div>
      <div>
        <ProgressCircle answered={correctAnswers} total={totalQuestions} />
      </div>
      {isPopupOpen && (
        
        <div
        className="popup-content-wrapper"
        style={{ display: isPopupOpen ? "flex" : "none" }}
      >
        <ResultPopup
          questions={questions}
          userAnswers={answers}
          onClose={handleClosePopup}
          popupState={isPopupOpen}
        ></ResultPopup>
      </div>
        
      )}
    </div>
  );
};

const HistoryCardList = ({ quizData }) => {
  return (
    <div className="quiz-bar-list">
      <h1 className="quiz-heading">Recent Activity</h1>
      {quizData.map((quiz, index) => {
        console.log(`Mapping quiz at index ${index}:`, quiz); // Console log inside map
        return (
          <HistoryCard
            key={index}
            quizTitle={quiz.quizTitle}
            quizDescription={quiz.quizDescription}
            answers={quiz.answers}
            questions={quiz.questions}
            quizIndex={quiz.quizIndex}
            icon={quiz.quizIconSrc}
          />
        );
      })}
    </div>
  );
};

export default HistoryCardList;
