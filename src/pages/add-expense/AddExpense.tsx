import { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { nanoid } from 'nanoid'
import './add-expense.styles.scss'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import { useAppDispatch, useAppSelector, useEachTriCount } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { TriCountRouteParams } from '../../components/header-list/HeaderList'
import { addExpenseToCollection } from '../../utils/firebase/firebase.utils'
import { Expense } from '../../store/tricounts/tricounts.types'
import Checkbox from '../../components/checkbox/Checkbox'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import PaidBy from '../../components/paid-by/PaidBy'

function AddExpense() {
  const user = useAppSelector(selectCurrentUser)
  const navigate = useNavigate()
  const { tricount } = useParams<keyof TriCountRouteParams>() as TriCountRouteParams
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

  const { title, price, date, paidBy, forWhom } = formFields
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = nanoid()
    const updatedFormFields = { ...formFields, id, price: +price }
    if (paidBy === forWhom.find(() => paidBy) && forWhom.length === 1) {
      toast.error('You can not add expense for yourself')
      return
    }
    if (forWhom.length === 0) {
      toast.error('Please select that expense is for whom')
      return
    }

    if (user) {
      await addExpenseToCollection('tricounts', updatedFormFields, user.uid, tricount)
      dispatch(fetchTriCountsAsync(user.uid,"tricounts"))
    }

    navigate(`/home/${tricount}`)
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
        <Link to={`/home/${tricount}`}>
          <AiOutlineArrowLeft size={25} />
        </Link>
        <div className="add-expense-heading">New expense</div>
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

export default AddExpense
