import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import HomePreview from '../../components/home-preview/HomePreview'
import EachGroup from '../each-group/EachGroup'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { fetchGroupsAsync } from '../../store/groups/groups.reducer'
import AddTricount from '../add-tricount/AddTricount'
// import fetchGroupsData from '../../utils/db/db'
// import { addCollectionAndDocumentsToUser } from '../../utils/firebase/firebase.utils'

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
      }
    }
    addCollection()
  }, [dispatch, userId])

  return (
    <Routes>
      <Route path="/" element={<HomePreview />} />
      <Route path="/add-tricount" element={<AddTricount />} />
      <Route path=":group/*" element={<EachGroup />} />
    </Routes>
  )
}

export default Home
