import React from 'react';
import styled from 'styled-components';
import "../styles/CurrentVerbStyles.css";

const Container = styled.div`
    text-align: center; /* Center the text */
    padding: 0 20px; /* Added padding for mobile */
`;

const Title = styled.h1`
    font-size: 3rem; /* Default font size */
    margin: 0; /* Remove default margin */

    @media (max-width: 600px) {
        font-size: 1.8rem; /* Adjusted font size for mobile */
    }
`;

const Verb = ({ question, isPastTense }) => {
    const QUESTION = question || { pastTense: "TEST", presentPerfect: "TEST" }; // Default object structure

    return (
        <Container>
            <Title className="currentVerbStyles" lang="de">
          {isPastTense ? QUESTION.pastTense : QUESTION.presentPerfect}
          <br /><br />
            </Title>
        </Container>
    );
};

export default Verb;
