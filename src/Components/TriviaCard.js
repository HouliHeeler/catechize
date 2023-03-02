import { useEffect, useState } from 'react'
import { FaCheck, FaSkullCrossbones } from 'react-icons/fa';
import StartQuiz from './StartQuiz';
import EndQuiz from './EndQuiz.js';

function TriviaCard() {

    const randomNumber = Math.ceil(Math.random() * 4)

    const [questions, setQuestions] = useState([])

    const [questionNumber, setQuestionNumber] = useState(0)

    const [result, setResult] = useState('')

    const [status, setStatus] = useState('Start')

    function handleClick(e) {
        setResult(e.target.id)
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

    const questionBlock = questions.map((item, index) => {
      return(
        <section className="card--body" key={index}>
          <div className="card--question">{item.question}</div>
          <div className="card--answers">
            <ul>
                <li id='Incorrect' style={{order: 2}} onClick={handleClick}>{item.incorrectAnswers[0]}</li>
                <li id='Incorrect' style={{order: 4}} onClick={handleClick}>{item.incorrectAnswers[1]}</li>
                <li id='Incorrect' style={{order: 6}} onClick={handleClick}>{item.incorrectAnswers[2]}</li>
                <li 
                    id='Correct'
                    onClick={handleClick}
                    className={randomNumber === 1 ? "One" : 
                               randomNumber === 2 ? "Two" : 
                               randomNumber === 3 ? "Three" : "Four"}>
                                    {item.correctAnswer}
                </li>
            </ul>
          </div>
        </section>
      )
    })

    return (
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
        {status === 'Ongoing' ? questionBlock[questionNumber] : status === "Start" ? <StartQuiz startQuiz={startQuiz} /> : <EndQuiz />}
        {result === 'Correct' ?
            <div className='card--result' style={{color:"green"}}>
                <FaCheck />
                <span>{result}</span>
            </div> : result === 'Incorrect' ?
            <div className='card--result' style={{color:"red"}}>
                <FaSkullCrossbones />
                <span>{result}</span>
            </div> :
            <div></div>
        }   
      </section>
    )
}

export default TriviaCard