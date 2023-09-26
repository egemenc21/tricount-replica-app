import { Link } from 'react-router-dom'
import './tricount-list-item.styles.scss'
import { FaTrashAlt } from 'react-icons/fa'
import { removeTriCountFromCollection } from '../../utils/firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { removeTriCountFromTriCounts } from '../../store/tricounts/tricounts.reducer'

interface TriCountListItemProps {
  title: string
  description: string
  id: string
}
function TriCountListItem({
  title,
  description = 'No Description',
  id,
}: TriCountListItemProps) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (window.confirm('Are you sure you want to delete ?')) {
      if (user) {
        dispatch(removeTriCountFromTriCounts(id))
        await removeTriCountFromCollection('tricounts', user.uid, id)
      }
    }
  }

  return (
    <div className="tricount-list">
      <Link to={`${id}`}>
        <li className="tricount-list-item">
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <FaTrashAlt size={20} onClick={handleOnClick} />
        </li>
      </Link>
    </div>
  )
}

export default TriCountListItem
