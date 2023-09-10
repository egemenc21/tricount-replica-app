import './header.styles.scss'
import { AiOutlineArrowLeft, AiOutlineSearch, AiFillBell } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import HeaderList from '../../components/header-list/HeaderList'
import { Group } from '../../store/groups/groups.types'


interface HeaderProps { 
  currentPath: string
  eachGroup: Group
}

function Header({ currentPath,eachGroup }: HeaderProps) {
  const {groupName, participators} = eachGroup

  return (
    <header className="header">
      <div>
        <div className="header-information-group">
          <Link to="/">
            <AiOutlineArrowLeft size={25} />
          </Link>
          <div className="header-information">
            <h1>{groupName}</h1>
            <p>
              {participators &&
                participators.toString().replace(/,/g, ', ').trim()}
            </p>
          </div>
        </div>
        <div className="icon-container">
          <AiOutlineSearch size={25} />
          <AiFillBell size={25} />
          <BsThreeDotsVertical size={25} />
        </div>
      </div>
      <HeaderList currentPath={currentPath} />
    </header>
  )
}

export default Header
