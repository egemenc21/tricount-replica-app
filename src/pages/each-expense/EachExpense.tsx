import { Link, useParams } from 'react-router-dom'
import './each-expense.styles.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import { selectExpenseById } from '../../store/expenses/expenses.selector'
import { formatDate } from '../../utils/format/format.utils'
import { TriCountRouteParams } from '../../components/header-list/HeaderList'
import { calculateShare } from '../../utils/balances/balances.utils'
// interface EachExpenseProps {

// }
export type ExpenseRouteParams = {
  expenseId: string
}
function EachExpense() {
  const { tricount } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams

  const { expenseId } = useParams<
    keyof ExpenseRouteParams
  >() as ExpenseRouteParams
  const expense = useAppSelector(selectExpenseById(expenseId))
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()

  if (!expense) {
    return <p>Expense not found</p>
  }
  const { title, paidBy, price, date, forWhom } = expense
  console.log(forWhom)
  const share = calculateShare(forWhom, price)
  console.log(share);
  

  const handleOnClick = () => {
    if (user) dispatch(fetchTriCountsAsync(user.uid, 'tricounts'))
  }
  const formattedDate = formatDate(new Date(date))

  return (
    <>
      <div className="expense-header">
        <div className="expense-route-container">
          <Link to={`/home/${tricount}`} onClick={handleOnClick}>
            <AiOutlineArrowLeft size={25} />
          </Link>
          <Link to="modify">Modify</Link>
        </div>
        <h1 className="expense-title">{title}</h1>
        <div className="expense-price">Price: {price}</div>
        <div className="expense-paidBy-container">
          <div className="">Paid by : {paidBy}</div>
          <div className="">{formattedDate}</div>
        </div>
      </div>
      {forWhom.map((item) => (
        <li key={item}>{item}</li>
      ))}
      <div>s</div>
    </>
  )
}

export default EachExpense
