import { Link, useLocation } from 'react-router-dom'
import './footer.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import { useAppSelector } from '../../hooks'
import {
  selectTotalExpenses,
  selectTotalExpensesUsers,
} from '../../store/expenses/expenses.selector'

interface FooterProps {
  symbol: string
}

function Footer({ symbol }: FooterProps) {
  const location = useLocation()
  const totalExpenses = useAppSelector(selectTotalExpenses)
  const totalExpensesOnEachUser = useAppSelector(selectTotalExpensesUsers)

  return (
    <footer>
      <div className="each-total">
        <h5>EACH TOTAL</h5>
        {totalExpensesOnEachUser &&
          Object.keys(totalExpensesOnEachUser).map((userId) => (
            <li
              key={userId}
              dangerouslySetInnerHTML={{
                __html: `${userId}: ${symbol}${totalExpensesOnEachUser[userId]}`,
              }}
            />
          ))}
      </div>
      <Link to={`${location.pathname}/add-expense`} className="add-expense">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.addExpense}
          className="add-expense"
        >
          +
        </Button>
      </Link>
      <div className="total-expenses">
        <h5>TOTAL EXPENSES</h5>
        {totalExpenses ? (
          <span
            dangerouslySetInnerHTML={{
              __html: ` ${symbol}${totalExpenses}`,
            }}
          />
        ) : (
          <p>0</p>
        )}
      </div>
    </footer>
  )
}

export default Footer
