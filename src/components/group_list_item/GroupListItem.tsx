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
    <li>
      <h1>{groupName}</h1>
      <p>{description}</p>
    </li>
  )
}

export default GroupListItem
