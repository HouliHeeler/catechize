import Timer from './Timer'
import ResultSpan from './ResultSpan';
import Challenges from './Challenges';

function Interlude({ item, index, upsideDown, setUpsideDown, needGlasses, setNeedGlasses, redacted, setRedacted, thinkFast, setThinkFast, result, setResult, quizType, playerOneChallenges, setPlayerOneChallenges, playerTwoChallenges, setPlayerTwoChallenges }) {
  let challenges;
  if(result.turn === 1) {
    challenges = playerTwoChallenges
  }else {
    challenges = playerOneChallenges
  }

  return (
    <div className="interlude--body">
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            {challenges <  quizType.numberOfQuestions/2.5 ? 
            <Challenges 
              quizType={quizType}
              result={result}
              setPlayerOneChallenges={setPlayerOneChallenges} 
              setPlayerTwoChallenges={setPlayerTwoChallenges}
              redacted={redacted} 
              setRedacted={setRedacted} 
              thinkFast={thinkFast}
              setThinkFast={setThinkFast}
              upsideDown={upsideDown}
              setUpsideDown={setUpsideDown}
              needGlasses={needGlasses}
              setNeedGlasses={setNeedGlasses} /> : <span>No Challenges Left!</span>}
            <ResultSpan status={result.status} result={result} />
        </section>
        <div className='interlude--timer'>
          <Timer setResult={setResult} result={result} />
        </div>
    </div>
  )
}

export default Interlude