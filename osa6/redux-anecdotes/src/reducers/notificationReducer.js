const delay = (time) => {
  return new Promise(res => {
    setTimeout(res,time*1000)
  })
}

const reducer = (state = null, action) => {
  console.log(state)
  switch(action.type) {
    case 'SHOW':
      return action.content

    default:
      return state
  }
}

export const showNotification = (content, time) => {
  return async dispatch => {
    console.log(content)
    clearTimeout()
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
