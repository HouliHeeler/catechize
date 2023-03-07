import Timer from './Timer'
import ResultSpan from './ResultSpan';
import Classified from '../app/classified.png'
import AlarmClock from '../app/alarmclock.png'
import Binoculars from '../app/binoculars.png'

function Interlude({ item, index, needGlasses, setNeedGlasses, redacted, setRedacted, thinkFast, setThinkFast, setResult, result }) {
  return (
    <div className="interlude--body">
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <div className='challenge--buttons'>
              <button onClick={() => setRedacted(prevState => !prevState)} className={redacted ? 'challenge--button--clicked' : 'challenge--button'} ><img src={Classified} alt="Classified" /></button>
              <button onClick={() => setThinkFast(prevState => !prevState)} className={thinkFast ? 'challenge--button--clicked' : 'challenge--button'}><img src={AlarmClock} alt="Alarm Clock" /></button>
              <button onClick={() => setNeedGlasses(prevState => !prevState)} className={needGlasses ? 'challenge--button--clicked' : 'challenge--button'}><img src={Binoculars} alt="Binoculars" /></button>
            </div>
            <ResultSpan status={result.status} result={result} />
        </section>
        <div className='interlude--timer'>
          <Timer setResult={setResult} result={result} />
        </div>
    </div>
  )
}

export default Interlude