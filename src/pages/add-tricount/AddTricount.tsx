import { useState } from 'react'
import './add-tricount.styles.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
// interface AddTricountProps {

// }
const defaultFormFields = {
  title: '',
  description: '',
  currency: ['eur'],
  participators: [''],
}

function AddTricount() {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { title, description, currency, participators } = formFields

  const handleSubmit = () => {}
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <section className="add-tricount-section">
      <nav className="add-tricount-header">
        <Link to="/home">
          <AiOutlineArrowLeft size={25} />
        </Link>
        <div className="add-tricount-heading">New Tricount</div>
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
          <div>Description:</div>
          <input
            type="text"
            className="title"
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleChange}
            required
          />
        </label>
      </form>
    </section>
  )
}

export default AddTricount
