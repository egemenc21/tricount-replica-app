import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import HomePreview from '../../components/home-preview/HomePreview'
import EachGroup from '../../components/each-group/EachGroup'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { fetchGroupsAsync } from '../../store/groups/groups.reducer'


function Home() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const userId = user?.uid

  useEffect(() => {
    const addCollection = async () => {
      // const groupsArray = await fetchGroupsData()
      // console.log(groupsArray)

      if (userId) {        
        // await addCollectionAndDocumentsToUser('groups',groupsArray,userId)
        
        dispatch(fetchGroupsAsync(userId))
        console.log('fetching data is successful')
      }
      
    }
    addCollection()
  }, [dispatch, userId])

  return (
    <Routes>
      <Route index element={<HomePreview />} />
      <Route path=":group/*" element={<EachGroup />} />
    </Routes>
  )
}

export default Home
