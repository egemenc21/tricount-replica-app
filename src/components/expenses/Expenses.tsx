import { useAppSelector } from '../../hooks'
import ExpensesListItem from '../expenses-list-item/ExpensesListItem'
import Footer from '../../layout/footer/Footer'
import './expenses.styles.scss'
import { selectExpenses } from '../../store/expenses/expenses.selector'
import { CurrencyData } from '../../store/tricounts/tricounts.types'

interface ExpensesProps {
  currencyData: CurrencyData
}

function Expenses({ currencyData }: ExpensesProps) {
  const expenses = useAppSelector(selectExpenses)

  return (
    <div className="expenses-container">
      <div className="all-expenses">
        {expenses ? (
          expenses.map((expense) => (
            <ExpensesListItem
              key={expense.id}
              expense={expense}
              symbol={currencyData.symbol}
            />
          ))
        ) : (
          <p>You do not have any expense yet</p>
        )}
      </div>
      <Footer symbol={currencyData.symbol} />
    </div>
  )
}

export default Expenses
