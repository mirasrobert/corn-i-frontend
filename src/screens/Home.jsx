import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchMappings,
  fetchMappingByType,
  selectAllMappings,
  selectCurrentMapping,
  updateMappingByType,
} from '../features/mappingSlice'

import LoaderDefault from '../assets/images/loader_default.gif'
import CoordinatesInput from '../components/CoordinatesInput'

import CandelariaMap from '../components/CandelariaMap'
import ProtectedRoute from '../components/ProtectedRoute'

import Modal from 'react-modal'

import { toast } from 'react-toastify'

const Home = () => {
  const dispatch = useDispatch()
  const allMappings = useSelector(selectAllMappings)
  const currentMapping = useSelector(selectCurrentMapping)

  const { loading } = useSelector((state) => state.mappings)

  useEffect(() => {
    dispatch(fetchMappings())
    dispatch(fetchMappingByType('areas'))
  }, [dispatch])

  const [coordinates, setCoordinates] = useState([])
  const [type, setType] = useState('Polygon')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Coordinates', coordinates)

    if (coordinates.length == 0) {
      toast.error(`You don't have any coordinates filled`)
      return
    }

    if (
      (type == 'Point' && coordinates.length > 2) ||
      (type == 'Point' && coordinates.length < 2)
    ) {
      toast.error('Point can only have 2 coordinates for lat and long')
      return
    }

    let location = []
    let properties = {
      name: name,
      styleUrl: '#m_ylw-pushpin10',
      'icon-scale': 1.1,
      'icon-offset': [20, 2],
      'icon-offset-units': ['pixels', 'pixels'],
      icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
    }

    if (type == 'Point') {
      location = [...coordinates, 0]
    } else {
      // Polygon
      const twoDArray = coordinates.reduce((acc, cur, idx) => {
        if (idx % 2 === 0) {
          acc.push([cur])
        } else {
          acc[acc.length - 1].push(cur)
          acc[acc.length - 1].push(0) // Add a 0 to the end of the subarray
        }
        return acc
      }, [])

      location = [twoDArray]
      properties = {
        name: name,
        styleUrl: '#msn_ylw-pushpin2',
        'fill-opacity': 0,
        fill: '#0000ff',
        'stroke-opacity': 1,
        stroke: '#0000ff',
        'icon-scale': 1.1,
        'icon-offset': [20, 2],
        'icon-offset-units': ['pixels', 'pixels'],
        icon: 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png',
      }
    }

    console.log('Location', location)

    const data = {
      type: 'Feature',
      geometry: {
        type: type,
        coordinates: location,
      },
      properties: properties,
    }

    let areas = [...currentMapping.data.features] // make a copy of the array

    areas.push(data)

    dispatch(
      updateMappingByType({
        type: 'areas',
        data: {
          type: 'FeatureCollection',
          features: areas,
        },
      })
    )

    setCoordinates([])
    setIsOpen(false)
  }

  const handleAddCoordinate = () => {
    if (type == 'Point' && coordinates.length >= 2) {
      return
    }

    setCoordinates([...coordinates, ''])
  }

  const handleRemoveCoordinate = (index) => {
    const newCoordinates = [...coordinates]
    newCoordinates.splice(index, 1)
    setCoordinates(newCoordinates)
  }

  const handleCoordinateChange = (index, value) => {
    const newCoordinates = [...coordinates]
    newCoordinates[index] = value
    setCoordinates(newCoordinates)
  }

  const [isOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(!isOpen)
  }

  if (loading) {
    return (
      <div className='flex flex-col justify-center items-center'>
        <div>
          <img src={LoaderDefault} alt='' />
        </div>
        <div>
          <h1 className='text-xl font-bold'>Loading map... Please wait</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <ProtectedRoute>
        <div className='flex justify-between mb-3'>
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
          <button
            className={`mb-1.5 block text-center text-white ${
              isOpen
                ? 'bg-red-700 hover:bg-red-900'
                : 'bg-green-700 hover:bg-green-900'
            } px-2 py-1.5 rounded-md`}
            onClick={openModal}>
            {isOpen ? (
              <>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </>
            ) : (
              'Add Coordinates'
            )}
          </button>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between'>
              <h1 className='font-bold text-lg'>Add Coordinates in Map</h1>

              <div className='mb-3'>
                <button
                  type='button'
                  className={`bg-blue-500 px-3 py-2 text-white rounded-md`}
                  onClick={handleAddCoordinate}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 4.5v15m7.5-7.5h-15'
                    />
                  </svg>
                </button>
              </div>
            </div>
            <hr />

            <div className='my-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Geometry Type
              </label>
              <select
                onChange={(e) => setType(e.target.value)}
                name='farm_site'
                value={type}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 focus:outline-none'>
                <option value='' disabled>
                  Choose a geometry type
                </option>
                <option value='Point'>Point</option>
                <option value='Polygon'>Polygon / Area</option>
              </select>
            </div>

            <div className='my-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Coordinate Name
              </label>
              <div className='flex items-center'>
                <input
                  type='text'
                  placeholder='Enter coordinate name'
                  className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                  name='name'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </div>
            </div>

            <div className='grid grid-rows-2 grid-flow-col gap-4'>
              {coordinates.map((coordinate, index) => (
                <div key={index} className='mb-3'>
                  <label className='mb-2 block text-xs font-semibold'>
                    Coordinate {index + 1}
                  </label>
                  <div className='flex items-center'>
                    <input
                      type='text'
                      placeholder='Enter latlng'
                      className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                      name='coordinates'
                      value={coordinate}
                      onChange={(event) =>
                        handleCoordinateChange(index, event.target.value)
                      }
                    />
                    <button
                      type='button'
                      className='bg-red-500 px-3 py-2 text-white rounded-md'
                      onClick={() => handleRemoveCoordinate(index)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className='mb-3'>
              <button
                type='submit'
                className='mb-1.5 block w-full text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'>
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className='map-size mt-6'>
          <div className='w-full h-full'>
            {currentMapping && <CandelariaMap mapData={currentMapping.data} />}
          </div>
        </div>
      </ProtectedRoute>
    </>
  )
}

export default Home
