import { useEffect, useState } from 'react'
import StartQuiz from './StartQuiz';
import EndQuiz from './EndQuiz.js';
import QuestionBlock from './QuestionBlock';
import ResultSpan from './ResultSpan';

function TriviaCard() {

    const [questions, setQuestions] = useState([])

    const [questionNumber, setQuestionNumber] = useState(0)

    const [result, setResult] = useState({
        text: "",
        total: 0
    })

    const [status, setStatus] = useState('Start')

    function handleClick(e) {
        setResult({...result, text:e.target.id})
        if(e.target.id === 'Correct') {
            setResult(prevResult => ({
                text: 'Correct',
                total: prevResult.total + 1
            }))
        }
        setQuestionNumber(prevNumber => prevNumber+1)
        if(questionNumber !== questions.length - 1) {
            setStatus("Ongoing")
        }else {
            setStatus("End")
        }
    }

    function startQuiz() {
        setStatus("Ongoing")
    }

    async function getQuestions() {
      await fetch('https://the-trivia-api.com/api/questions?limit=3&categories=science,history', {
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

    useEffect(() => {
      getQuestions()
    }, [])

    return (
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
        {status === 'Ongoing' ? 
            <QuestionBlock 
                questionNumber={questionNumber} 
                questions={questions} 
                handleClick={handleClick}/> : 
         status === "Start" ? 
            <StartQuiz startQuiz={startQuiz} /> : 
            <EndQuiz result={result} questions={questions} />}
            <ResultSpan status={status} result={result} />  
      </section>
    )
}

export default TriviaCard