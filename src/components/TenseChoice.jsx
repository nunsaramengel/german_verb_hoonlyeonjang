import React, { useState, useEffect } from 'react';
import '../styles/TenseChoise.css';
import { Howl } from 'howler'

const TenseChoice = ({ isPastTense, setIsPastTense }) => {
    
    const handleSelection = (event) => {
        const selectedValue = event.target.value;
        setIsPastTense(selectedValue === 'past');
    };

    const selectSound = new Howl({
        src: ['/sounds/menu_select.mp3']
    })

    const playSound = (sound) => {
        sound.play();
    }



    return (
        <>
            <div className="switch" lang="ko">
                <label 
                    htmlFor="isPast" 
                    lang="ko"
                    onClick={() => playSound(selectSound)}
                    style={{
                        color: isPastTense ? 'mediumvioletred' : 'lightseagreen',
                        padding: '5px 8px',
                        borderRadius: '4px',
                        margin: '10px 5px',
                        display: 'inline-block', // Ensure label behaves like a block element
                    }}
                >
                    <input
                        type="radio"
                        value="past"
                        checked={isPastTense}
                        onChange={handleSelection}
                        id="isPast"
                        lang="ko"
                    />
                    과거 시제
                </label>
                <label 
                    htmlFor="!isPast"
                    onClick={() => playSound(selectSound)}
                    style={{
                        color: !isPastTense ? 'mediumvioletred' : 'lightseagreen',
                        padding: '5px 8px',
                        borderRadius: '4px',
                        margin: '10px 5px',
                        display: 'inline-block', // Ensure label behaves like a block element
                    }}
                    label="ko"
                >
                    <input
                        type="radio"
                        value="presentPerfect"
                        checked={!isPastTense}
                        onChange={handleSelection}
                        id="!isPast"
                        lang="ko"
                    />
                    현재완료 시제
                </label>
                <span></span>
            </div>
        </>
    );
};

export default TenseChoice;