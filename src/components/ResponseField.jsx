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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="위의 동사의 원형을 입력하세요"
          style={{width: "360px"}}
        />
        <button className="checkVerbButton" type="submit" style={{width: "200px", transform: "translate(-22px, -2px)"}}>검사</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResponseField;