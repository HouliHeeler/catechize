function QuestionRound({ redactedNumber, handleClick, item }) {

    //Randomizes placement of correct answer
    const randomNumber = Math.ceil(Math.random() * 4)

    const orderStyle={
      order: randomNumber === 1 ? 1 :
             randomNumber === 2 ? 3 :
             randomNumber === 3 ? 5 : 7
    }

    return (
        <div className="card--answers">
            <ul>
                <li 
                  id='Incorrect' 
                  style={{order: 2}}
                  className={redactedNumber === 1 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {redactedNumber === 1 ? "[Redacted]" : item.incorrectAnswers[0]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 4}}
                  className={redactedNumber === 2 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {redactedNumber === 2 ? "[Redacted]" : item.incorrectAnswers[1]}
                </li>
                <li 
                  id='Incorrect' 
                  style={{order: 6}}
                  className={redactedNumber === 3 ? 'redacted' : undefined} 
                  onClick={handleClick}>
                    {redactedNumber === 3 ? "[Redacted]" : item.incorrectAnswers[2]}
                </li>
                <li 
                  id='Correct'
                  style={orderStyle}
                  className={redactedNumber === 4 ? 'redacted' : undefined}
                  onClick={handleClick}>
                    {redactedNumber === 4 ? "[Redacted]" : item.correctAnswer}
                </li>
            </ul>
        </div>
    )
}

export default QuestionRound