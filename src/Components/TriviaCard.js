import { useState, useEffect } from 'react';
import Instructions from './Instructions';
import StartQuiz from './StartQuiz';
import EndQuiz from './EndQuiz.js';
import QuestionBlock from './QuestionBlock';

function TriviaCard() {

    const [questions, setQuestions] = useState([])

    //Sets state for whether instructions are seen. Should be seen once per device.
    const [instructionsSeen, setInstructionsSeen] = useState(() => {
      const saved = localStorage.getItem('instructionsSeen')
      const initialValue = JSON.parse(saved)
      return initialValue || false
    })

    useEffect(() => {
      localStorage.setItem("instructionsSeen", instructionsSeen)
    }, [instructionsSeen])

    //Sets state as an object containing a number of quiz result states
    const [result, setResult] = useState({
      questionNumber: 0,
      text: '',
      status: 'Start',
      turn: 1,
      interlude: true,
      correctArray: []
    })

    //Sets state as an object containing a number of quiz type states, chosen at StartQuiz
    const [quizType, setQuizType] = useState({
      contestants: [1],
      category: '',
      numberOfQuestions: 10,
      difficulty: 'hard',
      timer: [20]
    })

    //Tracks player challenges remaining, saved in sessionStorage. Reset upon game reset or exiting browser.
    const [playerOneChallenges, setPlayerOneChallenges] = useState(() => {
      const saved = sessionStorage.getItem('playerOneChallenges')
      const initialValue = JSON.parse(saved)
      return initialValue || 0
    })

    const [playerTwoChallenges, setPlayerTwoChallenges] = useState(() => {
      const saved = sessionStorage.getItem('playerTwoChallenges')
      const initialValue = JSON.parse(saved)
      return initialValue || 0
    })
  
    useEffect(() => {
      if(result.status === 'Start') {
        setPlayerOneChallenges(0)
        setPlayerTwoChallenges(0)
      }
    }, [result.status])
  
    useEffect(() => {
      sessionStorage.setItem("playerOneChallenges", playerOneChallenges)
      sessionStorage.setItem("playerTwoChallenges", playerTwoChallenges)
    }, [playerOneChallenges, playerTwoChallenges])

    //Retrieves questions from the-trivia-api
    async function getQuestions() {
      await fetch(`https://the-trivia-api.com/api/questions?limit=${quizType.numberOfQuestions*quizType.contestants}&difficulty=${quizType.difficulty}&categories=${quizType.category}`, {
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("ERROR (response not ok)");
      })
      .then((data) => {
        setQuestions(data)
      })
      .catch(() => {
        console.log("error");
      });
    }

    //Handles response to selecting an answer in the quiz accounting for many situations. Also used if timer runs out in a timed quiz.
    function handleClick(e) {
      let newTurn
      if(result.turn === 1 && quizType.contestants[0] === 2) {
        newTurn = 2
      }else {
        newTurn = 1
      }
      if(e === undefined) {
        setResult(prevResult => ({
          ...prevResult,
          text: "Incorrect",
          questionNumber: prevResult.questionNumber + 1,
          turn: newTurn,
          interlude: true
        }))
      }else {
        setResult(prevResult => ({
          ...prevResult, 
          text:e.target.id,
          questionNumber: prevResult.questionNumber + 1,
          turn: newTurn,
          interlude: true
      }))
      if(e.target.id === 'Correct') {
          setResult(prevResult => ({
              ...prevResult,
              text: 'Correct',
              correctArray: [...prevResult.correctArray, result.questionNumber + 1]
          }))
      }
      }
      if(result.questionNumber === questions.length -1) {
          setResult(prevResult => ({
            ...prevResult,
            status: "End"
          }))
      }
    }

    function startQuiz() {
      getQuestions()
      setResult(prevResult => ({
              ...prevResult,
              status: "Ongoing"
            }))
    }

    //Sets all states back to starting points
    function resetGame() {
      setResult(({
        questionNumber: 0,
        text: '',
        status: 'Start',
        turn: 1,
        interlude: true,
        correctArray: []
      }))
      setQuizType(({
        contestants: 1,
        category: '',
        numberOfQuestions: 10,
        difficulty: 'hard',
        timer: 20
      }))
      setQuestions([])
    }

    return (
      <section className="trivia--card">
        {(quizType.contestants[0] !== 1 && result.status === "Ongoing") && <span>Player {result.turn}</span>}
        {!instructionsSeen ? 
          <Instructions 
            setInstructionsSeen={setInstructionsSeen} /> : 
            result.status === 'Ongoing' ? 
          <QuestionBlock 
            questions={questions}
            quizType={quizType}
            playerOneChallenges={playerOneChallenges}
            setPlayerOneChallenges={setPlayerOneChallenges}
            playerTwoChallenges={playerTwoChallenges}
            setPlayerTwoChallenges={setPlayerTwoChallenges}
            result={result}
            setResult={setResult} 
            handleClick={handleClick}/> : 
            result.status === "Start" ? 
          <StartQuiz 
            startQuiz={startQuiz}
            setQuizType={setQuizType} /> : 
          <EndQuiz 
            result={result}
            quizType={quizType} 
            questions={questions} 
            resetGame={resetGame} />}
      </section>
    )
}

export default TriviaCard