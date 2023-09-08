import './header.styles.scss'
import { AiOutlineArrowLeft, AiOutlineSearch, AiFillBell } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import HeaderList from '../header-list/HeaderList'

interface HeaderProps {
  title: string
  participators: string
  groupName: string
}

function Header({ title, participators, groupName }: HeaderProps) {
  console.log(groupName);
  
  return (
    <header className="header">
      <div>
        <div className="header-information-group">
          <Link to="/">
            <AiOutlineArrowLeft size={25} />
          </Link>
          <div className="header-information">
            <h1>{title}</h1>
            <p>{participators}</p>
          </div>
        </div>
        <div className="icon-container">
          <AiOutlineSearch size={25} />
          <AiFillBell size={25} />
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      <HeaderList routeName={groupName} />
    </header>
  )
}

export default Header
