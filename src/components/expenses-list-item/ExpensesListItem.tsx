import { Link, useParams } from 'react-router-dom'
import './expense-list-item.styles.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { formatDate } from '../../utils/format/format.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { removeExpenseFromExpenses } from '../../store/expenses/expenses.reducer'
import { removeExpenseFromCollection } from '../../utils/firebase/firebase.utils'
import { Expense } from '../../store/tricounts/tricounts.types'
import { selectCurrentUser } from '../../store/user/user.selector'
import { TriCountRouteParams } from '../header-list/HeaderList'

interface ExpensesListItemProps {
  expense: Expense
  symbol: string
}
function ExpensesListItem({ expense, symbol }: ExpensesListItemProps) {
  const { id, title, paidBy, price, date } = expense
  const { tricountId } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams
  const user = useAppSelector(selectCurrentUser)

  const dispatch = useAppDispatch()
  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (window.confirm('Are you sure you want to delete ?')) {
      dispatch(removeExpenseFromExpenses(id))
      if (user) {
        await removeExpenseFromCollection(
          'tricounts',
          expense,
          user.uid,
          tricountId
        )
      }
    }
  }

  const formattedDate = formatDate(new Date(date))
  return (
    <Link to={id}>
      <li className="expenses-list-item">
        <div className="expenses-information">
          <h2 className="expenses-heading">{title}</h2>
          <p>
            paid by <span>{paidBy}</span>
          </p>
        </div>
        <div>
          <FaTrashAlt size={20} onClick={handleOnClick} />

          <div className="expenses-date">{formattedDate}</div>
          <div
            className="expenses-price"
            dangerouslySetInnerHTML={{ __html: `${symbol}${price}` }}
          />
        </div>
      </li>
    </Link>
  )
}

export default ExpensesListItem
