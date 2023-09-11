// interface NavigationProps {}
import { FaCrown } from 'react-icons/fa6'
import { signOut } from 'firebase/auth'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { auth } from '../../utils/firebase/firebase.utils'
import tricountLogo from '../../assets/tricount_blanc.png'
import './navigation.styles.scss'
import { useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { toast } from 'react-toastify'

export default function Navigation() {
  const user = useAppSelector(selectCurrentUser)
  console.log(user?.email)

  const logOutHandler = async () => {
    toast.success("Log out successful")
    await signOut(auth)
  }
  return (
    <nav>
      <img src={tricountLogo} alt="tricountLogo" />
      <div className="icon-container">
        <FaCrown size={20} />
        <BsThreeDotsVertical size={20} />
        <div>
          <span className="username">{user?.email}</span>
          <Link to="/">
            <button type="button" onClick={logOutHandler}>
              Log out
            </button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
