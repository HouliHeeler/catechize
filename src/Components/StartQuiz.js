import Select from "react-dropdown-select";
import { players, number, categories, difficulty } from '../constants'

function StartQuiz({ startQuiz, setQuizType }) {

  function handleChange(e) {
    setQuizType(prevState => ({
      ...prevState,
      [e[0].name]: [e[0].value],
    }))
  }

  function handleMulti(e) {
    let values = []
    e.map(item => values.push(item.value))
    setQuizType(prevState => ({
      ...prevState,
      [e[0].name]: values.join(",")
    }))
  }

  return (
    <section>
      <Select onChange={handleChange} options={players}/>
      <Select onChange={handleChange} options={number} />
      <Select onChange={handleMulti} options={categories} multi='true'/>
      <Select onChange={handleChange} options={difficulty} />
      <button onClick={startQuiz} >StartQuiz</button>
    </section>
  )
}

export default StartQuiz