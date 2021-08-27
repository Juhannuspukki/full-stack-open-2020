import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const accessToken = JSON.parse(window.localStorage.getItem('user')).token
  const request = axios.get(baseUrl, {
    headers: {
      'Authorization': `bearer ${accessToken}`
    }
  })
  return request.then(response => response.data)
}

const newBlog = (data) => {
  const accessToken = JSON.parse(window.localStorage.getItem('user')).token
  const request = axios.post(baseUrl, data, {
    headers: {
      'Authorization': `bearer ${accessToken}`
    }
  })
  return request.then(response => response.data)
}


const like = (data) => {
  const accessToken = JSON.parse(window.localStorage.getItem('user')).token
  const request = axios.put(baseUrl + '/' + data.id, data,
    {
      headers: {
        'Authorization': `bearer ${accessToken}`
      }
    })
  return request.then(response => response.data)
}

const removeBlog = (id) => {
  const accessToken = JSON.parse(window.localStorage.getItem('user')).token
  const request = axios.delete(baseUrl + '/' + id, {
    headers: {
      'Authorization': `bearer ${accessToken}`
    }
  })
  return request.then(response => response.data)
}

export default { getAll, newBlog, like, removeBlog }
