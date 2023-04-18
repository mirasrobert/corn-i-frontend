import Home from './screens/Home'
import Talaarawan from './screens/Talaarawan'
import Forecasting from './screens/Forecasting'

import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './screens/Login'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const location = useLocation()

  // Only show the navbar if the current route is not "/login"
  const showNavbar = location.pathname !== '/login'

  return (
    <div className='App'>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/talaarawan' element={<Talaarawan />} />
        <Route path='/forecasting' element={<Forecasting />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
