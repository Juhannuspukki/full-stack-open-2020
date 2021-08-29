let timeoutID = null

const delay = (time) => {
  return new Promise(res => {
    timeoutID = setTimeout(res,time*1000)
  })
}

const reducer = (state = { error: false, content: null }, action) => {
  switch(action.type) {
  case 'SHOW':
    return action.data

  default:
    return state
  }
}

export const showNotification = (content, time) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch({
      type: 'SHOW',
      data: content
    })
    await delay(time)
    dispatch({
      type: 'SHOW',
      data: { error: false, content: null }
    })
  }
}

export default reducer
