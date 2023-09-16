import { Outlet } from 'react-router-dom'
import Groups from '../groups/Groups'
import Navigation from '../../layout/navigation/Navigation'

// interface HomePreviewProps {

// }

export default function HomePreview() {
  return (
    <>
      <Navigation />
      <Groups />
      <Outlet />
    </>
  )
}
