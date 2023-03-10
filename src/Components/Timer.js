import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer({ thinkFast, setResult, quizType, result, handleClick }) {
    //Ends interlude and moves on to QuestionRound
    function endInterlude() {
        setResult(prevResult => ({
            ...prevResult,
            interlude: false,
        }))
    }

    //Sets allotted time for Interlude to 5 seconds, QuestionRound to quizType.timer(selected in StartQuiz), or halves it based on ThinkFast challenge
    let maxTime;
    result.interlude ? maxTime = 5 : thinkFast ? maxTime = (quizType.timer/2) : maxTime = quizType.timer

    //Uses react-countdown-circle-timer framework
    return (
        <div className='timer'>
            <CountdownCircleTimer
                colors={'#ff48c4'}
                size={40}
                strokeWidth={5}
                trailStrokeWidth={4}
                rotation='counterclockwise'
                isPlaying
                duration={maxTime}
                onComplete={() => {
                    result.interlude ? endInterlude() : handleClick()
                    return { shouldRepeat: false }
                }}>  
                    {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
        </div>
    )
}

export default Timer