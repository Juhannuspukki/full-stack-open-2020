// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  // ...
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
  const productiveAuthors = []

  blogs.map((blog) => {
    if (productiveAuthors.some((el) => el.author === blog.author)) {
      const objIndex = productiveAuthors.findIndex((obj => obj.author === blog.author))
      productiveAuthors[objIndex]['blogs'] += 1
    }
    else {
      productiveAuthors.push({ author: blog.author, blogs: 1 })
    }
  })

  return productiveAuthors.reduce((max, blog) => max.blogs > blog.blogs ? max : blog)
}

const mostLikes = (blogs) => {
  const productiveAuthors = []

  blogs.map((blog) => {
    if (productiveAuthors.some((el) => el.author === blog.author)) {
      const objIndex = productiveAuthors.findIndex((obj => obj.author === blog.author))
      productiveAuthors[objIndex]['likes'] += blog.likes
    }
    else {
      productiveAuthors.push({ author: blog.author, likes: blog.likes })
    }
  })

  return productiveAuthors.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}
