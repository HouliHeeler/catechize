import { useEffect, useState } from 'react'
import QuestionRound from './QuestionRound';

function QuestionBlock({ questions, handleClick, questionNumber, result }) {

    //Randomizes placement of Redacted answer
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
            {!result.interlude && <QuestionRound 
              handleClick={handleClick} 
              redactedNumber={redactedNumber} 
              item={item} />}
            <button onClick={handleRedact}>Redact</button>
          </section>
        )
    })    

    return (
        questionBlock[questionNumber]
    )
}

export default QuestionBlock