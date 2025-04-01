import React from 'react';
import { useEffect } from 'react';
import '../styles/TenseChoise.css';
import { Howl } from 'howler';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
    flex-direction: column; /* Stack labels vertically */
    align-items: center; /* Center align items */
    margin: 10px 0; /* Margin for spacing */
`;

const Label = styled.label`
    color: ${props => (props.isActive ? 'mediumvioletred' : 'lightseagreen')};
    padding: 10px 12px; /* Increased padding for better touch targets */
    border-radius: 4px;
    margin: 5px 0; /* Margin for spacing */
    display: inline-block; /* Ensure label behaves like a block element */
    cursor: pointer; /* Change cursor to pointer on hover */
    font-size: 1rem; /* Default font size */

    @media (max-width: 600px) {
        font-size: 0.875rem; /* Adjusted font size for mobile */
        padding: 8px 10px; /* Adjusted padding for mobile */
    }
`;

const TenseChoice = ({ isPastTense, setIsPastTense }) => {
    const handleSelection = (event) => {
        const selectedValue = event.target.value;
        setIsPastTense(selectedValue === 'past');
    };

    const selectSound = new Howl({
        src: ['/sounds/menu_select.mp3']
    });

    const playSound = (sound) => {
        sound.play();
    };

    return (
        <SwitchContainer lang="ko">
            <Label 
                htmlFor="isPast" 
                isActive={isPastTense}
                onClick={() => playSound(selectSound)}
            >
                <input
                    type="radio"
                    value="past"
                    checked={isPastTense}
                    onChange={handleSelection}
                    id="isPast"
                    lang="ko"
                    style={{ display: 'none' }} // Hide the radio button
                />
                과거 시제
            </Label>
            <Label 
                htmlFor="!isPast"
                isActive={!isPastTense}
                onClick={() => playSound(selectSound)}
            >
                <input
                    type="radio"
                    value="presentPerfect"
                    checked={!isPastTense}
                    onChange={handleSelection}
                    id="!isPast"
                    lang="ko"
                    style={{ display: 'none' }} // Hide the radio button
                />
                현재완료 시제
            </Label>
        </SwitchContainer>
    );
};

export default TenseChoice;
