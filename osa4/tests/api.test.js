const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs =
  [
    {
      'title': 'Test Blog One',
      'author': 'jest',
      'likes': 0,
      'url': '/2',
      'user': {
      }
    },
    {
      'title': 'Test Blog Two',
      'author': 'jest',
      'likes': 0,
      'url': '/2',
      'user': {
      }
    }
  ]

const initialUser =  {
  'username': 'testUser',
  'name': 'Test User',
  'password': 'testpassword',
}

let token

beforeEach(async () => {
  // Clear both users and blogs
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Create new user object
  const userObject = new User(initialUser)
  await userObject.save()

  // Add reference to blog posts
  let blog = new Blog({ ...initialBlogs[0], user: userObject._id })
  let savedBlog = await blog.save()
  userObject.blogs = userObject.blogs.concat(savedBlog._id)
  await userObject.save()

  blog = new Blog({ ...initialBlogs[1], user: userObject._id })
  savedBlog = await blog.save()
  userObject.blogs = userObject.blogs.concat(savedBlog._id)
  await userObject.save()

  const userForToken = {
    username: userObject.username,
    id: userObject._id,
  }

  token = 'bearer ' + jwt.sign(userForToken, process.env.SECRET)
})

test('getting blogs', async () => {
  const response = await api.get('/api/blogs')
    .set('Authorization', token)

  expect(response.headers['content-type']).toMatch(/application\/json/)
  expect(response.body).toHaveLength(2)
})

test('posting blogs', async () => {

  const testData = {
    'title': 'jesttest',
    'author': 'jest',
    'url': '/',
    'likes': 67
  }

  const response1 = await api.get('/api/blogs')
    .set('Authorization', token)
  const expectedLength = response1.body.length + 1

  const response2 = await api.post('/api/blogs')
    .set('Authorization', token)
    .send(testData)
  const response3 = await api.get('/api/blogs')
    .set('Authorization', token)

  expect(response2.ok)
  expect(response3.body).toHaveLength(expectedLength)
})

test('posting notes without token', async () => {

  const testData = {
    'title': 'jesttest',
    'author': 'jest',
    'url': '/',
    'likes': 67
  }

  const response1 = await api.get('/api/blogs')
    .set('Authorization', token)
  const expectedLength = response1.body.length

  const response2 = await api.post('/api/blogs')
    .send(testData)
  const response3 = await api.get('/api/blogs')
    .set('Authorization', token)

  expect(response2.status).toBe(401)
  expect(response3.body).toHaveLength(expectedLength)
})

test('blog has an id field', async () => {
  const response = await api.get('/api/blogs')
    .set('Authorization', token)
  expect(response.ok)
  response.body.map(blog =>
    expect(blog.id).toBeDefined()
  )
})

test('auto-add likes', async () => {

  const testData = {
    'title': 'jest-likes-test',
    'author': 'jest',
    'url': '/',
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(testData)
  const response = await api.get('/api/blogs')
    .set('Authorization', token)

  expect(response.body.find(o => o.title === 'jest-likes-test').likes).toBe(0)
})

test('reject if blogpost has missing fields', async () => {

  const testData1 = {
    'author': 'jest',
    'likes': 0,
    'url': '/',
  }

  const testData2 = {
    'title': 'jest-test',
    'author': 'jest',
    'likes': 0,
  }

  const response1 = await api.post('/api/blogs')
    .set('Authorization', token)
    .send(testData1)
  expect(response1.status).toBe(400)

  const response2 = await api.post('/api/blogs', testData2)
    .set('Authorization', token)
    .send(testData2)
  expect(response2.status).toBe(400)

})

test('reject if username not unique', async () => {

  const testUser = {
    'username': 'testUser',
    'name': 'Test User',
    'password': 'testpassword'
  }

  await api.post('/api/users').send(testUser)
  const response = await api.post('/api/users').send(testUser)

  expect(response.status).toBe(400)
})

test('reject if user has missing fields', async () => {

  const testData1 = {
    'name': 'Test User',
    'password': 'testpassword'
  }

  const testData2 = {
    'username': 'testUser',
    'name': 'Test User',
  }

  const response1 = await api.post('/api/users', testData1).send(testData1)
  expect(response1.status).toBe(400)

  const response2 = await api.post('/api/users', testData2).send(testData2)
  expect(response2.status).toBe(400)
})

afterAll(() => {
  mongoose.connection.close()
})
