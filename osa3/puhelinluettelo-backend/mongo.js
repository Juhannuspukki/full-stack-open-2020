const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.zyd7v.mongodb.net/phonebook?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => console.log(err))

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number:{ type: Number, required: true },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)

const generateId = () => {
  return Math.floor(Math.random() * 100000)
}

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5)  {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    id: generateId(),
  })

  person.save().then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}

if (process.argv.length === 3)  {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}

