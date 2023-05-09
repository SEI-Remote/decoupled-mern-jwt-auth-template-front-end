// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Signup.module.css'

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = evt => {
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      setIsSubmitted(true)
      await authService.signup(formData, photoData.photo)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p className={styles.message}>{message}</p>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <label className={styles.label}>
          Name
          <input
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="text"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Confirm Password
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          Upload Photo
          <input
            type="file"
            name="photo"
            onChange={handleChangePhoto}
          />
        </label>
        <div className={styles.inputContainer}>
          <Link to="/">
            Cancel
          </Link>
          <button 
            disabled={isFormInvalid() || isSubmitted} 
            className={styles.button}
          >
            {!isSubmitted ? "Sign Up" : "🚀 Sending..."}
          </button>
        </div>
      </form>
    </main>
  )
}

export default Signup