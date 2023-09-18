import { NavLink, useParams } from 'react-router-dom'
import './header-list.styles.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'


export type TriCountRouteParams = {
  tricount: string
}


function HeaderList() {
  const { tricount } = useParams<keyof TriCountRouteParams>() as TriCountRouteParams

  return (
    <ul className="header-list">
      <NavLink
        to={`/home/${tricount}`} end
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
