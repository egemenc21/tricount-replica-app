import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import HomePreview from '../../components/home-preview/HomePreview'
import EachGroup from '../../components/each-group/EachGroup'
import { useAppDispatch } from '../../hooks'
import { setGroups } from '../../store/groups/groups.reducer'
import fetchGroupsData from '../../utils/db/db'

function Home() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getGroups = async () => {
      const groupsArray = await fetchGroupsData()
      console.log(setGroups(groupsArray))
      dispatch(setGroups(groupsArray))
    }
    getGroups()
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<HomePreview />} />
      <Route path=":group/*" element={<EachGroup />} />
    </Routes>
  )
}

export default Home
