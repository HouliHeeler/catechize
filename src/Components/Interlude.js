import Timer from './Timer'

function Interlude({ item, index, redacted, setRedacted, thinkFast, setThinkFast, setResult, result }) {
  return (
    <div>
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <button onClick={() => setRedacted(true)} className={redacted ? 'redacted--button' : 'btn--blk'} >Redact</button>
            <button onClick={() => setThinkFast(true)} className={thinkFast ? 'redacted--button' : 'btn--blk'}>Think Fast</button>
        </section>
        <Timer setResult={setResult} result={result} />
    </div>
  )
}

export default Interlude