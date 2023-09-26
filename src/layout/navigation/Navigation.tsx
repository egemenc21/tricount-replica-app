import './navigation.styles.scss'
import { useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'

import NavAuthItem from '../../components/nav-auth-item/NavAuthItem'

export default function Navigation() {
  const user = useAppSelector(selectCurrentUser)
  const userEmail = user?.email
  return (
    <nav className='tricount-main-nav'>
      <h1 className='logo-name'>tricount</h1>
      {userEmail ? <NavAuthItem userEmail={userEmail} /> : null}
    </nav>
  )
}
