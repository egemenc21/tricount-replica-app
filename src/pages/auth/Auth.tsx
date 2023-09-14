import SignInForm from '../../components/sign-in-form/SignInForm'
import SignUpForm from '../../components/sign-up-form/SignUpForm'
import Navigation from '../../layout/navigation/Navigation'
import './auth.styles.scss'
// interface AuthProps {

// }

function Auth() {
  return (
    <>
      <Navigation />
      <div className="auth-container">
        <SignInForm />
        <SignUpForm />
      </div>
    </>
  )
}

export default Auth
