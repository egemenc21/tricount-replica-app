import ExpensesListItem from '../expenses-list-item/ExpensesListItem'
import Footer from '../../layout/footer/Footer'
import './expenses.styles.scss'

export interface ExpensesDataParams {
  id: number
  title: string
  price: number
  date: string
  paidBy: string
  forWhom: string[]
}
type ExpensesProps = {
  expensesData: ExpensesDataParams[] // Ensure this matches the prop name in your component
}

function Expenses(props: ExpensesProps) {
  const { expensesData } = props
  

  return (
    <div className="expenses-container">
      <div className="all-expenses">
        {expensesData &&
          expensesData.map((item) => (
            <ExpensesListItem
              key={item.id}
              title={item.title}
              paidBy={item.paidBy}
              price={item.price}
              date={item.date}
            />
          ))}
        <div>
          {!expensesData ? <p>You do not have any tricount yet</p> : null}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Expenses
