import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ statusMessage, setStatusMessage] = useState({error: false, content: null})


  useEffect(() => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    const noteObject = {
      name: newName,
      number: newNumber,
    }

    if (newName === '' || newNumber === '') {
      window.alert(`Please write soemthing to both fields.`)
    }
    else if (persons.some(el => el.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const ide = persons.find(o => o.name === newName).id;

        personService
          .update(ide, noteObject)
          .then(returnedPerson => {
            setPersons(persons.filter(obj => obj.id !== ide).concat(returnedPerson))

            setStatusMessage(
              {error: false, content: `Replaced ${noteObject.name}`}
            )
            setTimeout(() => {
              setStatusMessage({error: false, content: null})
            }, 5000)

            setNewNumber('')
            setNewName('')
          })
          .catch(error => {
            setStatusMessage(
              {error: true, content: `Person '${noteObject.name}' was already removed from server`}
            )
            setTimeout(() => {
              setStatusMessage({error: true, content: null})
            }, 5000)
            setPersons(persons.filter(obj => obj.id !== ide))
          })
      }
    }
    else {
      setPersons(persons.concat(noteObject))
      personService
        .create(noteObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))

          setStatusMessage(
            {error: false, content: `Added ${noteObject.name}`}
          )
          setTimeout(() => {
            setStatusMessage({error: false, content: null})
          }, 5000)

          setNewNumber('')
          setNewName('')
        })
    }
  }

  const removeName = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(returnedValue => {
          setPersons(persons.filter(obj => obj.id !== id))

          setStatusMessage(
            {error: false, content: `Deleted ${name}`}
          )
          setTimeout(() => {
            setStatusMessage({error: false, content: null})
          }, 5000)

        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={statusMessage} />

      <Filter handleFilterChange={handleFilterChange} value={filter}/>
      <h2>Add new</h2>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Numbers
        persons={persons}
        filter={filter}
        removeName={removeName}
      />
    </div>
  )

}

export default App
