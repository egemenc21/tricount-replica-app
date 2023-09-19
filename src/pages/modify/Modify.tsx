import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import Checkbox from '../../components/checkbox/Checkbox'
import PaidBy from '../../components/paid-by/PaidBy'
import './modify.styles.scss'
import { updateExpenseInCollection } from '../../utils/firebase/firebase.utils'
import { useAppDispatch, useAppSelector, useEachTriCount } from '../../hooks'
import { Expense } from '../../store/tricounts/tricounts.types'
import { TriCountRouteParams } from '../../components/header-list/HeaderList'
import { selectCurrentUser } from '../../store/user/user.selector'
import { ExpenseRouteParams } from '../each-expense/EachExpense'
import { selectExpenseById } from '../../store/expenses/expenses.selector'
import { updateExpenseInExpenses } from '../../store/expenses/expenses.reducer'
// interface ModifyProps {

// }

function ModifyExpense() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()
  const { tricount } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams

  const { expenseId } = useParams<
    keyof ExpenseRouteParams
  >() as ExpenseRouteParams
  const eachTriCount = useEachTriCount(tricount)
  const { participators } = eachTriCount
  const defaultFormFields: Expense = {
    id: '',
    title: '',
    price: 0,
    date: new Date().toISOString().split('T')[0],
    paidBy: participators[0],
    forWhom: [],
  }
  const [formFields, setFormFields] = useState(defaultFormFields)
  const expense = useAppSelector(selectExpenseById(expenseId))
  useEffect(() => {
    if (expense) {
      setFormFields(expense)
    }
  }, [expense])
  if (!expense) {
    return <p>Expense not found</p>
  }
  const { id, title, price, date, paidBy, forWhom } = formFields

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedFormFields = {
      ...formFields,
      id,
    }
    console.log(updatedFormFields)

    // Adding expense to yourself
    // if (paidBy === forWhom.find(() => paidBy) && forWhom.length === 1) {
    //   toast.error('You can not add expense for yourself')
    //   return
    // }

    if (forWhom.length === 0) {
      toast.error('Please select that expense is for whom')
      return
    }

    if (user) {
      //   await addExpenseToCollection(
      //     'tricounts',
      //     updatedFormFields,
      //     user.uid,
      //     tricount
      //   )
      await updateExpenseInCollection(
        user.uid,
        tricount,
        expenseId,
        updatedFormFields
      )
      dispatch(updateExpenseInExpenses(updatedFormFields))
    }

    navigate(`/home/${tricount}/${expenseId}`)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      if (name === 'forWhomChecker') {
        // If "FOR WHOM" checkbox is checked, check the other two checkboxes
        if (e.target.checked) {
          setFormFields({ ...formFields, forWhom: participators })
        } else {
          // If "FOR WHOM" checkbox is unchecked, uncheck the other two checkboxes
          setFormFields({ ...formFields, forWhom: [] })
        }
      } else if (e.target.checked) {
        // Add the value to the array when the checkbox is checked
        setFormFields({ ...formFields, forWhom: [...forWhom, value] })
      } else {
        // Remove the value from the array when the checkbox is unchecked
        setFormFields({
          ...formFields,
          forWhom: forWhom.filter((item) => item !== value),
        })
      }
    } else {
      setFormFields({ ...formFields, [name]: value })
    }
  }
  return (
    <section className="add-expense-section">
      <nav className="add-expense-header">
        <Link to={`/home/${tricount}/${expenseId}`}>
          <AiOutlineArrowLeft size={25} />
        </Link>
        <div className="add-expense-heading">Modify the expense</div>
      </nav>
      <form onSubmit={handleSubmit} className="add-expenses-form">
        <label>
          <div>Title:</div>
          <input
            type="text"
            className="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <div>Amount:</div>
          <input
            type="number"
            inputMode="numeric"
            className="price"
            name="price"
            placeholder="amount"
            value={price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <div>Date:</div>
          <input
            type="date"
            className="date"
            name="date"
            onChange={handleChange}
            value={date}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <PaidBy
          participators={participators}
          paidBy={paidBy}
          handleChange={handleChange}
        />
        <Checkbox handleChange={handleChange} forWhom={forWhom} price={price} />
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Add Expense
        </Button>
      </form>
    </section>
  )
}

export default ModifyExpense
