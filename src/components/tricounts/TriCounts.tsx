import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectTriCounts } from '../../store/tricounts/tricounts.selector'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import TriCountListItem from '../tricount-list-item/TriCountListItem'
import './tricounts.styles.scss'

export default function TriCounts() {
  const tricountsData = useAppSelector(selectTriCounts)  

  return (
    <div className='tricounts-container'>
      <ul className="tricounts-list">
        {tricountsData && tricountsData.map(({ id, title, description }) => (
          <TriCountListItem key={id} title={title} description={description} id={id} />
        ))}
      </ul>
      <Link to="add-tricount" className='add-tricount'>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="button" className='add-tricount'>
          New Tricount
        </Button>
      </Link>
    </div>
  )
}
