import { Link } from 'react-router-dom'
import './nav-auth-item.scss'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import { auth } from '../../utils/firebase/firebase.utils'

interface NavAuthItemProps {
  userEmail: string
}

function NavAuthItem({ userEmail }: NavAuthItemProps) {
  const logOutHandler = async () => {
    await signOut(auth)
    toast.success('Log out successful')
  }
  return (
    <div className="nav-auth-container">
      <span className="username">{userEmail}</span>
      <Link to="/" onClick={logOutHandler}>
        <Button buttonType={BUTTON_TYPE_CLASSES.logOut}>Log out</Button>
      </Link>
    </div>
  )
}

export default NavAuthItem
