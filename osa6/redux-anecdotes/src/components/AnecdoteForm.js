import React from 'react'
import { useDispatch } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Form = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(createNew(content))
    dispatch(showNotification(`You created '${content}'`, 5))
  }
  
  return (
    <form onSubmit={(e) => addAnecdote(e)}>
      <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default Form
