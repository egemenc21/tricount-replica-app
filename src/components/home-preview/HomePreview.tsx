import { Outlet } from 'react-router-dom'
import { Vortex } from 'react-loader-spinner'
import Navigation from '../../layout/navigation/Navigation'
import { useAppSelector } from '../../hooks'
import { selectTriCountsIsLoading } from '../../store/tricounts/tricounts.selector'
import TriCounts from '../tricounts/TriCounts'

// interface HomePreviewProps {

// }

export default function HomePreview() {
  const isLoading = useAppSelector(selectTriCountsIsLoading)
  return (
    <>
      <Navigation />
      {isLoading ? (
      <Vortex
      visible={true}
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
      ) : (
        <>
          <TriCounts />
          <Outlet />
        </>
      )}
    </>
  )
}
