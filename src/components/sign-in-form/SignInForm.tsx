import { useState } from 'react'
import './sign-in-form.styles.scss'
import {
  signInWithEmailAndPassword,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../utils/firebase/firebase.utils'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import { useNavigate } from 'react-router-dom'

const defaultFormFields = {
  email: '',
  password: '',
}

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const navigate = useNavigate()

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      const { user } = data
      if (user) {
        navigate('/home')
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
      <h2 className="auth-title">Already have an account?</h2>
      <span className="auth-description">
        Sign in with your email and password
      </span>
      <form onSubmit={handleSubmit} className="auth-form-container">
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
        <Button buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
      </form>
    </section>
  )
}

export default SignInForm
