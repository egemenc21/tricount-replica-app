import { Link } from 'react-router-dom'
import './group-list-item.style.scss'

interface GroupListItemProps {
  groupName: string
  description?: string
}
function GroupListItem({
  groupName,
  description = 'No Description',
}: GroupListItemProps) {
  return (
    <Link to="asdf">
      <li className="group-list-item">
        <h1>{groupName}</h1>
        <p>{description}</p>
      </li>
    </Link>
  )
}

export default GroupListItem
