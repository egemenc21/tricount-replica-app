import { useState } from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { nanoid } from 'nanoid'
import './add-expense.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'

interface FormProps {
  id: string
  title: string
  amount: string
  date: string
  paidBy: string
  forWhom: string[]
}

const defaultFormFields: FormProps = {
  id: '',
  title: '',
  amount: '',
  date: new Date().toISOString().split('T')[0],
  paidBy: '',
  forWhom: [],
}

function AddExpense() {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { title, amount, date, paidBy, forWhom } = formFields

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = nanoid()
    const updatedFormFields = { ...formFields, id }
    console.log(updatedFormFields)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      if (e.target.checked ) {
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
        <AiOutlineArrowLeft size={25} />
        <div className="add-expense-heading">New expense</div>
      </nav>
      <form onSubmit={handleSubmit} className="add-expenses-form">
        <label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            value={amount}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <div>Date:</div>
          <input
            type="date"
            id="date"
            name="date"
            onChange={handleChange}
            value={date}
            placeholder="dd/mm/yyyy"
            required
          />
        </label>
        <label>
          <div>Paid by:</div>
          <select
            name="paidBy"
            id="paidBy"
            onChange={handleChange}
            value={paidBy}
            required
          >
            <option value="ege">ege</option>
            <option value="julie">julie</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            id="forWhomEge"
            name="forWhom"
            onChange={handleChange}
            value="ege"
          />
          <span>Ege</span>
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            id="forWhomJulie"
            name="forWhom"
            onChange={handleChange}
            value="julie"
          />
          <span>Julie</span>
        </label>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Add Expense
        </Button>
      </form>
    </section>
  )
}

export default AddExpense
