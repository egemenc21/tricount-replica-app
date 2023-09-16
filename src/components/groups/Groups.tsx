import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks'
import { selectGroups } from '../../store/groups/groups.selector'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button'
import GroupListItem from '../group-list-item/GroupListItem'
import './groups.styles.scss'

export default function Groups() {
  const groupsData = useAppSelector(selectGroups)

  return (
    <>
      <ul className="groups-list">
        {groupsData.map(({ id, title, description }) => (
          <GroupListItem key={id} title={title} description={description} />
        ))}
      </ul>
      <Link to='add-tricount'>
        <Button buttonType={BUTTON_TYPE_CLASSES.base} type="button">
          New Tricount
        </Button>
      </Link>
    </>
  )
}
