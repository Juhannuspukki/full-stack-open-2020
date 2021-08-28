import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notifications }) => notifications )
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification !== null) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return null
  }
}

export default Notification
