import { Link } from 'react-router-dom'
import './nav-auth-item.scss'
import { signOut } from 'firebase/auth'
import { toast } from 'react-toastify'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import { auth } from '../../utils/firebase/firebase.utils'
import { useAppDispatch } from '../../hooks'
import { emptyAllTriCounts } from '../../store/tricounts/tricounts.reducer'
import { signOutSuccess } from '../../store/user/user.reducer'

interface NavAuthItemProps {
  userEmail: string
}

function NavAuthItem({ userEmail }: NavAuthItemProps) {
  const dispatch = useAppDispatch()
  const logOutHandler = async () => {
    await signOut(auth)
    dispatch(emptyAllTriCounts())
    dispatch(signOutSuccess())
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
