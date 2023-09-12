import { Link } from 'react-router-dom'
import './group-list-item.styles.scss'
import { stringConverter } from '../../utils/format/format.utils'

interface GroupListItemProps {
  title: string
  description?: string
}
function GroupListItem({
  title,
  description = 'No Description',
}: GroupListItemProps) {
  const routeName = stringConverter(title)

  return (
    <Link to={`${routeName}`}>
      <li className="group-list-item">
        <h1>{title}</h1>
        <p>{description}</p>
      </li>
    </Link>
  )
}

export default GroupListItem
