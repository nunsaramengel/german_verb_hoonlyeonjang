import { useState, useEffect, useRef } from 'react';
import './styles/App.css';
import { verblist } from './assets/verblist.js';
import Verb from './components/Verb.jsx';
import ResponseField from "./components/ResponseField.jsx";
import Score from "./components/Score.jsx"
import TenseChoice from "./components/TenseChoice.jsx"
import ShowWrongVerbs from "./components/ShowWrongVerbs.jsx"
import { Howl } from "howler";
import Logo  from "/img/logo.png"



function App() {
  const [currentVerb, setCurrentVerb] = useState(null); // Initialize as null
  const [usedVerbs, setUsedVerbs] = useState(new Set());
  const [begun, setBegun] = useState(false)
  const [score, setScore] = useState(0)
  const [isPastTense, setIsPastTense] = useState(false)
  const [wrongVerbs, setWrongVerbs] = useState([])
  
 
  const LOGO_SIZE = "40"

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
      alert("축하해요! 강변화 동사 전부 다 공부하셨어요!");
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
    setScore(prevScore => Math.max(prevScore - SUBSTRACT_POINTS, 0))
    playSound(wrong)
    setWrongVerbs(prev => [...prev, currentVerb.infinitive])
    clickButton()
  }

  return (
    <>
      <p style={{fontSize: ".7rem", marginBottom: "50px"}}><img src={Logo} width={LOGO_SIZE} height={LOGO_SIZE} alt="logo 쎄쌤" style={{marginRight: "15px", transform: "translateY(5px)"}} />2010-2025 Copyright 쎄쌤독일어</p>
      {(begun && (<><h1>강변화동사 훈련장</h1><Score score={score} /></>))} 
      {currentVerb && <Verb question={currentVerb} isPastTense={isPastTense}></Verb>} {/* Render Verb only if currentVerb is not null */}
      {currentVerb && (
        <ResponseField 
          correctInfinitive={currentVerb.infinitive} 
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
        />

      )}
      {(!begun && <><TenseChoice isPastTense={isPastTense} setIsPastTense={setIsPastTense} /><button onClick={clickButton} className="enterTrainingGroundButton">강변화동사 훈련장에 입장하기</button></>)}
      {(begun && <ShowWrongVerbs wrongVerbs={wrongVerbs} />)}
      <p style={{
        position: "sticky", textAlign: "center", bottom: "2.5vh", left: "10 % ", right: "10% ", color: "grey" }}>
      Sound & Music Attribution:
      <br />
        <span>
          <p style={{ fontSize: ".5rem", lineHeight: ".7rem", color: "grey" }}>
            8-bit game-over by KSAplay -- https://freesound.org/s/758954/ -- License: Creative Commons 0 <br />
            8BIT Race music.mp3 by NYAN_CAT -- https://freesound.org/s/277363/ -- License: Attribution NonCommercial 3.0 <br />
            Short loop made in a few minutes with QWS and GoldWave by sonically_sound -- https://freesound.org/s/647908/ -- License: Attribution NonCommercial 4.0 <br />
            Hitting the enter key on a keyboard by pfranzen -- https://freesound.org/s/391310/ -- License: Attribution 4.0 <br />
            Action01.wav by Jessariah -- https://freesound.org/s/435300/ -- License: Creative Commons 0 <br />
          </p>
        </span>
      </p>
    </>
  );
}

export default App;