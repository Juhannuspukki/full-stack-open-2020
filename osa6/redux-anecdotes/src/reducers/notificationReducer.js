let timeoutID = null

const delay = (time) => {
  return new Promise(res => {
    timeoutID = setTimeout(res,time*1000)
  })
}

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW':
      return action.content

    default:
      return state
  }
}

export const showNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
               type: 'SHOW',
               content
             })
    await delay(time)
    dispatch({
               type: 'SHOW',
               content: null
             })
  }
}

export default reducer
