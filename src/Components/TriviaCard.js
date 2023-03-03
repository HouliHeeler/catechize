import { useState } from 'react'
import StartQuiz from './StartQuiz';
import EndQuiz from './EndQuiz.js';
import QuestionBlock from './QuestionBlock';
import ResultSpan from './ResultSpan';

function TriviaCard() {

    const [questions, setQuestions] = useState([])

    const [result, setResult] = useState({
      questionNumber: 0,
      text: '',
      total: 0,
      status: 'Start',
    })

    const [quizType, setQuizType] = useState({
      contestants: 1,
      category: '',
      numberOfQuestions: 10,
      difficulty: '',
    })

    function handleClick(e) {
        setResult(prevResult => ({
          ...prevResult, 
          text:e.target.id,
          questionNumber: prevResult.questionNumber + 1
        }))
        if(e.target.id === 'Correct') {
            setResult(prevResult => ({
                ...prevResult,
                text: 'Correct',
                total: prevResult.total + 1
            }))
        }
        if(result.questionNumber === questions.length -1) {
            setResult(prevResult => ({
              ...prevResult,
              status: "End"
            }))
        }
    }

    async function getQuestions() {
      await fetch(`https://the-trivia-api.com/api/questions?limit=${quizType.numberOfQuestions}&difficulty=${quizType.difficulty}&categories=${quizType.category}`, {
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

    function startQuiz() {
      getQuestions()
      setResult(prevResult => ({
              ...prevResult,
              status: "Ongoing"
            }))
      console.log(result)
    }

    function resetGame() {
      setResult(({
        status: "Start",
        questionNumber: 0,
        text: "",
        total: 0,
      }))
    }

    return (
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
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
              questions={questions} 
              resetGame={resetGame} />}
            <ResultSpan status={result.status} result={result} />  
      </section>
    )
}

export default TriviaCard