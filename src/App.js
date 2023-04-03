import { useCallback, useEffect, useState } from "react";

// components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

// styles
import "./App.css";

// data
import { wordsList } from "./data/words";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList)//sao as palavras

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses,setGuesses] = useState(guessesQty)//numero de tentativas para acertar a letra da palavra
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)//mapeia as words
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];//recebe uma categoria aleatoria

    const word = words[category][Math.floor(Math.random() * words[category].length)]//recebe a palavra dentro da categoria aleatoria

    return { word, category };
  },[words])
  //sempre que tiver { } esta retornando como objeto

  const startGame = useCallback(() => {

    clearLetterStates()//limpar as letras dps de acertar uma palavra

    const { word, category } = pickWordAndCategory();

    console.log(category, word);

    let wordLetters = word.split("");// pega as letras da palavra
    wordLetters = wordLetters.map((l) => l.toLowerCase());// faz tudo ser letra minuscula

    console.log(word, category)
    console.log(wordLetters)

    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  } , [pickWordAndCategory])

  
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) || 
    wrongLetters.includes(normalizedLetter)
    ){
      return;
    }
    if(letters.includes(normalizedLetter))
    {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses -1 )// faz as tentativas diminuirem a cada erro

    }
  };

const clearLetterStates = () => {// limpar a pontuação dps do gameover
   setGuessedLetters([])
   setWrongLetters([])
}

 useEffect(() =>{
  
  if(guesses <= 0) {

    clearLetterStates()
    setGameStage(stages[2].name);
  }

 }, [guesses])

 useEffect(() => {

  const uniqueLetters = [... new Set(letters)]//set deixa itens unicos no array

  //condição de Vitoria
  if(guessedLetters.length === uniqueLetters.length) {
    //add score
    setScore((actualScore) => actualScore += 100) // cada acerto de palavra = 100 pt
    
    //Restart Game

    startGame()//depois que acerta a palavra começa outra.
  }

 },[guessedLetters,letters, startGame])
  
  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className="App">
    {gameStage === "start" && <StartScreen startGame={startGame}/>}
    {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
    {gameStage === "end" && <GameOver retry={retry} score={score}/>}
    </div>
  );
}

export default App;
