import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, value, setValue}) => (
  <button onClick={() => setValue(value + 1)}>
    {text}
  </button>
)

const Statistics = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} value={good} setValue={setGood}/>
      <Button text={"neutral"} value={neutral} setValue={setNeutral}/>
      <Button text={"bad"} value={bad} setValue={setBad}/>
      <h2>statistics</h2>
      {good + neutral + bad === 0 ?
        <div>
          <p>No feedback given</p>
        </div>
        :
        <table>
          <tbody>
            <Statistics text={"good"} value={good} />
            <Statistics text={"neutral"} value={neutral} />
            <Statistics text={"bad"} value={bad} />
            <Statistics text={"all"} value={good+neutral+bad} />
            <Statistics text={"average"} value={(good-bad)/(good+neutral+bad)} />
            <Statistics text={"positive"} value={(good/(good+neutral+bad) * 100).toString() + "%"} />
          </tbody>
        </table>
      }
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
