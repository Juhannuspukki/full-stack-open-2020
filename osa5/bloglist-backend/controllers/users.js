const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  // eslint-disable-next-line no-prototype-builtins
  if ((!body.hasOwnProperty('username')) || (!body.hasOwnProperty('password'))) {
    response.status(400).end()
    return
  }

  if (body.password.length < 3 ) {
    response.status(400).json({ error: 'password must be longer than 3 characters' }).end()
    return
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  try {
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
  }
  catch (e) {
    response.status(400).json({ error: 'username should be unique' }).end()
  }
})

module.exports = usersRouter
