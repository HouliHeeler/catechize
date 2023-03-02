function QuestionBlock({ questions, handleClick, questionNumber }) {

    const randomNumber = Math.ceil(Math.random() * 4)

    const questionBlock = questions.map((item, index) => {
        return(
          <section className="card--body" key={index}>
            <div className="card--question">{item.question}</div>
            <div className="card--answers">
              <ul>
                  <li id='Incorrect' style={{order: 2}} onClick={handleClick}>{item.incorrectAnswers[0]}</li>
                  <li id='Incorrect' style={{order: 4}} onClick={handleClick}>{item.incorrectAnswers[1]}</li>
                  <li id='Incorrect' style={{order: 6}} onClick={handleClick}>{item.incorrectAnswers[2]}</li>
                  <li 
                      id='Correct'
                      onClick={handleClick}
                      className={randomNumber === 1 ? "One" : 
                                 randomNumber === 2 ? "Two" : 
                                 randomNumber === 3 ? "Three" : "Four"}>
                                      {item.correctAnswer}
                  </li>
              </ul>
            </div>
          </section>
        )
    })    

    return (
        questionBlock[questionNumber]
    )
}

export default QuestionBlock