
import React from 'react';
import { languages } from './languages.js';
import { clsx } from 'clsx';
import {
  useState,
  useEffect

} from "react";

import { getFarewellText } from './utils.js';
import { words } from './words.js';
import Confetti from "react-confetti";





function App() {
  // State values 
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);


  // Derived values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;
  const wordArray = currentWord.split('');

  const isGameWon = wordArray.every(letter => guessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
  console.log(isLastGuessIncorrect);


  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphabetArray = alphabet.split('');


  //Render keyboard
  const keyBoardElements = alphabetArray.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = wordArray.includes(letter) && isGuessed;
    const isWrong = !wordArray.includes(letter) && isGuessed;
    const className = clsx({ 'guessed': isGuessed, 'correct': isCorrect, 'wrong': isWrong });

    return (
      <button key={index}
        className={className}
        disabled={isGameOver}
        aria-disabled={isGameOver}
        arial-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)} >
        {letter.toUpperCase()}
      </button>
    )
  })

  //Render guess letters
  const letterElements = wordArray.map((letter, index) => {
    const isGuessed = guessedLetters.includes(letter);
    const shouldDisplayLetter = isGuessed || isGameLost;
    const displayLetter = shouldDisplayLetter ? letter.toLocaleUpperCase() : '';
    const letterClass = clsx({ "missed-letter": !isGuessed && isGameLost });
    return (
      <span key={index} className={letterClass}>{displayLetter}</span>
    )
  })


  //Render languages

  const languagesElements = languages.map((language, index) => {

    const style = { backgroundColor: language.backgroundColor, color: language.color }
    const isLanguageLost = index < wrongGuessCount
    const className = clsx("language-box", isLanguageLost && "lost")
    return (
      <span
        key={language.name}
        style={style}
        className={className}
      >
        {language.name}
      </span>
    )
  })

  //Functions
  function addGuessedLetter(letter) {
    console.log(letter);
    setGuessedLetters(prevLetters => prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]);

  }

  function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

  function resetGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const gameStatus = clsx("game-status", {
    "game-lost": isGameLost,
    "game-won": isGameWon,
    "farewell": !isGameOver && isLastGuessIncorrect
  }
  )

  function renderGameStatus() {

    if (!isGameOver && isLastGuessIncorrect) {

      return (
        <p> {getFarewellText(languages[wrongGuessCount - 1].name)}</p>)
    }

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2>
          <p >Well done! 🎉</p>
        </>)
    }
    if (isGameLost) {

      return (
        <>
          <h2>Game Over!!</h2>
          <p >You lose! Better start learning Assembly.</p>
        </>)


    }
    return null;

  }


  return (
    <main>
      {isGameWon && <Confetti recycle={false} numberOfPieces={1000} />}
      <header>
        <h1>Assembly: Endgame</h1>
        <p>Guess the word withing 8 attempts to keep the programming world safe from Assembly! </p>
      </header>
      <section arial-live="polite" role="status" className={gameStatus}>
        {renderGameStatus()}

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
      {isGameOver && <button className="new-game" onClick={() => resetGame()} >New Game</button>}
    </main>
  )
}

export default App
