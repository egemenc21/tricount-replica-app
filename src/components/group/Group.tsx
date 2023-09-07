// type Props = {}
import { useParams } from 'react-router-dom'
import Header from '../header/Header'
import Groups from '../groups/Groups'

function Group() {
  const { group } = useParams()
  console.log(group)

  return (
    <div>
      <Header title="Opucuk" description="egemencelik,julie" />
      <Groups/>
    </div>
  )
}

export default Group
