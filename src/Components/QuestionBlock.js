import { useEffect, useState } from 'react'
import QuestionRound from './QuestionRound';
import Interlude from './Interlude';

function QuestionBlock({ questions, handleClick, result, setResult, quizType }) {

    //Randomizes placement of Redacted answer
    const [redacted, setRedacted] = useState(false)

    const redactedNumber = Math.ceil(Math.random() * 4)

    //Halves time for next question
    const [thinkFast, setThinkFast] = useState(false)

    //Shrinks font-size for answers
    const [needGlasses, setNeedGlasses] = useState(false)

    //Resets Redacted and ThinkFast values to false
    useEffect(() => {
      setRedacted(false)
      setThinkFast(false)
      setNeedGlasses(false)
    }, [result.questionNumber])

    const questionBlock = questions.map((item, index) => {
        return(
          <>
            {!result.interlude ? 
              <QuestionRound
                result={result}
                quizType={quizType} 
                handleClick={handleClick}
                needGlasses={needGlasses}
                thinkFast={thinkFast} 
                redacted={redacted}
                redactedNumber={redactedNumber} 
                item={item}
                index={index} /> :
              <Interlude
                result={result}
                setResult={setResult}
                needGlasses={needGlasses}
                setNeedGlasses={setNeedGlasses}
                setRedacted={setRedacted}
                redacted={redacted} 
                setThinkFast={setThinkFast}
                thinkFast={thinkFast}
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