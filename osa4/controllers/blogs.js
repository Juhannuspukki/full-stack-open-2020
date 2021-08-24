const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === request.user.id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  // eslint-disable-next-line no-prototype-builtins
  if ((!request.body.hasOwnProperty('title')) || (!request.body.hasOwnProperty('url'))) {
    response.status(400).end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(request.user.id)

  // eslint-disable-next-line no-prototype-builtins
  if (!(body.hasOwnProperty('likes'))) {
    body['likes'] = 0
  }

  // eslint-disable-next-line no-prototype-builtins
  if ((!body.hasOwnProperty('title')) || (!body.hasOwnProperty('url'))) {
    response.status(400).end()
  }

  else {
    const blog = new Blog({ ...body, user: user._id })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
  }
})

module.exports = blogsRouter
