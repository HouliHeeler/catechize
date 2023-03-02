import { useEffect, useState } from 'react'

function App() {

  const [questions, setQuestions] = useState([])

  const [questionNumber, setQuestionNumber] = useState(0)

  function handleClick() {
    setQuestionNumber(prevNumber => prevNumber+1)
    console.log(questionNumber)
  }

  async function getQuestions() {
    await fetch('https://the-trivia-api.com/api/questions?limit=20&categories=science,history', {
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
            <li>{item.correctAnswer}</li>
            <li>{item.incorrectAnswers[0]}</li>
            <li>{item.incorrectAnswers[1]}</li>
            <li>{item.incorrectAnswers[2]}</li>
          </ul>
        </div>
      </section>
    )
  })

  return (
    <main>
      <section className="trivia--card">
        <div className="card--header">Trivia!</div>
        {questions.length > 0 ? questionBlock[questionNumber] : "?"}
        <button className='card--button' onClick={handleClick}>Next</button>    
      </section>
    </main>
  );
}

export default App;
