import React, { useState } from 'react';

const ResponseField = ({
    correctInfinitive,
    onCorrectAnswer,
    onIncorrectAnswer
}) => {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim().toLowerCase() === correctInfinitive.toLowerCase()) {
      setMessage('맞음!');
      onCorrectAnswer(); // Notify the parent component that the answer is correct
    } else {
        setMessage('틀렸음!');
        onIncorrectAnswer()
    }
    setUserInput(''); // Clear the input field
  };

  return (
    <div style={{width: "100vw"}}>
      <form onSubmit={handleSubmit} style={{width: "90vw"}}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          style={{ width: "70vw", fontFamily: "yoon-px-pixelbatang, sans-serif" }}
          lang="de"
        />
        <button className="checkVerbButton" type="submit" style={{width: "70vw",  fontFamily: "yoon-px-pixelbatang, sans-serif"}} lang="ko">검사</button>
      </form>
      {message && <p lang="ko">{message}</p>}
    </div>
  );
};

export default ResponseField;