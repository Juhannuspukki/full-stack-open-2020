import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import CreateNewBlog from '../components/CreateNewBlog'
import { useSelector, useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'

const Blogs = ({ user, setUser }) => {
  const dispatch = useDispatch()
  const statusMessage = useSelector((state) => state).notifications
  const [blogs, setBlogs] = useState([])
  const [formIsVisible, setFormIsVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  console.log(statusMessage)
  console.log(user)

  const likePost = (blog, likeCount, setLikeCount) => {
    blogService.like({ ...blog, likes: blog.likes + 1, user: user.id })
      .then(setLikeCount(likeCount + 1)
      )
  }

  const handleSubmit = async (event, title, author, url) => {
    event.preventDefault()
    try {
      await blogService.newBlog({ title, author, url })
      dispatch(showNotification({ error: false, content: `a new blog ${title} by ${author} added` }, 5))

      blogService.getAll()
        .then(blogs => {setBlogs( blogs ); setFormIsVisible(false)})

    } catch (exception) {
      console.log(exception)

    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={statusMessage} />
      <p>{user.name} logged in <button onClick={() => {window.localStorage.removeItem('user'); setUser(null)}}>Logout</button></p>
      {formIsVisible && <CreateNewBlog handleSubmit={handleSubmit}/> }
      <button onClick={() => setFormIsVisible(!formIsVisible)} id={'createBlog'}>{formIsVisible ? 'cancel' : 'create new blog'}</button>
      {blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0)).map(blog =>
        <Blog key={blog.id} blog={blog} user={user} likePost={likePost}/>
      )}
    </div>
  )
}

export default Blogs
