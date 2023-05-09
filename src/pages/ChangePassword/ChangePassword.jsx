import { useState } from 'react'
import styles from './ChangePassword.module.css'

const ChangePassword = props => {
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.container}>
      <h1>Change Password</h1>
      <p>{message}</p>
    </main>
  )
}

export default ChangePassword