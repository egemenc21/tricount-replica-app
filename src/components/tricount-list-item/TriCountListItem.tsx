import { Link } from 'react-router-dom'
import './tricount-list-item.styles.scss'
import { stringConverter } from '../../utils/format/format.utils'
import { removeTriCountFromCollection } from '../../utils/firebase/firebase.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import {removeTriCountFromTriCounts} from '../../store/tricounts/tricounts.reducer'

interface TriCountListItemProps {
  title: string
  description: string
  id:string
}
function TriCountListItem({
  title,
  description = 'No Description',
  id
}: TriCountListItemProps) {
  const routeName = stringConverter(title)
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (user) {
      dispatch(removeTriCountFromTriCounts(id))
      await removeTriCountFromCollection('tricounts', user.uid, title)      
    }
  }

  return (
    <div>
      <Link to={`${routeName}`}>
        <li className="tricount-list-item">
          <h1>{title}</h1>
          <p>{description}</p>
        </li>
      </Link>
      <button type="button" onClick={handleOnClick}>
        x
      </button>
    </div>
  )
}

export default TriCountListItem
