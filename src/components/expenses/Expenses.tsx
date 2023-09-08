import ExpensesListItem from '../expenses-list-item/ExpensesListItem'
import Footer from '../footer/Footer'
import './expenses.styles.scss'

function formatDate(date: Date) {
  const day = date.getDate()
  const month = date.getMonth() + 1 // Months are zero-based, so we add 1
  const year = date.getFullYear()

  // Ensure day and month are displayed with two digits
  const formattedDay = String(day).padStart(2, '0')
  const formattedMonth = String(month).padStart(2, '0')

  return `${formattedDay}/${formattedMonth}/${year}`
}

const sampleDate = new Date(2023, 0, 15)
// Format the date
const formattedDate = formatDate(sampleDate)

function Expenses() {
  return (
    <div className='expenses-container'>
      <div className="all-expenses">
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
        <ExpensesListItem
          expenseName="Billa + Etsan"
          paidBy="Julie"
          price={11.87}
          date={formattedDate}
        />
      </div>
      <Footer />
    </div>
  )
}

export default Expenses
