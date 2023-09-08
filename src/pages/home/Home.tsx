import { Route, Routes } from 'react-router-dom'
import HomePreview from '../../components/home-preview/HomePreview'
import Group from '../../components/group/Group'

function Home() {
  return (
    <Routes>
      <Route index element={<HomePreview />} />
      <Route path=":group/*" element={<Group />} />
    </Routes>
  )
}

export default Home
