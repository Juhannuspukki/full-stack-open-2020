import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog =
  {
    'title': 'Test Title',
    'author': 'Test Author',
    'url': '/bvcbc',
    'likes': 5,
    'user': {
      'username': 'testUser',
      'name': 'Test User',
      'id': '612569b1584155666c04e877'
    },
    'id': '612579553a612f68b5aa7fc8'
  }

const user = {
  'username': 'testUser',
  'name': 'Test User'
}

test('renders content properly on blog element', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).toHaveTextContent('Test Author')
  expect(component.container).not.toHaveTextContent('/bvcbc')
  expect(component.container).not.toHaveTextContent('Likes 5')
})

test('renders content properly on expanded blog element', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('Test Title')
  expect(component.container).toHaveTextContent('Test Author')
  expect(component.container).toHaveTextContent('/bvcbc')
  expect(component.container).toHaveTextContent('Likes 5')
})

test('fires like function twice', () => {

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likePost={mockHandler}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
