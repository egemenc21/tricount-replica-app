import { NavLink } from 'react-router-dom'
import './header-list.styles.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'

interface HeaderListProps {
  currentPath: string
}

function HeaderList({ currentPath }: HeaderListProps) {
  return (
    <ul className="header-list">
      <NavLink
        to={`/home/${currentPath}`} end
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgMenuBoxed size={25} />
          Expenses
        </li>
      </NavLink>

      <NavLink
        to={`/home/${currentPath}/balances`}
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
