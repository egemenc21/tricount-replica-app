import './header.styles.scss'
import { AiOutlineArrowLeft, AiOutlineSearch, AiFillBell } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import HeaderList from '../../components/header-list/HeaderList'
import { useAppSelector } from '../../hooks'
import selectEachGroup from '../../store/group/ecah-group.selector'

interface HeaderProps { 
  currentPath: string
}

function Header({ currentPath }: HeaderProps) {
  const { value } = useAppSelector(selectEachGroup)
  console.log(value)

  return (
    <header className="header">
      <div>
        <div className="header-information-group">
          <Link to="/">
            <AiOutlineArrowLeft size={25} />
          </Link>
          <div className="header-information">
            <h1>{value.groupName}</h1>
            <p>
              {participators &&
                value.participators.toString().replace(/,/g, ', ').trim()}
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
