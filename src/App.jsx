
import React from 'react';
import { languages } from './languages.js';


function App() {

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
    </main>
  )
}

export default App
