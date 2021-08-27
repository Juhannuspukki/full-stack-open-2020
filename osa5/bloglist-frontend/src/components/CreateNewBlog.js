import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => {handleSubmit(event, title, author, url); setAuthor(''); setUrl(''); setTitle('')}}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </div>
        <button type="submit" id={'submitNewBlog'}>create</button>
      </form>
    </div>
  )
}

CreateNewBlog.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default CreateNewBlog
