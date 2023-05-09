// services
import * as tokenService from './tokenService'
import { addPhoto as addProfilePhoto } from './profileService'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`

async function signup(userFormData, photoFormData) {
  try {
    if(!import.meta.env.VITE_BACK_END_SERVER_URL) {
      throw new Error("No VITE_BACK_END_SERVER_URL in front-end .env file")
    }

    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFormData),
    })
    const json = await res.json()
    
    if (json.err) throw new Error(json.err)

    if (json.token) {
      tokenService.setToken(json.token)

      if (photoFormData) {
        const photoData = new FormData()
        photoData.append('photo', photoFormData)
        return await addProfilePhoto(
          photoData,
          tokenService.getUserFromToken().profile
        )
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

async function login(formData) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const json = await res.json()

    if (json.err) throw new Error(json.err)

    if (json.token) tokenService.setToken(json.token)
  } catch (err) {
    throw new Error(err)
  }
}

async function changePassword(formData) {
  try {
    const res = await fetch(`${BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(formData),
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
