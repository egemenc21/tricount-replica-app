import { useEffect, useState } from 'react'
import './add-tricount.styles.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { fetchEmptyCurrencyData } from '../../utils/db/db'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import { toast } from 'react-toastify'
import { addCollectionAndDocumentsToUser } from '../../utils/firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { nanoid } from 'nanoid'
import { fetchGroupsAsync } from '../../store/groups/groups.reducer'

// interface AddTricountProps {

// }
interface FormFields {
  id: string
  title: string
  description: string
  currency: string
  participant: string
  participators: string[]
}

const defaultFormFields: FormFields = {
  id: '',
  title: '',
  description: '',
  currency: 'eur',
  participant: '',
  participators: [],
}

function AddTricount() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const [allCurrency, setAllCurrency] = useState<
    { currency: string; abbreviation: string; symbol: string }[]
  >([])
  const [formFields, setFormFields] = useState(defaultFormFields)

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        const response = await fetchEmptyCurrencyData()
        setAllCurrency(response) // Update the state with fetched data
      } catch (error) {
        console.log(error)
      }
    }

    fetchCurrencyData()
  }, [])

  const { title, description, currency, participant, participators } =
    formFields

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    const id = nanoid()
    const { participant: formParticipant, ...updatedFormFields } = formFields
    updatedFormFields.id = id

    if (user) {
      await addCollectionAndDocumentsToUser(
        'groups',
        updatedFormFields,
        user.uid
      )
      dispatch(fetchGroupsAsync(user?.uid))
    }
    navigate('/home')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }
  const handleOnClick = () => {
    if (participant.trim() !== '') {
      if (!participators.includes(participant)) {
        setFormFields({
          ...formFields,
          participators: [...participators, participant],
        })
      } else {
        toast.error('Participant already exists in the list.')
      }
    }
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
        <label>
          <div>Currency:</div>
          <select
            name="currency"
            value={currency}
            onChange={handleChange}
            id="currency"
            className="currency"
            required
          >
            {allCurrency &&
              allCurrency.map((item, index) => (
                <option key={index} value={item.abbreviation}>
                  {item.abbreviation}
                </option>
              ))}
          </select>
        </label>
        <label>
          <div>Add Participant:</div>
          <div className="add-participant">
            <input
              type="text"
              className="participant"
              name="participant"
              placeholder="Participant"
              value={participant}
              onChange={handleChange}
              required
            />
            <Button
              buttonType={BUTTON_TYPE_CLASSES.base}
              onClick={handleOnClick}
              type="button"
            >
              ADD
            </Button>
          </div>
        </label>
        <div>Participators:</div>
        {participators &&
          participators.map((item, index) => <p key={index}>{item}</p>)}

        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
          Add Tricount
        </Button>
      </form>
    </section>
  )
}

export default AddTricount
