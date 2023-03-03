function EndQuiz({ result, quizType, questions, resetGame }) {

  const answers = questions.map((item, index) => {
    return (
      <div key={index} className="end--answers">
        <span>{item.question}</span>
        <span className={result.correctArray.includes(index + 1) ? "correct--answer" : "incorrect--answer"}>{item.correctAnswer}</span>
      </div>
    )
  })

  const playerOneWins = result.correctArray.filter(el => el === 0 || (el%quizType.contestants === 0)).length
  const playerTwoWins = result.correctArray.length - playerOneWins


  return (
    <section className="end--quiz">
      <div>{quizType.contestants > 1 ? `Player One got ${playerOneWins} of ${quizType.numberOfQuestions} correct, while Player Two got ${playerTwoWins} of ${quizType.numberOfQuestions} correct!` : `You got ${playerOneWins} out of ${quizType.numberOfQuestions}`}</div>
      <div className="answer--block">
        <span>The answers are...</span>
        {answers}
      </div>
      <button onClick={resetGame}>Play Again?</button>
    </section>
    
  )
}

export default EndQuiz