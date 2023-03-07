import Select from "react-dropdown-select";
import { players, number, categories, difficulty, timer } from '../constants'

function StartQuiz({ startQuiz, setQuizType }) {

  function handleChange(e) {
    setQuizType(prevState => ({
      ...prevState,
      [e[0].name]: [e[0].value],
    }))
  }

  function handleMulti(e) {
    if(e.length === 0) {
      setQuizType(prevState => ({
        ...prevState,
        category: ''
      }))
    } else {
      let values = []
      e.map(item => values.push(item.value))
      setQuizType(prevState => ({
        ...prevState,
        [e[0].name]: values.join(",")
      }))
    }
  }

  return (
    <section className="start--quiz">
      <div className="start--options">
        <Select
          className="individual--option" 
          onChange={handleChange} 
          options={players} 
          placeholder="Number of Players" />
        <Select 
          className="individual--option" 
          onChange={handleChange} 
          options={number} 
          placeholder="Number of Questions" />
        <Select 
          className="individual--option" 
          onChange={handleMulti} 
          options={categories} 
          multi='true'
          placeholder="Categories" />
        <Select
          className="individual--option" 
          onChange={handleChange} 
          options={difficulty} 
          placeholder="Difficulty" />
        <Select
          className="individual--option" 
          onChange={handleChange}
          options={timer}
          placeholder="Timer" />
      </div>
      <button className="start--button" onClick={startQuiz} >Start Quiz</button>
    </section>
  )
}

export default StartQuiz