import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import './App.scss'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'
import Auth from './pages/auth/Auth'
import store from './store/store'
import { useAppDispatch } from './hooks'
import { setCurrentUser } from './store/user/user.reducer'
import { createUserDocumentFromAuth } from './utils/firebase/firebase.utils'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('user signed in')
        await createUserDocumentFromAuth(user)
        dispatch(setCurrentUser(user))
      }
    })
  })

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="home/*" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
function WrappedApp() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </Provider>
  )
}

export default WrappedApp
