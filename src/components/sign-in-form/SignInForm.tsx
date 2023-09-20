import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './sign-in-form.styles.scss'
import {
  signInWithEmailAndPassword,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth'

import { toast } from 'react-toastify'
import {
  auth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'

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
      switch ((error as AuthError).code) {
        case AuthErrorCodes.INVALID_PASSWORD:
          toast.error('Email and password do not match')
          break
        case AuthErrorCodes.USER_DELETED:
          toast.error('There is no user with that email')
          break
        default:
          toast.error('Please try again later')
      }
    }
  }
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup()
      if (user) {
        navigate('/home')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('An error occurred')
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
        <div className="button-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base}>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </section>
  )
}

export default SignInForm
