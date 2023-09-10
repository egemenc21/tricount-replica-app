import { Link } from 'react-router-dom'
import './expense-list-item.styles.scss'
import { BsCurrencyEuro } from 'react-icons/bs'
import { formatDate } from '../../utils/format/format.utils'

interface ExpensesListItemProps {
  title: string
  paidBy: string
  price: number
  date: string
}
function ExpensesListItem({
  title,
  paidBy,
  price,
  date,
}: ExpensesListItemProps) {
  const urlWithoutSpaces = title.replace(/\s+/g, '').toLocaleLowerCase()
  const formattedDate = formatDate(new Date(date))
  return (
    <Link to={urlWithoutSpaces}>
      <li className="expenses-list-item">
        <div className="expenses-information">
          <h1 className="expenses-heading">{title}</h1>
          <p>
            paid by <span>{paidBy}</span>
          </p>
        </div>
        <div>
          <div className="expenses-price">
            <BsCurrencyEuro size={17} />
            {price}
          </div>
          <div className="expenses-date">{formattedDate}</div>
        </div>
      </li>
    </Link>
  )
}

export default ExpensesListItem
