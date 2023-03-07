import { useEffect, useState } from 'react'
import QuestionRound from './QuestionRound';
import Interlude from './Interlude';

function QuestionBlock({ questions, handleClick, result, setResult, quizType }) {

    //Randomizes placement of Redacted answer
    const [redacted, setRedacted] = useState(false)

    const redactedNumber = Math.ceil(Math.random() * 4)

    useEffect(() => {
      setRedacted(false)
    }, [result.questionNumber])

    const questionBlock = questions.map((item, index) => {
        return(
          <>
            {!result.interlude ? 
              <QuestionRound
                result={result}
                quizType={quizType} 
                handleClick={handleClick} 
                redacted={redacted}
                redactedNumber={redactedNumber} 
                item={item}
                index={index} /> :
              <Interlude
                result={result}
                setResult={setResult}
                setRedacted={setRedacted}
                redacted={redacted} 
                item={item}
                index={index} />}
          </>
        )
    })    

    return (
        questionBlock[result.questionNumber]
    )
}

export default QuestionBlock