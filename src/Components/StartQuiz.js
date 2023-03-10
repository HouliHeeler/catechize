import Select from "react-dropdown-select";
import { players, number, categories, difficulty, timer } from '../constants'

function StartQuiz({ startQuiz, setQuizType }) {

  //Updates state based on user selection in every option except Categories
  function handleChange(e) {
    setQuizType(prevState => ({
      ...prevState,
      [e[0].name]: [e[0].value],
    }))
  }

  //Updates categories selection
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

  //Uses data from Constants and react-select-dropdown to fill out quiz options
  return (
    <section className="start--quiz">
      <div className="start--options">
        <Select 
          className="individual--option"
          separator="true"
          onChange={handleMulti}
          keepSelectedInList={false}
          options={categories} 
          multi='true'
          placeholder="Categories" />
        <Select
          className="individual--option" 
          separator="true"
          onChange={handleChange} 
          options={players} 
          placeholder="Number of Players" />
        <Select 
          className="individual--option" 
          separator="true"
          onChange={handleChange} 
          options={number} 
          placeholder="Number of Questions" />
        <Select
          className="individual--option" 
          separator="true"
          onChange={handleChange} 
          options={difficulty} 
          placeholder="Difficulty" />
        <Select
          className="individual--option" 
          separator="true"
          onChange={handleChange}
          options={timer}
          placeholder="Timer" />
      </div>
      <button className="start--button" onClick={startQuiz} >Start Quiz</button>
    </section>
  )
}

export default StartQuiz