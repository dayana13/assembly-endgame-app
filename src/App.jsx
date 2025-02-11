
import React from 'react';
import { languages } from './languages.js';
import {
  useState,
  useEffect

} from "react";


function App() {

  const [currentWord, setCurrentWord] = useState("react");

  const wordArray = currentWord.split('');
  const letterElements = wordArray.map((letter, index) => (
    <span key={index} >{letter.toUpperCase()}</span>
  ))

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArray = alphabet.split('');
  const keyBoardElements = alphabetArray.map((letter, index) => (
    <button key={index} >{letter.toUpperCase()}</button>
  ))

  const languagesElements = languages.map(language => {

    const style = { backgroundColor: language.backgroundColor, color: language.color }
    return (
      <span
        key={language.name}
        style={style}
        className='language-box'
      >
        {language.name}
      </span>
    )
  })


  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word withing 8 attempts to keep the programming world safe from Assembly! </p>
      </header>
      <section className="game-status">
        <h2>You Win!</h2>
        <p className="game-status-text">Well done! 🎉</p>
      </section>
      <section className="game-languages">
        {languagesElements}
      </section>
      <section className="word-array">
        {letterElements}
      </section>
      <section className="keyboard">
        {keyBoardElements}
      </section>
    </main>
  )
}

export default App
