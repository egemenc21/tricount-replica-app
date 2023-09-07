import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

export default WrappedApp
