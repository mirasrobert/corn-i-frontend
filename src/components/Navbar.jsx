import { NavLink, Link } from 'react-router-dom'
import Logo from '../assets/images/ic_logo.png'

import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const logout = () => {
    if (localStorage.getItem('token')) localStorage.removeItem('token')

    navigate('/login')
  }

  return (
    <nav className='bg-green-500 rounded-lg my-5'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link to='/' className='text-white'>
              <div className='flex items-center'>
                <img src={Logo} alt='Logo' className='h-24' />
                <h1 className='ml-3 text-3xl font-bold	'>Corn.I</h1>
              </div>
            </Link>
          </div>
          <div className='hidden md:block'>
            <div className='ml-10 flex items-baseline space-x-4'>
              <NavLink
                to='/'
                className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium'>
                Corn Map
              </NavLink>
              <NavLink
                to='/talaarawan'
                className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium'>
                Talaarawan
              </NavLink>
              <NavLink
                to='/forecasting'
                className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium'>
                Forecasting
              </NavLink>
              <li
                onClick={() => logout()}
                className='text-white hover:bg-gray-700 px-3 py-2 rounded-md text-lg font-medium list-none hover:cursor-pointer'>
                Logout
              </li>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
