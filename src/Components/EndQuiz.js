function EndQuiz({ result, questions }) {
  return (
    <div>You got {result.total} of {questions.length} correct!</div>
  )
}

export default EndQuiz