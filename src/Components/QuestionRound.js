import Timer from './Timer'

function QuestionRound({ upsideDown, needGlasses, thinkFast, redacted, redactedNumber, handleClick, item, index, quizType, result }) {

    //Randomizes placement of correct answer

    const randomNumber = Math.ceil(Math.random() * 4)
    
    const orderStyle={
      order: randomNumber === 1 ? 1 :
             randomNumber === 2 ? 3 :
             randomNumber === 3 ? 5 : 7
    }

    //Amends styling based on challenges selected
    const answerMinimized = needGlasses ? 'need--glasses' : undefined
    const answerFlipped = upsideDown ? 'upside--down' : undefined

    //Multiple choice options are laid out in consistent order, and then randomized by using the CSS Order designation
    return (
      <section className="card--body" key={index}>
        <div className="card--question">{item.question}</div>
        <div className="card--answers">
            <ul>
                <li 
                  id='Incorrect' 
                  style={{order: 2}}
                  className={`${(redacted && redactedNumber === 1) ? 'redacted' : undefined} ${answerMinimized} ${answerFlipped}`} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber === 1) ? "[Redacted]" : item.incorrectAnswers[0]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 4}}
                  className={`${(redacted && redactedNumber === 2) ? 'redacted' : undefined} ${answerMinimized} ${answerFlipped}`} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 2 ? "[Redacted]" : item.incorrectAnswers[1]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 6}}
                  className={`${(redacted && redactedNumber === 3) ? 'redacted' : undefined} ${answerMinimized} ${answerFlipped}`} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 3 ? "[Redacted]" : item.incorrectAnswers[2]}
                </li>
                <li 
                  id='Correct'
                  style={orderStyle}
                  className={`${(redacted && redactedNumber === 4) ? 'redacted' : undefined} ${answerMinimized} ${answerFlipped}`} 
                  onClick={handleClick}>
                    {(redacted && redactedNumber) === 4 ? "[Redacted]" : item.correctAnswer}
                </li>
            </ul>
        </div>
        <div className='question--timer'>
          {quizType.timer[0] !== 'none' ? <Timer thinkFast={thinkFast} quizType={quizType} result={result} handleClick={handleClick} /> : undefined}
        </div>
      </section>
    )
}

export default QuestionRound