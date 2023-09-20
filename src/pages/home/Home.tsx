import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import HomePreview from '../../components/home-preview/HomePreview'
import EachTriCount from '../each-tricount/EachTriCount'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectCurrentUser } from '../../store/user/user.selector'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import AddTricount from '../add-tricount/AddTricount'


function Home() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const userId = user?.uid

  useEffect(() => {
    const addCollection = async () => {
      if (userId) {
        dispatch(fetchTriCountsAsync(userId, 'tricounts'))
      }
    }
    addCollection()
  }, [dispatch, userId])

  return (
    <Routes>
      <Route path="/" element={<HomePreview />} />
      <Route path="/add-tricount" element={<AddTricount />} />
      <Route path=":tricountId/*" element={<EachTriCount />} />
    </Routes>
  )
}

export default Home
