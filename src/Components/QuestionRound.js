import Timer from './Timer'

function QuestionRound({ redacted, redactedNumber, handleClick, item, index, quizType, result }) {

    //Randomizes placement of correct answer

    const randomNumber = Math.ceil(Math.random() * 4)
    
    const orderStyle={
      order: randomNumber === 1 ? 1 :
             randomNumber === 2 ? 3 :
             randomNumber === 3 ? 5 : 7
    }

    return (
      <section className="card--body" key={index}>
        {quizType.timer[0] !== 'none' ? <Timer quizType={quizType} result={result} handleClick={handleClick} /> : undefined}
        <div className="card--question">{item.question}</div>
        <div className="card--answers">
            <ul>
                <li 
                  id='Incorrect' 
                  style={{order: 2}}
                  className={(redacted && redactedNumber) === 1 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 1 ? "[Redacted]" : item.incorrectAnswers[0]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 4}}
                  className={(redacted && redactedNumber) === 2 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 2 ? "[Redacted]" : item.incorrectAnswers[1]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 6}}
                  className={(redacted && redactedNumber) === 3 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 3 ? "[Redacted]" : item.incorrectAnswers[2]}
                </li>
                <li 
                  id='Correct'
                  style={orderStyle}
                  className={(redacted && redactedNumber) === 4 ? 'redacted' : undefined}
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 4 ? "[Redacted]" : item.correctAnswer}
                </li>
            </ul>
        </div>
      </section>
    )
}

export default QuestionRound