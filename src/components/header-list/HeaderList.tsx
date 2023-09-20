import { NavLink, useParams } from 'react-router-dom'
import './header-list.styles.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'


export type TriCountRouteParams = {
  tricountId: string
}


function HeaderList() {
  const { tricountId } = useParams<keyof TriCountRouteParams>() as TriCountRouteParams

  return (
    <ul className="header-list">
      <NavLink
        to={`/home/${tricountId}`} end
        className={({ isActive }) => (isActive ? 'active' : 'de-active')}
      >
        <li className="header-list-item">
          <CgMenuBoxed size={25} />
          Expenses
        </li>
      </NavLink>

      <NavLink
        to='balances'
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
