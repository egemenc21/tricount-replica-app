import { useParams } from 'react-router-dom'
import { useEachTriCount } from '../../hooks'
import { TriCountRouteParams } from '../header-list/HeaderList'
import { calculateShare } from '../../utils/balances/balances.utils'

interface CheckboxProps {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void
  forWhom: string[]
  price: number  
}

function Checkbox({ handleChange, forWhom, price }: CheckboxProps) {
  const { tricount } = useParams<keyof TriCountRouteParams>() as TriCountRouteParams
  const eachTriCount = useEachTriCount(tricount)
  const { participators } = eachTriCount

  const share = calculateShare(forWhom, price)

  return (
    <>
      <label className="checkbox">
        <div>
          <input
            type="checkbox"
            name="forWhomChecker"
            onChange={handleChange}
            checked={forWhom.length === participators.length}
          />
          <span>FOR WHOM</span>
        </div>

        <div className="add-expense-advance">ADVANCE</div>
      </label>
      {participators.map((person) => (
        <label className="checkbox" key={person}>
          <div>
            <input
              type="checkbox"
              name="forWhom"
              onChange={handleChange}
              value={person}
              checked={forWhom.includes(person)}
            />
            <span>{person}</span>
          </div>
          <div>{forWhom.includes(person) ? `${share}$` : ''}</div>
        </label>
      ))}
    </>
  )
}

export default Checkbox
