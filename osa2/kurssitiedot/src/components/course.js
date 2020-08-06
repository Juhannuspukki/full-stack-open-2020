import React from "react";

const Header = (props) => {
  // const-määrittelyt
  return (
    <h2>{props.course}</h2>
  )
}

const Content = (props) => {
  // const-määrittelyt
  return (
    <div>
      {props.parts.map((part) =>
        <Part key={part.id} part={part.name} exercise={part.exercises}/>
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
    <h3>
      total of {props.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises, initialValue
    )} exercises
    </h3>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course
