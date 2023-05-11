// services
import * as tokenService from './tokenService'
import { addPhoto as addProfilePhoto } from './profileService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`

async function signup(signupFormData, photoData) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.setToken(json.token)

      if (photoData) {
        await addProfilePhoto(photoData)
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}

function getUser() {
  return tokenService.getUserFromToken()
}

function logout() {
  tokenService.removeToken()
}

async function login(loginFormData) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) tokenService.setToken(json.token)
  } catch (err) {
    throw new Error(err)
  }
}

async function changePassword(changePasswordFormData) {
  try {
    const res = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(changePasswordFormData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.removeToken()
      tokenService.setToken(json.token)
    }
  } catch (err) {
    throw new Error(err)
  }
}

export { signup, getUser, logout, login, changePassword }
