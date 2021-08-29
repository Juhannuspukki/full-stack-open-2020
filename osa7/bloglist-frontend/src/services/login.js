import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = (data) => {
  const request = axios.post(baseUrl, data)
  console.log(data)
  return request.then(response => response.data)
}

export default { login }
