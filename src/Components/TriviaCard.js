import { useState, useEffect } from 'react';
import StartQuiz from './StartQuiz';
import EndQuiz from './EndQuiz.js';
import QuestionBlock from './QuestionBlock';
import ResultSpan from './ResultSpan';
import CountdownTimer from './CountdownTimer';

function TriviaCard() {

    const [questions, setQuestions] = useState([])

    const [result, setResult] = useState({
      questionNumber: 0,
      text: '',
      status: 'Start',
      turn: 1,
      correctArray: []
    })

    const [quizType, setQuizType] = useState({
      contestants: 1,
      category: '',
      numberOfQuestions: 10,
      difficulty: 'hard',
      timer: 20
    })

    //Uses Display: "None" to hide the timer when not in use
    const [showTimer, setShowTimer] = useState(false)
  
    useEffect(() => {
        if(result.status === 'Ongoing') {
            setShowTimer(true)
        }else {
            setShowTimer(false)
        }
    }, [result.status])

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

    function handleClick(e) {
      let newTurn
      if(result.turn === 1) {
        newTurn = 2
      }else {
        newTurn = 1
      }
      if(e === undefined) {
        setResult(prevResult => ({
          ...prevResult,
          text: "Incorrect",
          questionNumber: prevResult.questionNumber + 1,
          turn: newTurn
        }))
      }else {
        setResult(prevResult => ({
          ...prevResult, 
          text:e.target.id,
          questionNumber: prevResult.questionNumber + 1,
          turn: newTurn
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

    function resetGame() {
      setResult(({
        questionNumber: 0,
        text: '',
        status: 'Start',
        turn: 1,
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
        <div className="card--header">Trivia!</div>
          {(quizType.timer > 0 && showTimer) && <CountdownTimer result={result} quizType={quizType} handleClick={handleClick} />}
          {(quizType.contestants[0] !== 1 && quizType.contestants !== 1) && <span>Player {result.turn}</span>}
          {result.status === 'Ongoing' ? 
            <QuestionBlock 
              questionNumber={result.questionNumber} 
              questions={questions} 
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
            <ResultSpan status={result.status} result={result} />  
      </section>
    )
}

export default TriviaCard