import GroupListItem from "../group-list-item/GroupListItem";
import './groups.style.scss'

export default function Groups() {
  return (
    <ul className="groups-list">
      <GroupListItem description="Muck muck" groupName="Öpücük"/>
      <GroupListItem description="Muck muck" groupName="Öpücük"/>
      <GroupListItem description="Muck muck" groupName="Öpücük"/>
    </ul>
  )
}
