
import React from 'react';
import './Button.css'; // Import your CSS file

const Button = ({ children, onClick, ...props }) => {
  return (
    <button className="custom-button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;