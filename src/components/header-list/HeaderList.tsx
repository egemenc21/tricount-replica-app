import { NavLink, useParams } from 'react-router-dom'
import './header-list.styles.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'


export type GroupRouteParams = {
  group: string
}


function HeaderList() {
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams

  return (
    <ul className="header-list">
      <NavLink
        to={`/home/${group}`} end
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgMenuBoxed size={25} />
          Expenses
        </li>
      </NavLink>

      <NavLink
        to={`/home/${group}/balances`}
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
