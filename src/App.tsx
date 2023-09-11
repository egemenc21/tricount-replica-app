import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'
import './App.scss'
import Home from './pages/home/Home'
import NotFound from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
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
    </Provider>
  )
}

export default WrappedApp
