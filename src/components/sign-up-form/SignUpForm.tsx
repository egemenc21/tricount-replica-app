import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './sign-up-form.styles.scss'
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import {
  auth,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const navigate = useNavigate()

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = data
      if (user) {
        navigate('/home')
        await updateProfile(user, { displayName }).catch((err) =>
          console.log(err)
        )
        await createUserDocumentFromAuth(user)
      }
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        toast.error((error as AuthError).message)
      }
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <section>
      <h2 className="auth-title">You do not have an account?</h2>
      <span className="auth-description">
        Register with your email and password
      </span>
      <form onSubmit={handleSubmit} className="auth-form-container">
        <input
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          required
          className="auth-input"
          placeholder="Your name"
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          className="auth-input"
          placeholder="Your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
          className="auth-input"
          placeholder="Your password"
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
          className="auth-input"
          placeholder="Confirm your password"
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Register</Button>
      </form>
    </section>
  )
}

export default SignUpForm
