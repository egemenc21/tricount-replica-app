// interface NavigationProps {}
import { FaCrown } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import triCountLogo from '../../assets/tricount_blanc.png'
import './navigation.styles.scss'
import { useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'

import NavAuthItem from '../../components/nav-auth-item/NavAuthItem'

export default function Navigation() {
  const user = useAppSelector(selectCurrentUser)
  const userEmail = user?.email
  return (
    <nav>
      <img src={triCountLogo} alt="triCountLogo" />
      <div className="icon-container">
        <FaCrown size={25} />
        <BsThreeDotsVertical size={25} />
        {userEmail ? <NavAuthItem userEmail={userEmail} /> : null}
      </div>
    </nav>
  )
}
