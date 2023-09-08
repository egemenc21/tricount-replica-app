import GroupListItem from '../group-list-item/GroupListItem'
import './groups.styles.scss'

export default function Groups() {
  return (
    <>
      <ul className="groups-list">
        <GroupListItem description="Muck muck" groupName="Öpücük" />
        <GroupListItem description="olley" groupName="Op op" />
        <GroupListItem description="cok guzel" groupName="laylaylom" />
      </ul>
      <div></div>
    </>
  )
}
