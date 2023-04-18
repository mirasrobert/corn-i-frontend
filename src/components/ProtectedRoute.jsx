import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../features/authSlice'

import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { user, loading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full pt-16'>
        <img
          src='https://media.tenor.com/wfEN4Vd_GYsAAAAM/loading.gif'
          alt='loader'
          className='h-full'
        />
      </div>
    )
  }

  if (!loading && user) {
    return <>{children}</>
  } else {
    return navigate('/login')
  }
}

export default ProtectedRoute
