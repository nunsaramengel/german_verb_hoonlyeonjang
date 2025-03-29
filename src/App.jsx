import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import { verblist } from './assets/verblist.js';
import Verb from './components/Verb.jsx';
import ResponseField from "./components/ResponseField.jsx";
import Score from "./components/Score.jsx"
import TenseChoice from "./components/TenseChoice.jsx"
import ShowWrongVerbs from "./components/ShowWrongVerbs.jsx"
import { Howl } from "howler";
import Logo from "/img/logo.png"
import styled from 'styled-components';



const responsiveParagraph = styled.p`
  font-size: 18px; /* Default for computers */

  @media (max-width: 1024px) {
    font-size: 16px; /* For iPads */
  }

  @media (max-width: 768px) {
    font-size: 14px; /* For mobile devices */
  }
  `;



function App() {
  const [currentVerb, setCurrentVerb] = useState(null); // Initialize as null
  const [usedVerbs, setUsedVerbs] = useState(new Set());
  const [begun, setBegun] = useState(false)
  const [score, setScore] = useState(0)
  const [isPastTense, setIsPastTense] = useState(false)
  const [wrongVerbs, setWrongVerbs] = useState([])

  
  
 
  const LOGO_SIZE = "30"

  const wrong = new Howl({
    src: ['/sounds/wrong.wav']
  })
  

  const right = new Howl({
    src: ['/sounds/right.wav']
  })

  const music1 = new Howl({
    src: ['/sounds/game.mp3'],
    preload: true,
    loop: true,
     volume: 0.2
  })

  const music2 = new Howl({
    src: ['/sounds/game2.mp3'],
    preload: true,
    loop: true
  })

  const btnSound = new Howl({
    src: ['/sounds/btn.wav']
  })

  const intro = new Howl({
    src: ['/sounds/intro.mp3']
  })

  const type = new Howl({
    src: ['/sounds/type.mp3']
  })

  console.log(wrong, intro)

  const playSound = (sound) => {
    sound.play();
  }
  
  const stopStound = (sound) => {
    sound.stop();
  }

  useEffect(() => {
     console.log(wrongVerbs)
  }, [wrongVerbs])
  
  useEffect(() => {
    if(!begun) { playSound(music1)}
  }, [begun])

  useEffect(() => {
    const handleKeyDown = () => {
      playSound(type)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }

  }, [type])

  const ADD_POINTS = 10
  const SUBSTRACT_POINTS = 5

  const clickButton = () => {
    const arrayOfVerbs = Object.entries(verblist).map(([verb, forms]) => ({
      verb,
      ...forms
    }));

    if (!begun) { playSound(btnSound) } 

    const availableVerbs = arrayOfVerbs.filter(verbObj => !usedVerbs.has(verbObj.verb));

    if (availableVerbs.length === 0) {

      alert(`축하해요! 동사 ${Object.keys(verblist).length - wrongVerbs.length}개 맞았고 ${wrongVerbs.length}개 틀렸어요. 확인 누르시고 다시 도전해보실래요?`);
      setUsedVerbs(new Set())
      setWrongVerbs([]); // Reset the usedVerbs state
      setScore(0)
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    const randomNumber = Math.floor(Math.random() * availableVerbs.length);
    const selectedQuestion = availableVerbs[randomNumber]; // Get the entire verb object

    setCurrentVerb(selectedQuestion); // Set the entire verb object
    setUsedVerbs(prev => new Set(prev).add(selectedQuestion.verb));
    if(!begun){setBegun(true)}
  };

  const handleCorrectAnswer = () => {
    setScore(prevScore => prevScore + ADD_POINTS)
    playSound(right)
    clickButton(); // Get a new verb when the answer is correct
  };

  const handleIncorrectAnswer = () => {
    playSound(wrong)
    setWrongVerbs(prev => [...prev, currentVerb])
    clickButton()
  }

  return (
    <div style={{width: "100vw", margin: "auto", padding: "0 40px"}}>
      <a href="mailto:sesaemdeutsch@gmail.com?subject=강변화동사%20훈련장%20Render">
        <p style={{ fontSize: ".5rem", marginBottom: "50px" }}><img src={Logo} width={LOGO_SIZE} height={LOGO_SIZE} alt="logo 쎄쌤" style={{ marginRight: "15px", transform: "translateY(5px)" }} lang="ko"/>
          &copy; 2025 쎄쌤독일어
        </p>
      </a>
      {(begun && (<><h1 lang="ko">강변화동사 훈련장</h1><Score score={score} /></>))} 
      {currentVerb && <Verb question={currentVerb} isPastTense={isPastTense}></Verb>} {/* Render Verb only if currentVerb is not null */}
      {currentVerb && (
        <ResponseField 
          correctInfinitive={currentVerb.infinitive} 
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
        />

      )}
      {(!begun && <><TenseChoice isPastTense={isPastTense} setIsPastTense={setIsPastTense} /><button onClick={clickButton} className="enterTrainingGroundButton" lang="ko">강변화동사 훈련장에 입장하기</button></>)}
      {(begun && <ShowWrongVerbs wrongVerbs={wrongVerbs} />)}
      <div style={{margin: "auto",  bottom: "1vh", width: "60vw",  backgroundColor: "transparent"}}>
        <p style={{
          color: "grey",
          textAlign: "left",
          backgroundColor: "transparent"
        }}
        lang="de">
        Sound & Music Attribution:
        <br />
          <div style={{backgroundColor: "transparent"}}>
            <p style={{ fontSize: ".5rem", lineHeight: ".7rem", textAlign: "left", color: "grey", backgroundColor: "transparent" }} lang="de">
              8-bit game-over by KSAplay -- https://freesound.org/s/758954/ -- License: Creative Commons 0 **
              8BIT Race music.mp3 by NYAN_CAT -- https://freesound.org/s/277363/ -- License: Attribution NonCommercial 3.0 **
              Short loop made in a few minutes with QWS and GoldWave by sonically_sound -- https://freesound.org/s/647908/ -- License: Attribution NonCommercial 4.0 **
              Hitting the enter key on a keyboard by pfranzen -- https://freesound.org/s/391310/ -- License: Attribution 4.0 **
              Action01.wav by Jessariah -- https://freesound.org/s/435300/ -- License: Creative Commons 0 **
            </p>
          </div>
        </p>
      </div>
    </div>
  );
}

export default App;