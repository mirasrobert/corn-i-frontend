import React, { useState, useEffect } from 'react'

import Logo from '../assets/images/ic_logo.png'

import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/authSlice'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email != '' && password != '') {
      dispatch(login({ email, password }))
    }
  }

  return (
    <>
      <div className='flex flex-wrap min-h-screen w-full content-center justify-center py-10'>
        {/* LOGIN CARD */}
        <div className='flex shadow-md'>
          <div
            className='flex flex-wrap content-center justify-center rounded-l-md bg-white'
            style={{ width: '24rem', height: '32rem' }}>
            <div className='w-72'>
              <h1 className='text-xl font-semibold'>Welcome back</h1>
              <small className='text-gray-400'>
                Welcome back! Please enter your details
              </small>
              <form className='mt-4' onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='mb-2 block text-xs font-semibold'>
                    Email
                  </label>
                  <input
                    type='text'
                    placeholder='Enter your email'
                    className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>

                <div className='mb-3'>
                  <label className='mb-2 block text-xs font-semibold'>
                    Password
                  </label>
                  <input
                    type='password'
                    placeholder='*****'
                    className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <div className='mb-3 flex flex-wrap content-center'>
                  <input
                    id='remember'
                    type='checkbox'
                    className='mr-1 checked:bg-green-700'
                  />
                  <label
                    htmlFor='remember'
                    className='mr-auto text-xs font-semibold'>
                    Remember me
                  </label>
                  {/* <a href='#' className='text-xs font-semibold text-green-700'>
                    Forgot password?
                  </a> */}
                </div>

                <div className='mb-3'>
                  <button
                    type='submit'
                    className='mb-1.5 block w-full text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'>
                    Sign in
                  </button>

                  {/* <button className='flex flex-wrap justify-center w-full border border-gray-300 hover:border-gray-500 px-2 py-1.5 rounded-md'>
                    <img
                      className='w-5 mr-2'
                      src='https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA'
                      alt='Google logo'
                    />
                    Sign in with Google
                  </button> */}
                </div>
              </form>

              <div className='text-center'>
                <span className='text-xs text-gray-400 font-semibold'>
                  Don't have account?
                </span>
                <a
                  href='#'
                  className='ml-1 text-xs font-semibold text-green-700'>
                  Contact Administrator
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* IMAGE HERE */}
        <div
          className='flex flex-wrap content-center justify-center rounded-r-md relative hidden sm:block'
          style={{ width: '24rem', height: '32rem' }}>
          <img
            className='w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md'
            src='https://c4.wallpaperflare.com/wallpaper/633/346/484/the-sun-rays-trees-nature-wallpaper-preview.jpg'
          />
          <img
            src={Logo}
            alt='Logo'
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100px', // Set the width of the logo
              height: 'auto', // Set the height of the logo to be proportional to the width
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Login
