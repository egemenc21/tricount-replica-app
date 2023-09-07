// type Props = {}
import { useParams } from 'react-router-dom'

function Group() {
  const { group } = useParams()
  console.log(group);
  
  return <div>{group}</div>
}

export default Group
