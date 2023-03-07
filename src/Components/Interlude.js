import Timer from './Timer'

function Interlude({ item, index, redacted, setRedacted, setResult, result }) {
  return (
    <div>
        <Timer setResult={setResult} result={result} />
        <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <button onClick={() => setRedacted(true)} className={redacted ? 'redacted--button' : 'btn--blk'} >Redact</button>
        </section>
    </div>
  )
}

export default Interlude