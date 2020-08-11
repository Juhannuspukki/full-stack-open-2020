const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const { join } = require('path')
const Person = require('./person')

app.use(cors())
app.use(express.json())
app.use(express.static(join(__dirname, 'public')))

morgan.token('body', (req) => req.body)

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(tokens.body(req, res))
  ].join(' ')
}))

app.get('/info', (req, res, next) => {
  Person.find({}).then(result => {
    res.send('Phonebook has info for ' + result.length + ' people\n' + Date().toString())
  }).catch(error => next(error))
})

app.get('/api/persons/', (request, response, next) => {
  Person.find({}).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json(
      {
        error: 'content missing'
      })
  }

  const person = new Person({
    name: body.name,
    number: body.number.toString(),
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  console.log(request.body)
  if (!body.name || !body.number) {
    return response.status(400).json(
      {
        error: 'content missing'
      })
  }

  const person = {
    name: body.name,
    number: body.number.toString(),
  }

  Person.findByIdAndUpdate(request.params.id, person).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.log('\n\n')
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
