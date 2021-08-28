import React from 'react'
import { connect } from 'react-redux'
import { createNew } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Form = ({ createNew, showNotification }) => {
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createNew(content)
    showNotification(`You created '${content}'`, 5)
  }
  
  return (
    <form onSubmit={(e) => addAnecdote(e)}>
      <h2>create new</h2>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapDispatchToProps = {
  createNew,
  showNotification
}

const ConnectedForm = connect(() => ({}), mapDispatchToProps)(Form)
export default ConnectedForm
