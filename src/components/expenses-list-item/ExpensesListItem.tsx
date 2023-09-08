import { Link } from 'react-router-dom'
import './expense-list-item.style.scss'
import {BsCurrencyEuro} from "react-icons/bs"

interface ExpensesListItemProps {
  expenseName: string
  paidBy: string
  price: number
  date: string
}
function ExpensesListItem({
  expenseName,
  paidBy,
  price,
  date,
}: ExpensesListItemProps) {
  const urlWithoutSpaces = expenseName.replace(/\s+/g, '').toLocaleLowerCase()
  return (
    <Link to={urlWithoutSpaces}>
      <li className="expenses-list-item">
        <div className="expenses-information">
          <h1 className="expenses-heading">{expenseName}</h1>
          <p>
            paid by <span>{paidBy}</span>
          </p>
        </div>
        <div>
          <div className="expenses-price"><BsCurrencyEuro size={17}/>{price}</div>
          <div className="expenses-date">{date}</div>
        </div>
      </li>
    </Link>
  )
}

export default ExpensesListItem
