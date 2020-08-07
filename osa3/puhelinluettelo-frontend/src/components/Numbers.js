import React from 'react'

const Numbers = (props) => (
  <>
    {props.persons.map(person =>
      person.name.toLowerCase().includes(props.filter.toLowerCase()) && (
        <p key={person.name}>
          <span>{person.name} {person.number} </span>
          <button onClick={() => props.removeName(person.id, person.name)}>delete</button>
        </p>
      )
    )}
  </>
)


export default Numbers
