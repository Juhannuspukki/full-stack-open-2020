import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog'


test('passes correct values to callback', () => {

  const mockHandler = jest.fn()

  const component = render(
    <CreateNewBlog handleSubmit={mockHandler}/>
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Test' }
  })
  fireEvent.change(title, {
    target: { value: 'Test' }
  })
  fireEvent.change(url, {
    target: { value: 'Test' }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][1]).toBe('Test' )
  expect(mockHandler.mock.calls[0][2]).toBe('Test' )
  expect(mockHandler.mock.calls[0][3]).toBe('Test' )
})
