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

  const totalChallenges = quizType.numberOfQuestions/2.5

  return (
    <div className="interlude--body">
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            {challenges <  totalChallenges && 
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
              setNeedGlasses={setNeedGlasses} />}
            <h3 className='challenge--counter'>{totalChallenges - challenges} Challenges Remaining</h3>
            <ResultSpan status={result.status} result={result} />
            <div className='interlude--timer'>
              <Timer setResult={setResult} result={result} />
            </div>
        </section>
    </div>
  )
}

export default Interlude