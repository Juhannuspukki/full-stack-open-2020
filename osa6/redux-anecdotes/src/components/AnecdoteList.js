import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    return anecdotes.filter(anecdote => anecdote.content.includes(filter))
  })
  
  const vote = (anecdote) => {
    dispatch(upvote(anecdote))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
  }
  
  return (
    <div>
      {anecdotes.map(anecdote =>
         <div key={anecdote.id}>
           <div>
             {anecdote.content}
           </div>
           <div>
             has {anecdote.votes}
             <button onClick={() => vote(anecdote)}>vote</button>
           </div>
         </div>
      )}
    </div>
  )
}

export default AnecdoteList
