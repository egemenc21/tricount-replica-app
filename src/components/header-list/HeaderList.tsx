import { NavLink } from 'react-router-dom'
import './header-list.styles.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'

interface HeaderListProps{
  routeName:string
}

function HeaderList({routeName}:HeaderListProps) {
  return (
    <ul className="header-list">
      <NavLink
        to={`/${routeName}/expenses`}
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgMenuBoxed size={25} />
          Expenses
        </li>
      </NavLink>

      <NavLink
        to={`/${routeName}/balances`}
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgArrowsExchange size={25} />
          Balances
        </li>
      </NavLink>
    </ul>
  )
}

export default HeaderList
