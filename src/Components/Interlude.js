import Timer from './Timer'
import ResultSpan from './ResultSpan';
import Classified from '../app/classified.png'
import AlarmClock from '../app/alarmclock.png'
import Binoculars from '../app/binoculars.png'

function Interlude({ item, index, needGlasses, setNeedGlasses, redacted, setRedacted, thinkFast, setThinkFast, setResult, result, quizType, challenges, setChallenges }) {
  return (
    <div className="interlude--body">
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            {challenges < quizType.numberOfQuestions/2.5 ? <div className='challenge--buttons'>
              <button onClick={() => {setRedacted(true); setChallenges(prevTotal => prevTotal + 1)}} className={redacted ? 'challenge--button--clicked' : 'challenge--button'} ><img src={Classified} alt="Classified" /></button>
              <button onClick={() => {setThinkFast(true); setChallenges(prevTotal => prevTotal + 1)}} className={thinkFast ? 'challenge--button--clicked' : 'challenge--button'}><img src={AlarmClock} alt="Alarm Clock" /></button>
              <button onClick={() => {setNeedGlasses(true); setChallenges(prevTotal => prevTotal + 1)}} className={needGlasses ? 'challenge--button--clicked' : 'challenge--button'}><img src={Binoculars} alt="Binoculars" /></button>
            </div> : <span>No Challenges Left!</span>}
            <ResultSpan status={result.status} result={result} />
        </section>
        <div className='interlude--timer'>
          <Timer setResult={setResult} result={result} />
        </div>
    </div>
  )
}

export default Interlude