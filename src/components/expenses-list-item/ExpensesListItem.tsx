import { Link, useParams } from 'react-router-dom'
import './expense-list-item.styles.scss'
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
  const { tricount } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams
  const user = useAppSelector(selectCurrentUser)

  const dispatch = useAppDispatch()
  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(removeExpenseFromExpenses(id))
    if (user) {
      await removeExpenseFromCollection(
        'tricounts',
        expense,
        user.uid,
        tricount
      )
    }
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
          <div
            className="expenses-price"
            dangerouslySetInnerHTML={{ __html: `${symbol}${price}` }}
          />       

          <div className="expenses-date">{formattedDate}</div>
          <span className="expenses-price">
  {symbol}
  {price}
</span>

        </div>
      </li>
    </Link>
  )
}

export default ExpensesListItem
