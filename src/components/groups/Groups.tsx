import GroupListItem from '../group-list-item/GroupListItem'
import './groups.styles.scss'
import groupsData from '../../../public/db/groupsData.json'

export default function Groups() {
  return (
    <ul className="groups-list">
      {groupsData.map(({ id, groupName, description }) => (
        <GroupListItem
          key={id}
          groupName={groupName}
          description={description}
        />
      ))}
    </ul>
  )
}
