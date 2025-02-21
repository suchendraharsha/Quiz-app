import React from 'react';
import './Navbar.css';
import logo_quiz from '../../Images/logo_quiz.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <div className="logo">
        <img src={logo_quiz} alt="Logo" className="logo_img"/> {}
        <h1>Quiz App</h1>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/quiz" className="nav-link">Take Quiz</Link>
      </div>
    </nav>
  );
};

export default Navbar;