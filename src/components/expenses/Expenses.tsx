import { useAppSelector } from '../../hooks'
import ExpensesListItem from '../expenses-list-item/ExpensesListItem'
import Footer from '../../layout/footer/Footer'
import './expenses.styles.scss'
import { selectExpenses } from '../../store/expenses/expenses.selector'

function Expenses() {
  const expenses = useAppSelector(selectExpenses)

  return (
    <div className="expenses-container">
      <div className="all-expenses">
        {expenses &&
          expenses.map((expense) => (
            <ExpensesListItem
              key={expense.id}
              expense={expense}
            />
          ))}
        <div>{!expenses ? <p>You do not have any tricount yet</p> : null}</div>
      </div>
      <Footer />
    </div>
  )
}

export default Expenses
