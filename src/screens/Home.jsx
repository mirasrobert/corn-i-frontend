import { Link } from 'react-router-dom'
import CandelariaMap from '../components/CandelariaMap'
import ProtectedRoute from '../components/ProtectedRoute'

const Home = () => {
  return (
    <>
      <ProtectedRoute>
        <div className='flex space-x-2'>
          <h1 className='text-3xl'>Candelaria Quezon Corn Fields </h1>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-8 h-8'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
            />
          </svg>
        </div>

        <div className='map-size mt-6'>
          <div className='w-full h-full'>
            <CandelariaMap />
          </div>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default Home
