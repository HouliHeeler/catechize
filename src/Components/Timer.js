import { CountdownCircleTimer } from 'react-countdown-circle-timer'

function Timer({ thinkFast, setResult, quizType, result, handleClick }) {
    function endInterlude() {
        setResult(prevResult => ({
            ...prevResult,
            interlude: false,
        }))
    }

    let maxTime;
    result.interlude ? maxTime = 5 : thinkFast ? maxTime = (quizType.timer/2) : maxTime = quizType.timer

    return (
        <div className='timer'>
            <CountdownCircleTimer
                colors={['#00FF00', '#880808']}
                colorsTime={[maxTime, 0]}
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