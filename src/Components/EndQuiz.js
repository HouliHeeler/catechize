function EndQuiz({ result, questions, resetGame }) {

  const answers = questions.map((item, index) => {
    return (
      <div key={index} className="end--answers">
        <span>{item.question}</span>
        <span>{item.correctAnswer}</span>
      </div>
    )
  })

  return (
    <section className="end--quiz">
      <div>You got {result.total} of {questions.length} correct!</div>
      <div className="answer--block">
        <span>The answers are...</span>
        {answers}
      </div>
      <button onClick={resetGame}>Play Again?</button>
    </section>
    
  )
}

export default EndQuiz