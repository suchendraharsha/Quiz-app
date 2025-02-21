import React from "react";
import { Link, useNavigate } from "react-router-dom"; // If using React Router
import "../HomePage/HomePage.css";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Navbar from "../../Components/Navbar/Navbar";
const HomePage = () => {
  const navigate = useNavigate();
  const handleOtherButtonClick = () => {
    navigate("/quiz");
    console.log("Other button clicked!");
  };
  return (
    <div className="homepage">
      <div className="home_container">
        <Navbar />
        <HeroSection />
        <div className="get_started_button">
          <button className="custom-button" onClick={handleOtherButtonClick}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
