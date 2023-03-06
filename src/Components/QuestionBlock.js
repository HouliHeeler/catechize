import { useEffect, useState } from 'react'

function QuestionBlock({ questions, handleClick, questionNumber }) {

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

    //Randomizes placement of correct answer
    const randomNumber = Math.ceil(Math.random() * 4)

    const orderStyle={
      order: randomNumber === 1 ? 1 :
             randomNumber === 2 ? 3 :
             randomNumber === 3 ? 5 : 7
    }


    const questionBlock = questions.map((item, index) => {
        return(
          <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <div className="card--answers">
              <ul>
                  <li 
                    id='Incorrect' 
                    style={{order: 2}}
                    className={redactedNumber === 1 && 'redacted'} 
                    onClick={handleClick}>
                      {redactedNumber === 1 ? "[Redacted]" : item.incorrectAnswers[0]}
                  </li>
                  <li 
                    id='Incorrect' 
                    style={{order: 4}}
                    className={redactedNumber === 2 && 'redacted'} 
                    onClick={handleClick}>
                      {redactedNumber === 2 ? "[Redacted]" : item.incorrectAnswers[1]}
                  </li>
                  <li 
                    id='Incorrect' 
                    style={{order: 6}}
                    className={redactedNumber === 3 && 'redacted'} 
                    onClick={handleClick}>
                      {redactedNumber === 3 ? "[Redacted]" : item.incorrectAnswers[2]}
                  </li>
                  <li 
                    id='Correct'
                    style={orderStyle}
                    className={redactedNumber === 4 && 'redacted'}
                    onClick={handleClick}>
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