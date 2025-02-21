import React, { useState, useEffect } from "react";
import QuizNavbar from "../../Components/QuizNavbar/QuizNavbar";
import QuizNameCard from "../../Components/QuizNameCard/QuizNameCard";
import HistoryCardList from "../../Components/HistoryCard/HistoryCardList";
import { useNavigate } from "react-router-dom";
import { openDB } from 'idb';
import "./QuizPage.css";

const QuizPage = () => {
  const navigate = useNavigate();
  // State to hold the IndexedDB database instance.
  const [db, setDb] = useState(null);
  // State to hold the quiz results fetched from IndexedDB.
  const [quizResults, setQuizResults] = useState([]);
  // State to hold the IndexedDB database instance for quiz results specifically.
  const [quizDatabase, setQuizDatabase] = useState(null);
  // State to indicate if the data is currently being loaded.
  const [isDataLoading, setIsDataLoading] = useState(true);

  // Static quiz data.
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

  // useEffect to initialize IndexedDB and load quiz results on component mount.
  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Open or create the IndexedDB database.
        const database = await openDB('quizResultsDB', 1, {
          upgrade(db) {
            // Create an object store if it doesn't exist.
            if (!db.objectStoreNames.contains('results')) {
              db.createObjectStore('results', { keyPath: 'id', autoIncrement: true });
            }
          },
        });
        // Set the database instance in state.
        setQuizDatabase(database);
        // Load quiz results from the database.
        loadQuizResults(database);
      } catch (error) {
        // Log and handle any errors during database initialization.
        console.error('Error initializing IndexedDB:', error);
        setIsDataLoading(false);
      }
    };
    // Call the database initialization function.
    initializeDatabase();
  }, []);

  // Function to load quiz results from IndexedDB.
  const loadQuizResults = async (database) => {
    try {
      // Return if the database instance is not available.
      if (!database) return;
      // Start a read-only transaction on the 'results' object store.
      const transaction = database.transaction('results', 'readonly');
      const resultsStore = transaction.objectStore('results');
      // Fetch all results from the object store.
      let results = await resultsStore.getAll();

      // Map the results to add quiz title and description from quizData.
      results = results.map((result) => {
        if (typeof result.quizIndex === 'number' && quizData[result.quizIndex]) {
          return {
            ...result,
            quizTitle: quizData[result.quizIndex].title,
            quizDescription: quizData[result.quizIndex].description,
            quizIconSrc: quizData[result.quizIndex].iconSrc,
          };
        }
        return result;
      });

      // Set the fetched and processed results in state.
      setQuizResults(results);
      setIsDataLoading(false);
    } catch (error) {
      // Log and handle any errors during fetching quiz results.
      console.error('Error fetching quiz results:', error);
      setIsDataLoading(false);
    }
  };
  console.log(quizResults);

  // useEffect to reload quiz results when the database instance changes.
  useEffect(() => {
    if (quizDatabase) {
      loadQuizResults(quizDatabase);
    }
  }, [quizDatabase]);

  // Function to handle the start quiz button click.
  const handleStartClick = (quizIndex) => {
    // Navigate to the quiz content page with the selected quiz index.
    navigate("/quizContent", { state: { quizIndex } });
  };

  return (
    <div>
      {/* Render the quiz navbar component. */}
      <QuizNavbar totalTests={quizResults.length} />
      <div className="quiz_container">
        {/* Render a loading indicator while data is being fetched. */}
        {isDataLoading ? (
          <div>Loading...</div>
        ) : (
          // Map through the quiz data and render QuizNameCard components.
          quizData.map((quiz, index) => (
            <React.Fragment key={index}>
              <QuizNameCard
                title={quiz?.title}
                description={quiz?.description}
                buttonText="Start"
                onClick={() => handleStartClick(index)}
              />
            </React.Fragment>
          ))
        )}
      </div>
      {/* Render the history card list component with quiz results. */}
      <HistoryCardList quizData={quizResults} />
    </div>
  );
};

export default QuizPage;