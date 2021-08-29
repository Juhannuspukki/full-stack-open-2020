
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Cypress Test User',
      username: 'cypress',
      password: 'redacted'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('redacted')
      cy.contains('login').click()

      cy.contains('Cypress Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('incorrect_password')
      cy.contains('login').click()

      cy.contains('401')
      cy.get('html').should('not.contain', 'Cypress Test User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('cypress')
      cy.get('#password').type('redacted')
      cy.contains('login').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('/test-url')
      cy.get('#submitNewBlog').click()
    })

    it('A blog can be created', function() {
      cy.contains('Test title')
      cy.contains('Test author')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes 1')
    })

    it('A blog can be removed', function() {
      cy.contains('view').click()
      cy.contains('remove').click()

      cy.get('.blog').should('not.exist')
    })

    it('Blogs are sorted according to likes', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test title 2')
      cy.get('#author').type('Test author 2')
      cy.get('#url').type('/test-url-2')
      cy.get('#submitNewBlog').click()

      cy.contains('Test title 2 Test author 2').find('.viewButton').as('theButton')
      cy.get('@theButton').click()
      cy.contains('Test title 2 Test author 2').find('.likeButton').as('likeButton')
      cy.get('@likeButton').click()

      // To avoid confusing layout shift, page has to be reloaded before the order changes
      cy.wait(500)
      cy.reload()

      // After reload, expect the post that was recently liked to show up first
      cy.get('.blog').first().contains('Test title 2 Test author 2')
    })
  })
})
