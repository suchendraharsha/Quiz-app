import React, { useState } from 'react';
import './HeroSection.css';
import image1 from '../../Images/image1.png';
import image2 from '../../Images/image2.png';
import image3 from '../../Images/image3.png';

const HeroSection = () => {
    const images = [image1, image2, image3];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const textContent = [
        {
            title: "The Ultimate Trivia Challenge",
            description: "Put your knowledge to the test and prove your expertise across a wide range of topics in this engaging game."
        },
        {
            title: "Challenge Friends and Family",
            description: "Compete against your friends and family to see who's the ultimate quiz champion. Track your scores and climb the leaderboard.",
            quizFeature: "Real-time multiplayer quizzes and leaderboards to fuel your competitive spirit."
        },
        {
            title: "Learn While You Play",
            description: "Our quizzes are designed to be both fun and educational. Expand your knowledge base with every question.",
            quizFeature: "Detailed explanations after each question to enhance your understanding."
        }
    ];

    const handleNext = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Handles going back from the first image
    };

    return (
        <div className="two-halves-container">
            <div className="image-half">
                <img src={images[currentImageIndex]} alt="Slider Image" className="slider-image" />
            </div>
            <div className="text-half">
                <div className="text-content">
                    <h1>{textContent[currentImageIndex].title}</h1>
                    <p>{textContent[currentImageIndex].description}</p>
                </div>
                <div className="slider-buttons">
                    <button onClick={handlePrev} className="arrow-button">
                        ← {/* Left arrow symbol */}
                    </button>
                    <button onClick={handleNext} className="arrow-button">
                        → {/* Right arrow symbol */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;