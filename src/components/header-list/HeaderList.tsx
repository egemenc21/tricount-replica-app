import './header-list.style.scss'
import { CgMenuBoxed, CgArrowsExchange } from 'react-icons/cg'

function HeaderList() {
  return (
    <ul className="header-list">
      <li className="header-list-item">
        <CgMenuBoxed size={25}/>
        <span>Expenses</span>
      </li>
      <li className="header-list-item">
        <CgArrowsExchange size={25}/>
        Balances
      </li>
    </ul>
  )
}

export default HeaderList
