import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  // const-määrittelyt
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  // const-määrittelyt
  return (
    <div>
      {props.parts.map((part) =>
        <Part key={part.name} part={part.name} exercise={part.exercises}/>
      )}
    </div>
  )
}

const Part = (props) => {
  // const-määrittelyt
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {
  const initialValue = 0;
  return (
    <p>
      Number of exercises {props.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )}
    </p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)
}

ReactDOM.render(<App />, document.getElementById('root'))
