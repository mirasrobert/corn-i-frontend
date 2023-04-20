import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../features/authSlice'

import { useNavigate } from 'react-router-dom'

import DefaultLoader from './DefaultLoader'

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
        <DefaultLoader />
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
