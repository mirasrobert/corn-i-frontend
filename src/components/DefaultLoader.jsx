import React from 'react'
import DefaultLoaderGIF from '../assets/images/loader_default.gif'

const DefaultLoader = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div>
        <img src={DefaultLoaderGIF} alt='' />
      </div>
      <div>
        <h1 className='text-xl font-bold'>Loading...</h1>
      </div>
    </div>
  )
}

export default DefaultLoader
