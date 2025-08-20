import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./components/languages"
import { getFarewellText ,getRandomWord} from "./assets/utils"






export default function AssemblyEndgame() {
    // State values
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])
    
    // Derived values
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length;

    const isGameWon = currentWord.split("").every(letter =>  guessedLetters.includes(letter));
    const isGameLost = wrongGuessCount >= languages.length - 1;
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const isLastGuessedIncorrect =  lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
    console.log(isLastGuessedIncorrect);
    
    const isGameOver = isGameLost || isGameWon;

    
    
    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    
    function addGuessedLetter(letter) {
      setGuessedLetters(prevLetters =>
        prevLetters.includes(letter) ?
        prevLetters :
        [...prevLetters, letter]
      )
    }

    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount;
        const styles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        
        return (
            <span
                className={`chip ${isLanguageLost ? "lost" : ""}`}
                style={styles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = currentWord.split("").map((letter, index) => (
        <span key={index}>
            {guessedLetters.includes(letter) ? letter.toUpperCase() : ""}
        </span>
    ))

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        
        return (
            <button
                className={className}
                disabled = {isGameOver}
                key={letter}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx("game-status", {
      won : isGameWon,
      lost : isGameLost,
      farewell : !isGameOver && isLastGuessedIncorrect
    })

    function render_gameStatus()
    {
      if(!isGameOver && isLastGuessedIncorrect){
        return <p className="farewell">{getFarewellText(languages[wrongGuessCount -1].name)}</p>

      }

      if(isGameWon)
        {
          return(                  
              <>
                <h2>You win!</h2>
                <p>Well done! 🎉</p>
              </>)
        }
      else if(isGameLost)
        {
          return(
            <>
              <h2>Game Over!</h2>
              <p>You lose! Better start learning assembly. </p>
            </>
          )
        }
      return null;
    }

    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word within 8 attempts to keep the
                programming world safe from Assembly!</p>
            </header>
            <section className={gameStatusClass}>
              {render_gameStatus()}
            </section>
            <section className="language-chips">
                {languageElements}
            </section>
            <section className="word">
                {letterElements}
            </section>
            <section className="keyboard">
                {keyboardElements}
            </section>
            {isGameOver && <button className="new-game">New Game</button>}
        </main>
    )
}