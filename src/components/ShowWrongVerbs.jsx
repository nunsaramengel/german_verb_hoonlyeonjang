import React, { useState } from 'react';
import "../styles/WrongVerbsList.css";
import styled from 'styled-components';

const Container = styled.div`
    z-index: 100;
    margin-top: 30px;
    padding: 0; /* Added padding for mobile */
`;

const Button = styled.button`
    font-size: 1rem; /* Default font size */
    width: 100%; /* Full width for mobile */
    
    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
    }
`;

const List = styled.ul`
    border-top: 3px solid #1ED3DF;
    border-bottom: 3px solid #1ED3DF;
    padding: 0; /* Remove default padding */
    list-style-type: none; /* Remove bullet points */
`;

const ListItem = styled.li`
    color: ${props => (props.index % 2 === 0 ? 'aquamarine' : 'mediumvioletred')};
    padding: 8px 0; /* Add some padding for list items */
    font-size: 1rem; /* Default font size */
    
    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
    }
`;

const ShowWrongVerbs = ({ wrongVerbs }) => {
    const [showWrongVerbs, setShowWrongVerbs] = useState(false);
    
    const handleButtonClick = (event) => {
        event.preventDefault();
        setShowWrongVerbs(!showWrongVerbs);
    };

    return (
        <Container>
            <Button lang="ko" onClick={handleButtonClick}>
                {showWrongVerbs ? "복습할 동사 가리기" : '복습할 동사 보여주기'}
            </Button>
            {showWrongVerbs && (
                <List>
                    {wrongVerbs.map((verb, index) => (
                        <ListItem key={index} index={index} lang="de">
                            {verb.infinitive}&nbsp;&nbsp;&nbsp;{verb.pastTense}&nbsp;&nbsp;&nbsp;{verb.presentPerfect}
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default ShowWrongVerbs;
