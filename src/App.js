import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import QuizPage from './Pages/QuizPage/QuizPage';
import QuizContentPage from './Pages/QuizContentPage/QuizContentPage';
function App() {
  return (
    <div className="App">
     <Routes> {/* Use Routes to wrap your Route components */}
        <Route path="/" element={<HomePage />} /> 
        <Route path="/quiz" element={<QuizPage />} /> 
        <Route path="/quizContent" element={<QuizContentPage />} /> 
        {/* <Route path="/results" element={<ResultsPage />} /> */}
       
      </Routes>
    </div>
  );
}

export default App;
