import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    padding: 0; /* Added padding for mobile */
`;

const Form = styled.form`
    width: 100%; /* Form width */
    display: flex;
    flex-direction: column; /* Stack input and button vertically */
    align-items: center; /* Center align items */
`;

const Input = styled.input`
    width: 100%; /* Input width */
    font-family: "yoon-px-pixelbatang", sans-serif;
    font-size: 1rem; /* Default font size */

    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
    }
`;

const Button = styled.button`
    width: 100%; /* Button width */
    font-family: "yoon-px-pixelbatang", sans-serif;
    font-size: 1rem; /* Default font size */
    margin-top: 10px; /* Space between input and button */

    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
    }
`;

const Message = styled.p`
    margin-top: 10px; /* Space above the message */
    font-size: 1rem; /* Default font size */

    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
    }
`;

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
            onIncorrectAnswer();
        }
        setUserInput(''); // Clear the input field
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={userInput}
                    onChange={handleChange}
                    lang="de"
                />
                <Button className="checkVerbButton" type="submit" lang="ko">검사</Button>
            </Form>
            {message && <Message lang="ko">{message}</Message>}
        </Container>
    );
};

export default ResponseField;
