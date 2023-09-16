import { Link, useParams } from 'react-router-dom'
import './expense-list-item.styles.scss'
import { BsCurrencyEuro } from 'react-icons/bs'
import { formatDate } from '../../utils/format/format.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeExpenseFromExpenses } from '../../store/expenses/expenses.reducer'
import { removeExpenseFromCollection } from '../../utils/firebase/firebase.utils'
import { Expense } from '../../store/groups/groups.types'
import { selectCurrentUser } from '../../store/user/user.selector'
import { GroupRouteParams } from '../header-list/HeaderList'

interface ExpensesListItemProps {
  expense: Expense
}
function ExpensesListItem({ expense }: ExpensesListItemProps) {
  const { id, title, paidBy, price, date } = expense
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  const user = useAppSelector(selectCurrentUser)

  const dispatch = useAppDispatch()
  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(removeExpenseFromExpenses(id))
    if (user)
      await removeExpenseFromCollection('groups', expense, user.uid, group)
  }
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
          <button onClick={handleOnClick} type="button">
            x
          </button>
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
