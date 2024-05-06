// npm modules
import { jwtDecode } from 'jwt-decode'

function setToken(token) {
  localStorage.setItem('token', token)
}

function getToken() {
  let token = localStorage.getItem('token')
  if (!token) return null
  const payload = jwtDecode(token)

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token')
    token = null
  }

  return token
}

function getUserFromToken() {
  const token = getToken()
  return token ? jwtDecode(token).user : null
}

function removeToken() {
  localStorage.removeItem('token')
}

export { setToken, getToken, getUserFromToken, removeToken }
