import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import HomePreview from '../../components/home-preview/HomePreview'
import EachGroup from '../../components/each-group/EachGroup'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setGroups } from '../../store/groups/groups.reducer'
import fetchGroupsData from '../../utils/db/db'
import { selectCurrentUser } from '../../store/user/user.selector'


function Home() {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectCurrentUser) 

  useEffect(() => {
    const getGroups = async () => {
      const groupsArray = await fetchGroupsData()    
      dispatch(setGroups(groupsArray))
    }
    getGroups()
  }, [dispatch])
  console.log(users?.email)

  return (
    <Routes>
      <Route index element={<HomePreview />} />
      <Route path=":group/*" element={<EachGroup />} />
    </Routes>
  )
}

export default Home
