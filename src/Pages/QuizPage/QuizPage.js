import React, { useState, useEffect } from "react";
import QuizNavbar from "../../Components/QuizNavbar/QuizNavbar";
import QuizNameCard from "../../Components/QuizNameCard/QuizNameCard";
import HistoryCardList from "../../Components/HistoryCard/HistoryCardList";
import { useNavigate } from "react-router-dom";
import { openDB } from 'idb';
import "./QuizPage.css";

const QuizPage = () => {
  const navigate = useNavigate();
  /* const [quizData, setQuizData] = useState([]); */
  const [db, setDb] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const [quizDatabase, setQuizDatabase] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const quizData = [
    {
      title: "Sample quiz 1",
      description: "10 Questions",
      answered: 0,
      total: 5,
      iconSrc: "https://tse4.mm.bing.net/th?id=OIP.YriFyhERvDhbqamg3Xyx2QHaHa&pid=Api&P=0&h=180",
    },
    {
      title: "Sample quiz 2",
      description: "5 Questions",
      answered: 0,
      total: 5,
      iconSrc: "https://tse3.mm.bing.net/th?id=OIP.zot3utuvxu0amKa15Z-qNQHaHa&pid=Api&P=0&h=180",
    },
    // Add more quizzes here
  ];

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await openDB('quizResultsDB', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('results')) {
              db.createObjectStore('results', { keyPath: 'id', autoIncrement: true });
            }
          },
        });
        setQuizDatabase(database);
        loadQuizResults(database);
      } catch (error) {
        console.error('Error initializing IndexedDB:', error);
        setIsDataLoading(false);
      }
    };
    initializeDatabase();
  }, []);

  const loadQuizResults = async (database) => {
    try {
      if (!database) return;
      const transaction = database.transaction('results', 'readonly');
      const resultsStore = transaction.objectStore('results');
      let results = await resultsStore.getAll();

      results = results.map((result) => {
        if (typeof result.quizIndex === 'number' && quizData[result.quizIndex]) {
          return {
            ...result,
            quizTitle: quizData[result.quizIndex].title, 
            quizDescription:quizData[result.quizIndex].description,
            quizIconSrc:quizData[result.quizIndex].iconSrc,
          };
        }
        return result;
      });

      setQuizResults(results);
      setIsDataLoading(false);
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      setIsDataLoading(false);
    }
  };
  console.log(quizResults);

  useEffect(() => {
    if (quizDatabase) {
      loadQuizResults(quizDatabase);
    }
  }, [quizDatabase]);

  const handleStartClick = (quizIndex) => {
    navigate("/quizContent", { state: { quizIndex } });
  };

  return (
    <div>
      <QuizNavbar totalTests={quizResults.length}/>
      <div className="quiz_container">
        {isDataLoading ? (
          <div>Loading...</div>
        ) : quizData.map((quiz, index) => (
          <React.Fragment key={index}>
            <QuizNameCard
              title={quiz?.title}
              description={quiz?.description}
              buttonText="Start"
              onClick={() => handleStartClick(index)}
            />
          </React.Fragment>
        ))}
      </div>
      <HistoryCardList quizData={quizResults} />
    </div>
  );
};

export default QuizPage;