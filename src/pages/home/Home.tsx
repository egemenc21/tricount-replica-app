import { Route, Routes } from 'react-router-dom'
import HomePreview from '../../components/home-preview/HomePreview'
import EachGroup from '../../components/each-group/EachGroup'

function Home() {
  return (
    <Routes>
      <Route index element={<HomePreview />} />
      <Route path=":group/*" element={<EachGroup />} />
    </Routes>
  )
}

export default Home
