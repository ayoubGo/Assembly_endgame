import Header from "./components/Header"
import {languages} from "./components/languages"
import React from "react"

function App() {


  const [currentWord , setCurrentWors] = React.useState("react");
  const alphabet = "a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z"
  
  const [guessedLetters, setGuessedLetters] = React.useState([]);

  function addGeussedLetters (alpha) {
    setGuessedLetters( prevGuessedLeters => prevGuessedLeters.includes(alpha) ? prevGuessedLeters : [ ...prevGuessedLeters , alpha])
  }
  console.log(guessedLetters);

  //  here we handle the language ships we map over each one and display it
  const languagelements = languages.map( lang => {
    const style = {
      backgroundColor :lang.backgroundColor,
      color : lang.color 

    }
    return (
      <span  
      style={style}
      className="chip" 
      id={lang.name}
      >
        {lang.name}
        </span>
    )
  }) 


  // now we will handle the letters we will show the letters the user showesed
  const lettersElement = currentWord.split("").map( (letter, index) => (
    <span key={index}> {letter.toUpperCase()} </span>
  ))


  const keyboardElement = alphabet.split(",").map(alpha => (
    <button key={alpha} onClick={ () => addGeussedLetters(alpha)}>{alpha.toUpperCase()}</button>
  ))
  


  return (
    <>
    <Header/>
    <section className="game_status">
      <h2>You win!</h2>
      <p>Well done! 🎉</p>      
    </section>

    <section className="language-chips">
      {languagelements}
    </section>

    <section className="word">
      {lettersElement}
    </section>

    <section className="keyboard">
      {keyboardElement}
    </section>
    <button className="new-game">New game</button>
    </>
  )
}

export default App
