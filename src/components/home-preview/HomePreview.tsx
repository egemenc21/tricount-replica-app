import { Outlet } from 'react-router-dom'
import TriCounts from '../tricounts/TriCounts'
import Navigation from '../../layout/navigation/Navigation'

// interface HomePreviewProps {

// }

export default function HomePreview() {
  return (
    <>
      <Navigation />
      <TriCounts />
      <Outlet />
    </>
  )
}
