import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
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

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
