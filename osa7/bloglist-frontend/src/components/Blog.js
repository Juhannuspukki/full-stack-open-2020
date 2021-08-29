import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likePost }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [likeCount, setLikeCount] = useState(blog.likes)
  // This is a hack
  const [isDeleted, setIsDeleted] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removePost = () => {
    if (window.confirm(`Do you wish to delete ${blog.title}?`)) {
      blogService.removeBlog(blog.id)
        .then(setIsDeleted(true))
    }
  }

  if (isDeleted) {
    return <></>
  }

  return (
    <div style={blogStyle} className={'blog'}>
      {blog.title} {blog.author} <button onClick={() => setIsExpanded(!isExpanded)} className={'viewButton'}>{isExpanded ? 'hide' : 'view'}</button>
      {isExpanded &&
        <>
          <div>{blog.url}
            <br/>Likes {likeCount} <button onClick={() => likePost(blog, likeCount, setLikeCount)} className={'likeButton'}>like</button>
            <br/>{blog.user.name}
            <br/>{user.username === blog.user.username && <button onClick={() => removePost()}>remove</button>}
          </div>
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
