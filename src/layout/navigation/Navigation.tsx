// interface NavigationProps {}
import { FaCrown } from 'react-icons/fa6'
import { BsThreeDotsVertical } from 'react-icons/bs'
import tricountLogo from '../../assets/tricount_blanc.png'
import './navigation.styles.scss'

export default function Navigation() {
  return (
    <nav>
      <img src={tricountLogo} alt="tricountLogo" />
      <div className='icon-container'>
        <FaCrown size={20} />
        <BsThreeDotsVertical size={20} />
      </div>
    </nav>
  )
}
