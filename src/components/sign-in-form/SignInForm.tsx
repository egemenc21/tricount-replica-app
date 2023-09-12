import { useState } from 'react'
import './sign-in-form.styles.scss'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  AuthError,
  AuthErrorCodes,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../../utils/firebase/firebase.utils'

// interface SignInFormProps {

// }

const defaultFormFields = {
  email: '',
  password: '',
}

function SignInForm() {
  const [signUp, setSignUp] = useState(false)
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  //   const resetFormFields = () => {
  //     setFormFields(defaultFormFields)
  //   }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (signUp) {
      try {
        const data = await createUserWithEmailAndPassword(auth, email, password)
        const { user } = data
        if (user) {
          window.location = '/home'
        }
      } catch (error) {
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert('You can not create a user, the email is already in use')
        }
        toast.error((error as AuthError).message)
      }
    } else {
      try {
        const data = await signInWithEmailAndPassword(auth, email, password)
        const { user } = data
        if (user) {
          window.location = '/home'
        }
      } catch (error) {
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert('You can not create a user, the email is already in use')
        }
        toast.error((error as AuthError).message)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <section>
      <h2>
        {signUp ? "You don't have an account?" : 'Already have an account?'}
      </h2>
      <span>
        {signUp ? 'Register' : 'Sign in with your email and password '}
      </span>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={() => setSignUp(!signUp)}>
          {signUp ? 'Did you sign up before?' : 'Would you like to register?'}
        </button>
        <button type="submit">submit</button>
      </form>
    </section>
  )
}

export default SignInForm
