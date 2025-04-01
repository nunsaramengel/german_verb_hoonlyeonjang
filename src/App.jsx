import { useState, useEffect } from 'react';
import './styles/App.css';
import { verblist } from './assets/verblist.js';
import Verb from './components/Verb.jsx';
import ResponseField from "./components/ResponseField.jsx";
import Score from "./components/Score.jsx";
import TenseChoice from "./components/TenseChoice.jsx";
import ShowWrongVerbs from "./components/ShowWrongVerbs.jsx";
import { Howl } from "howler";
import Logo from "/img/logo.png";
import styled from 'styled-components';

const ResponsiveParagraph = styled.p`
  font-size: 18px; /* Default for computers */

  @media (max-width: 1024px) {
    font-size: 16px; /* For iPads */
  }

  @media (max-width: 768px) {
    font-size: 14px; /* For mobile devices */
  }
`;

const Container = styled.div`
  width: 100vw;
  margin: auto;
  padding: 0 20px; /* Reduced padding for mobile */
`;

const LogoImage = styled.img`
  width: 30px; /* Fixed logo size */
  height: 30px;
`;

const Button = styled.button`
  padding: 10px 16px; /* Default padding */
  font-size: 1rem; /* Default font size */
  width: 100%; /* Full width for mobile */
  
  @media (max-width: 600px) {
    padding: 8px 12px; /* Adjusted padding for mobile */
    font-size: 0.875rem; /* Adjusted font size for mobile */
  }
`;

function App() {
  const [currentVerb, setCurrentVerb] = useState(null);
  const [usedVerbs, setUsedVerbs] = useState(new Set());
  const [begun, setBegun] = useState(false);
  const [score, setScore] = useState(0);
  const [isPastTense, setIsPastTense] = useState(false);
  const [wrongVerbs, setWrongVerbs] = useState([]);

  const LOGO_SIZE = "30";

  const wrong = new Howl({
    src: ['/sounds/wrong.wav']
  });

  const right = new Howl({
    src: ['/sounds/right.wav']
  });

  const music1 = new Howl({
    src: ['/sounds/game.mp3'],
    preload: true,
    loop: true,
    volume: 0.2
  });

  const music2 = new Howl({
    src: ['/sounds/game2.mp3'],
    preload: true,
    loop: true
  });

  const btnSound = new Howl({
    src: ['/sounds/btn.wav']
  });

  const intro = new Howl({
    src: ['/sounds/intro.mp3']
  });

  const type = new Howl({
    src: ['/sounds/type.mp3']
  });

  const playSound = (sound) => {
    sound.play();
  };

  const stopSound = (sound) => {
    sound.stop();
  };

  useEffect(() => {
    if (!begun) { playSound(music1) }
  }, [begun]);

  useEffect(() => {
    const handleKeyDown = () => {
      playSound(type);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [type]);

  const ADD_POINTS = 10;

  const clickButton = () => {
    const arrayOfVerbs = Object.entries(verblist).map(([verb, forms]) => ({
      verb,
      ...forms
    }));

    if (!begun) { playSound(btnSound) }

    const availableVerbs = arrayOfVerbs.filter(verbObj => !usedVerbs.has(verbObj.verb));

    if (availableVerbs.length === 0) {
      alert(`축하해요! 동사 ${Object.keys(verblist).length - wrongVerbs.length}개 맞았고 ${wrongVerbs.length}개 틀렸어요. 확인 누르시고 다시 도전해보실래요?`);
      setUsedVerbs(new Set());
      setWrongVerbs([]);
      setScore(0);
      setTimeout(() => {
        window.location.reload();
      }, 100)
      return;
    }

    const randomNumber = Math.floor(Math.random() * availableVerbs.length);
    const selectedQuestion = availableVerbs[randomNumber]; // Get the entire verb object

    setCurrentVerb(selectedQuestion); // Set the entire verb object
    setUsedVerbs(prev => new Set(prev).add(selectedQuestion.verb));
    if (!begun) { setBegun(true); }
  };

  const handleCorrectAnswer = () => {
    setScore(prevScore => prevScore + ADD_POINTS);
    playSound(right);
    clickButton(); // Get a new verb when the answer is correct
  };

  const handleIncorrectAnswer = () => {
    playSound(wrong);
    setWrongVerbs(prev => [...prev, currentVerb]);
    clickButton();
  };

  return (
    <Container>
      <a href="mailto:sesaemdeutsch@gmail.com?subject=강변화동사%20훈련장%20Render">
        <ResponsiveParagraph style={{ marginBottom: "50px" }}>
          <LogoImage src={Logo} alt="logo 쎄쌤" />
          &copy; 2025 쎄쌤독일어
        </ResponsiveParagraph>
      </a>
      {begun && (
        <>
          <h1 lang="ko">강변화동사 훈련장</h1>
          <Score score={score} />
        </>
      )}
      {currentVerb && <Verb question={currentVerb} isPastTense={isPastTense} />}
      {currentVerb && (
        <ResponseField 
          correctInfinitive={currentVerb.infinitive} 
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
        />
      )}
      {!begun && (
        <>
          <TenseChoice isPastTense={isPastTense} setIsPastTense={setIsPastTense} />
          <Button onClick={clickButton} className="enterTrainingGroundButton" lang="ko">
            강변화동사 훈련장에 입장하기
          </Button>
        </>
      )}
      {begun && <ShowWrongVerbs wrongVerbs={wrongVerbs} />}
      <div style={{ margin: "auto", bottom: "1vh", width: "100%", backgroundColor: "transparent" }}>
        <ResponsiveParagraph lang="de" style={{ color: "grey", textAlign: "left", backgroundColor: "transparent" }}>
          Sound & Music Attribution:
          <br />
          <div style={{ backgroundColor: "transparent" }}>
            <ResponsiveParagraph style={{ fontSize: ".5rem", lineHeight: ".7rem", textAlign: "left", color: "grey", backgroundColor: "transparent" }} lang="de">
              8-bit game-over by KSAplay -- https://freesound.org/s/758954/ -- License: Creative Commons 0 **
              8BIT Race music.mp3 by NYAN_CAT -- https://freesound.org/s/277363/ -- License: Attribution NonCommercial 3.0 **
              Short loop made in a few minutes with QWS and GoldWave by sonically_sound -- https://freesound.org/s/647908/ -- License: Attribution NonCommercial 4.0 **
              Hitting the enter key on a keyboard by pfranzen -- https://freesound.org/s/391310/ -- License: Attribution 4.0 **
              Action01.wav by Jessariah -- https://freesound.org/s/435300/ -- License: Creative Commons 0 **
            </ResponsiveParagraph>
          </div>
        </ResponsiveParagraph>
      </div>
    </Container>
  );
}

export default App;
