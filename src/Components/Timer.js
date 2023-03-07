import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer({ setResult, quizType, result, handleClick }) {
    function endInterlude() {
        setResult(prevResult => ({
            ...prevResult,
            interlude: false,
        }))
    }
    return (
        <CountdownCircleTimer
            isPlaying
            duration={result.interlude ? 5 : quizType.timer}
            colors="#A30000"
            onComplete={() => {
                result.interlude ? endInterlude() : handleClick()
                return { shouldRepeat: false }
            }}>  
                {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    )
}

export default Timer