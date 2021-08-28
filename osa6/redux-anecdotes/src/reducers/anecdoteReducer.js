import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = anecdotesAtStart, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch (action.type) {
    case 'UPVOTE':
      const id = action.data.id
      
      const newAnecdoteArray = state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
      newAnecdoteArray.sort((a, b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
      
      return newAnecdoteArray
    case 'NEW':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data.sort((a, b) => (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))
    default:
      return state
  }
}

export const upvote = (data) => {
  return async dispatch => {
    const changedAnecdote = {
      ...data,
      votes: data.votes += 1
    }
    await anecdoteService.modify(changedAnecdote)
    dispatch({
      type: 'UPVOTE', data: changedAnecdote})
  }
}

export const createNew = (content) => {
  return async dispatch => {
    const data = {
      content,
      id: getId(),
      votes: 0
    }
    await anecdoteService.createNew(data)
    dispatch({
               type: 'NEW',
               data
             })
  }
}

export const initializeData = () => {
  return async dispatch => {
    const data = await anecdoteService.getAll()
    dispatch({
               type: 'INIT_NOTES',
               data: data,
             })
  }
}

export default reducer
