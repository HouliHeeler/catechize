import { useState } from 'react'
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

    const [quizType, setQuizType] = useState({
      contestants: 1,
      category: '',
      numberOfQuestions: 10,
      difficulty: '',
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
      setStatus("Ongoing")
    }

    function resetGame() {
      setStatus("Start")
      setQuestionNumber(0)
      setResult({text:"", total: 0})
      getQuestions()
    }

    return (
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
        {status === 'Ongoing' ? 
            <QuestionBlock 
                questionNumber={questionNumber} 
                questions={questions} 
                handleClick={handleClick}/> : 
         status === "Start" ? 
            <StartQuiz 
              startQuiz={startQuiz}
              setQuizType={setQuizType} /> : 
            <EndQuiz 
              result={result} 
              questions={questions} 
              resetGame={resetGame} />}
            <ResultSpan status={status} result={result} />  
      </section>
    )
}

export default TriviaCard