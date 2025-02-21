import React from 'react';
import './ProgressCircle.css';

const ProgressCircle = ({ answered, total }) => {
    const percentage = (answered / total) * 100;
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Determine the color based on the percentage
    let strokeColor = '#ff4d4d'; // Default to red
    if (percentage >= 70) {
        strokeColor = '#52c41a'; // Green for 70% or more
    } else if (percentage >= 40) {
        strokeColor = '#faad14'; // Yellow for 40% to 69%
    }
    
    return (
        <div className="circular-progress-bar">
            <svg viewBox="0 0 100 100">
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e0e0e0"
                    strokeWidth="8"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={strokeColor} // Use the determined color
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
                <text x="50" y="55" textAnchor="middle" className="progress-text">
                    {answered}/{total}
                </text>
            </svg>
        </div>
    );
};

export default ProgressCircle;