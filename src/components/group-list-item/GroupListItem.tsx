import { Link } from 'react-router-dom'
import './group-list-item.styles.scss'
import { stringConverter } from '../../utils/string/string.utils'

interface GroupListItemProps {
  groupName: string
  description?: string
}
function GroupListItem({
  groupName,
  description = 'No Description',
}: GroupListItemProps) {
  const routeName = stringConverter(groupName)

  return (
    <Link to={`${routeName}/expenses`}>
      <li className="group-list-item">
        <h1>{groupName}</h1>
        <p>{description}</p>
      </li>
    </Link>
  )
}

export default GroupListItem
