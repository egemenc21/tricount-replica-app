import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectTriCounts } from '../../store/tricounts/tricounts.selector'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import TriCountListItem from '../tricount-list-item/TriCountListItem'
import './tricounts.styles.scss'

export default function TriCounts() {
  const tricountsData = useAppSelector(selectTriCounts)

  return (
    <>
      <ul className="tricounts-list">
        {tricountsData.map(({ id, title, description }) => (
          <TriCountListItem key={id} title={title} description={description} />
        ))}
      </ul>
      <Link to="add-tricount">
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="button">
          New Tricount
        </Button>
      </Link>
    </>
  )
}