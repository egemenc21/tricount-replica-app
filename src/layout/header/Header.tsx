import './header.styles.scss'
import { AiOutlineArrowLeft, AiOutlineSearch, AiFillBell } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link, Outlet } from 'react-router-dom'
import HeaderList from '../../components/header-list/HeaderList'
import { Group } from '../../store/groups/groups.types'


interface HeaderProps {
  eachGroup: Group
}

function Header({ eachGroup }: HeaderProps) {
  const { title, participators } = eachGroup
  

  return (
    <>
      <header className="header">
        <div>
          <div className="header-information-group">
            <Link to="/home">
              <AiOutlineArrowLeft size={25} />
            </Link>
            <div className="header-information">
              <h1>{title}</h1>
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
        <HeaderList  />
      </header>
      <Outlet />
    </>
  )
}

export default Header
