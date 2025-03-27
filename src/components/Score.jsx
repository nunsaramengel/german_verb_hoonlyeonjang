import React from 'react';
import '../styles/Score.css'; // Optional: Add your styles here

const Score = ({ score }) => {
  return (
    <div className="score-container">
      <h2><span style={{color: "white"}}>PUNKTE</span> {score}</h2>
    </div>
  );
};

export default Score;