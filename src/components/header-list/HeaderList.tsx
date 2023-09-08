import { NavLink } from 'react-router-dom'
import './header-list.style.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'

function HeaderList() {
  return (
    <ul className="header-list">
      <NavLink
        to="/groupname/expenses"
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgMenuBoxed size={25} />
          Expenses
        </li>
      </NavLink>

      <NavLink
        to="/groupname/balances"
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
