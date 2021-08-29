import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const statusMessage = useSelector((state) => state).notifications

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'user', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showNotification({ error: true, content: exception.message }, 5))
    }
  }

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <Notification message={statusMessage} />
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  return (
    <Blogs user={user} setUser={setUser} />
  )
}

export default App
