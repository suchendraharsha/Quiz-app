import React, { useState, useEffect } from "react";
import QuizHeader from "../../Components/QuizComponents/QuizHeader/QuizHeader";
import QuestionCard from "../../Components/QuizComponents/QuestionCard/QuestionCard";
import QuizFooter from "../../Components/QuizComponents/QuizFooter/QuizFooter";
import "./QuizContentPage.css";
import FillInBlankQuestion from "../../Components/QuizComponents/FillInBlankQuestion/FillInBlankQuestion";
import Result from "../../Components/Results/Result";
import { openDB, deleteDB, IDBKeyRange } from 'idb';
import { useNavigate, useLocation } from "react-router-dom";
import Instructions from "../../Components/QuizComponents/Instructions/Instructions";

const QuizContentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizIndex } = location.state || { quizIndex: 0 };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionClicked, setOptionClicked] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question

  

  const [db, setDb] = useState(null);
  
  const [loading, setLoading] = useState(true);

useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB('quizResultsDB', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('results')) {
              db.createObjectStore('results', { keyPath: 'id', autoIncrement: true });
            }
          },
        });
        setDb(database);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
      } finally {
        setLoading(false);
      }
    };
    initDB();
  }, []);
  const quizzes = [
    [
      {
          "type": "multipleChoice",
          "question": "Which planet is closest to the Sun?",
          "options": ["Venus", "Mercury", "Earth", "Mars"],
          "correctAnswerIndex": 1
      },
      {
          "type": "multipleChoice",
          "question": "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
          "options": ["Stack", "Queue", "Tree", "Graph"],
          "correctAnswerIndex": 1
      },
      {
          "type": "multipleChoice",
          "question": "Which of the following is primarily used for structuring web pages?",
          "options": ["Python", "Java", "HTML", "C++"],
          "correctAnswerIndex": 2
      },
      {
          "type": "multipleChoice",
          "question": "Which chemical symbol stands for Gold?",
          "options": ["Au", "Gd", "Ag", "Pt"],
          "correctAnswerIndex": 0
      },
      {
          "type": "multipleChoice",
          "question": "Which of these processes is not typically involved in refining petroleum?",
          "options": ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
          "correctAnswerIndex": 3
      },
      {
          "type": "fillInBlank",
          "question": "What is the value of $12+28$",
          "correctAnswer": "40"
      },
      {
          "type": "fillInBlank",
          "question": "How many states are there in the United States?",
          "correctAnswer": "50"
      },
      {
          "type": "fillInBlank",
          "question": "In which year was the Declaration of Independence signed?",
          "correctAnswer": "1776"
      },
      {
          "type": "fillInBlank",
          "question": "What is the value of pi rounded to the nearest integer?",
          "correctAnswer": "3"
      },
      {
          "type": "fillInBlank",
          "question": "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
          "correctAnswer": "120"
      }
  ],
    [
      {
        type: "multipleChoice",
        question: "Which keyword is used to define a variable in JavaScript?",
        options: ["variable", "int", "var", "string"],
        correctAnswerIndex: 2,
      },
      {
        type: "multipleChoice",
        question: "What is the result of '5' + 3 in JavaScript?",
        options: ["8", "53", "Error", "35"],
        correctAnswerIndex: 1,
      },
      {
        type: "fillInBlank",
        question: "The '===' operator checks for both value and ________.",
        correctAnswer: "type",
      },
      {
        type: "multipleChoice",
        question: "What is the purpose of the 'useEffect' hook in React?",
        options: ["To manage state", "To perform side effects in functional components", "To define components", "To handle events"],
        correctAnswerIndex: 1,
      },
      {
        type: "fillInBlank",
        question: "CSS property 'display: ________' removes an element from the normal flow of the document.",
        correctAnswer: "none",
      },
    ],
  ];

  const currentQuiz = quizzes[quizIndex];
  const currentQuestion = currentQuiz[currentQuestionIndex];
  const [showInstructions, setShowInstructions] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false); // New state


  

  const handleStartQuiz = () => {
    setShowInstructions(false);
    setQuizStarted(true);
  };

  useEffect(() => {
    setTimeLeft(30);
    setAnswersChecked(false);
    setSelectedOption(null);
    setUserAnswer("");
    setIsAnswerCorrect(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !answersChecked) { // Check for quizStarted
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizStarted && timeLeft === 0 && !answersChecked) { // Check for quizStarted
      handleNext();
    }
  }, [timeLeft, answersChecked, currentQuestionIndex, quizStarted]); 

  const handleAnswerChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmitAnswer = () => {
    if (currentQuestion.type === "fillInBlank") {
      const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
      setIsAnswerCorrect(isCorrect);
      setAnswersChecked(true);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setOptionClicked(true);
    setAnswersChecked(true);
    setCorrectAnswer(currentQuestion.correctAnswerIndex);
  };

  const handleSeeResult = () => {
    alert("See Result clicked!");
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setOptionClicked(false);
    setCorrectAnswer(null);
    setAnswersChecked(false);
    setUserAnswer("");
    setIsAnswerCorrect(null);
    setShowResults(false);
    setUserAnswers([]);
    setTimeLeft(30);
  };

  const handleGoBackToQuizPage = () => {
    setShowResults(false);
    navigate("/quiz");
  };

  const handleNext = () => {
    let newUserAnswers = [...userAnswers]; // Create a copy of the userAnswers
  
    if (timeLeft === 0 && currentQuestion.type === "fillInBlank" && !answersChecked) {
      newUserAnswers.push(null);
      if (currentQuestionIndex < currentQuiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer("");
        setIsAnswerCorrect(null);
        setAnswersChecked(false);
      } else {
        setUserAnswers(newUserAnswers);
        setShowResults(true);
        if (db) {
          storeQuizResults(currentQuiz, newUserAnswers, quizIndex, db);
        }
      }
      return;
    }
    if (timeLeft === 0 && currentQuestion.type === "multipleChoice" && selectedOption === null) {
      newUserAnswers.push(null);
      if (currentQuestionIndex < currentQuiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setOptionClicked(false);
        setCorrectAnswer(null);
        setAnswersChecked(false);
      } else {
        setUserAnswers(newUserAnswers);
        setShowResults(true);
        if (db) {
          storeQuizResults(currentQuiz, newUserAnswers, quizIndex, db);
        }
      }
      return;
    }
    if (currentQuestion.type === "fillInBlank" && !answersChecked) {
      alert("Please submit your answer.");
      return;
    } else if (currentQuestion.type === "multipleChoice" && selectedOption === null) {
      alert("Please select an option.");
      return;
    }
  
    if (currentQuestionIndex < currentQuiz.length - 1) {
      if (currentQuestion.type === "multipleChoice" && selectedOption === null) {
        newUserAnswers.push(null);
      } else if (currentQuestion.type === "fillInBlank" && userAnswer === "") {
        newUserAnswers.push(null);
      } else {
        if (currentQuestion.type === "multipleChoice") {
          newUserAnswers.push(selectedOption);
        } else {
          newUserAnswers.push(userAnswer);
        }
      }
  
      setUserAnswers(newUserAnswers); // Update state here
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (currentQuestion.type === "fillInBlank") {
        setUserAnswer("");
        setIsAnswerCorrect(null);
      } else {
        setSelectedOption(null);
        setOptionClicked(false);
        setCorrectAnswer(null);
      }
      setAnswersChecked(false);
    } else {
      if (currentQuestion.type === "multipleChoice" && selectedOption === null) {
        newUserAnswers.push(null);
      } else if (currentQuestion.type === "fillInBlank" && userAnswer === "") {
        newUserAnswers.push(null);
      } else {
        if (currentQuestion.type === "multipleChoice") {
          newUserAnswers.push(selectedOption);
        } else {
          newUserAnswers.push(userAnswer);
        }
      }
      setUserAnswers(newUserAnswers);
      setShowResults(true);
      if (db) {
        storeQuizResults(currentQuiz, newUserAnswers, quizIndex, db);
      }
    }
  };

  const storeQuizResults = async (quiz, userAnswers, quizIndex, db) => {
    try {
      if(!db){
        console.error("Database is not initialized");
        return;
      }
      const tx = db.transaction('results', 'readwrite');
      const store = tx.objectStore('results');
      await store.add({ quizIndex: quizIndex, questions: quiz, answers: userAnswers, timestamp: new Date() });
      await tx.done;
      console.log('Quiz results stored in IndexedDB');
    } catch (error) {
      console.error('Error storing quiz results:', error);
      alert('Failed to save quiz results. Please try again.'); // User feedback
    }
  };

  return (
    <div className="quiz-page">
      {loading && <div>Loading...</div>}
      {showInstructions ? (
        <Instructions onStartQuiz={handleStartQuiz} />
      ) : showResults ? (
        <Result
          questions={currentQuiz}
          userAnswers={userAnswers}
          onRestart={handleRestartQuiz}
          onGoBack={handleGoBackToQuizPage}
        />
      ) : (
        <>
          <QuizHeader
            title={`Quiz ${quizIndex + 1}`}
            questionCount={`${currentQuiz.length} Questions`}
            onGoBack={handleGoBackToQuizPage}
          />
          <div className="timer">Time Left: {timeLeft} seconds</div>
          {currentQuestion.type === "fillInBlank" ? (
            <FillInBlankQuestion
              question={currentQuestion.question}
              userAnswer={userAnswer}
              onAnswerChange={handleAnswerChange}
              onSubmitAnswer={handleSubmitAnswer}
              isAnswerCorrect={isAnswerCorrect}
              answersChecked={answersChecked}
            />
          ) : (
            <QuestionCard
              question={currentQuestion.question}
              options={currentQuestion.options}
              selectedOption={selectedOption}
              optionClicked={optionClicked}
              correctAnswer={correctAnswer}
              onOptionSelect={handleOptionSelect}
              disabled={answersChecked}
              questionIndex={currentQuestionIndex}
            />
          )}
          <QuizFooter
            onSeeResult={handleSeeResult}
            onNext={handleNext}
            answersChecked={answersChecked}
            selectedOption={selectedOption}
            currentQuestionType={currentQuestion.type}
          />
        </>
      )}
    </div>
  );
};

export default QuizContentPage;