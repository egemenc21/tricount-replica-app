import { useEffect, useState } from 'react'
import './add-tricount.styles.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { nanoid } from 'nanoid'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'
import { addCollectionAndDocumentsToUser } from '../../utils/firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import fetchEmptyCurrencyData from '../../utils/db/db'
import { CurrencyData } from '../../store/tricounts/tricounts.types'
import currencyData from '../../db/currency.json'

interface FormFields {
  id: string
  title: string
  description: string
  currency: string
  currencyData: CurrencyData
  participant: string
  participators: string[]
}

const defaultFormFields: FormFields = {
  id: '',
  title: '',
  description: '',
  currency: 'eur',
  currencyData: {
    abbreviation: 'EUR',
    symbol: '€',
  },
  participant: '',
  participators: [],
}

function AddTricount() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const [allCurrency, setAllCurrency] = useState<
    { currency: string; abbreviation: string; symbol: string | null }[]
  >([])
  const [formFields, setFormFields] = useState(defaultFormFields)

  useEffect(() => {
    setAllCurrency(currencyData)
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
        'tricounts',
        updatedFormFields,
        user.uid
      )
      dispatch(fetchTriCountsAsync(user?.uid, 'tricounts'))
    }
    navigate('/home')
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    if (name === 'currency') {
      const selectElement = e.target as HTMLSelectElement
      const { selectedIndex } = selectElement
      if (selectedIndex !== -1) {
        const selectedOption = selectElement.options[selectedIndex]
        const dataSymbol = selectedOption.getAttribute('data-symbol')
        console.log('Data Symbol:', dataSymbol)

        setFormFields({
          ...formFields,
          currency: value, // Update the currency value with the selected abbreviation
          currencyData: {
            abbreviation: value, // Update the abbreviation
            symbol: dataSymbol || '', // Update the symbol, use an empty string as fallback
          },
        })
      }
    } else {
      setFormFields({ ...formFields, [name]: value })
    }
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
                <option
                  key={index}
                  data-symbol={item.symbol}
                  value={item.abbreviation}
                >
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
