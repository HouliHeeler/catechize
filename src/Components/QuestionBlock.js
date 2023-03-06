import { useEffect, useState } from 'react'

function QuestionBlock({ questions, handleClick, questionNumber }) {

    const randomNumber = Math.ceil(Math.random() * 4)

    const [redacted, setRedacted] = useState(false)

    let redactedNumber;
    if(redacted) {
      redactedNumber = Math.ceil(Math.random() * 4)
    }

    function handleRedact() {
      setRedacted(true)
    }

    useEffect(() => {
      setRedacted(false)
    }, [questionNumber])

    const questionBlock = questions.map((item, index) => {
        return(
          <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <div className="card--answers">
              <ul>
                  <li id='Incorrect' style={{order: 2}} onClick={handleClick}>{redactedNumber === 1 ? "[Redacted]" : item.incorrectAnswers[0]}</li>
                  <li id='Incorrect' style={{order: 4}} onClick={handleClick}>{redactedNumber === 2 ? "[Redacted]" : item.incorrectAnswers[1]}</li>
                  <li id='Incorrect' style={{order: 6}} onClick={handleClick}>{redactedNumber === 3 ? "[Redacted]" : item.incorrectAnswers[2]}</li>
                  <li 
                      id='Correct'
                      onClick={handleClick}
                      className={randomNumber === 1 ? "One" : 
                                 randomNumber === 2 ? "Two" : 
                                 randomNumber === 3 ? "Three" : "Four"}>
                                      {redactedNumber === 4 ? "[Redacted]" : item.correctAnswer}
                  </li>
              </ul>
            </div>
            <button onClick={handleRedact}>Redact</button>
          </section>
        )
    })    

    return (
        questionBlock[questionNumber]
    )
}

export default QuestionBlock