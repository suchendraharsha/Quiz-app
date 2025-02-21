import React, { useState } from 'react';
import './Instructions.css'; // Create Instructions.css

const Instructions = ({ onStartQuiz }) => {
    const [showInstructions, setShowInstructions] = useState(true);

    const handleStartClick = () => {
        setShowInstructions(false);
        onStartQuiz(); // Call the function passed from the parent to start the quiz
    };

    if (!showInstructions) {
        return null; // Don't render instructions if they're hidden
    }

    return (
        <div className="instructions-container">
            <div className="instructions-content">
                <h2>Quiz Instructions</h2>
                <ol>
                    <li>For multiple-choice questions, select the one best answer.</li>
                    <li>For integer-type questions, write your numerical answer.</li>
                    <li>No calculators unless specified.</li>
                    <li>You have 30 minutes to complete this quiz.</li>
                    <li>options can be selected in multiple choice only one time.</li>
                    <li>For Blanks user should enter answer and click submit.</li>
                    <li>The timer for each question is 30 seconds.</li>
                </ol>
                <button className="start-button" onClick={handleStartClick}>
                    Start Quiz
                </button>
            </div>
        </div>
    );
};

export default Instructions;