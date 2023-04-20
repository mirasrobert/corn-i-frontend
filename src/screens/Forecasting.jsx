import { useState, useEffect, useMemo } from 'react'

import ProtectedRoute from '../components/ProtectedRoute'

import { useDispatch, useSelector } from 'react-redux'
import { generatePrediction } from '../features/predictionSlice'

import Loader from '../assets/images/loader_gear.gif'
import LoaderDefault from '../assets/images/loader_default.gif'
import ic_soil from '../assets/images/ic_soil.png'
import ic_fertilizer from '../assets/images/ic_fertilizer.png'
import Forecasted from '../components/Forecasted'
import Table from '../components/Table'

const Forecasting = () => {
  const forecasting = useSelector((state) => state.forecasting)

  const [farmSite, setFarmSite] = useState('Bukal Sur')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(generatePrediction(farmSite))
  }, [farmSite])

  const handleInputChange = (e) => {
    setFarmSite(e.target.value)
    dispatch(generatePrediction(e.target.value))
  }

  const COLUMNS = [
    {
      Header: 'Nutrient',
      accessor: 'nutrient',
    },
    {
      Header: 'Low',
      accessor: 'low',
    },
    {
      Header: 'Medium',
      accessor: 'medium',
    },
    {
      Header: 'High',
      accessor: 'high',
    },
  ]

  const DATA = useMemo(() => {
    return [
      {
        nutrient: 'Nitrogen',
        low: '60-90',
        medium: '30-60',
        high: '0-30',
      },
      {
        nutrient: 'Phosphorus',
        low: '25-30',
        medium: '25-25',
        high: '0-20',
      },
      {
        nutrient: 'Potassium',
        low: '60-100',
        medium: '30-60',
        high: '0-30',
      },
    ]
  }, [])

  return (
    <>
      <ProtectedRoute>
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <h1 className='text-3xl'>Forecasting for {farmSite}</h1>
            <img src={ic_soil} width={50} height={50} alt='' />
          </div>

          <div className='mt-2'>
            <label className='mb-2 block text-md font-semibold'>
              Site Of Farm
            </label>
            <select
              onChange={handleInputChange}
              name='farm_site'
              value={farmSite}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 focus:outline-none'>
              <option value='Bukal Sur'>Bukal Sur</option>
              <option value='Malabanan Norte'>Malabanan Norte</option>
              <option value='Malabanan Sur'>Malabanan Sur</option>
              <option value='Mangilag Norte'>Mangilag Norte</option>
              <option value='Mangilag Sur'>Mangilag Sur</option>
              <option value='Masalukot I'>Masalukot I</option>
              <option value='Masalukot II'>Masalukot II</option>
              <option value='Mayabobo'>Mayabobo</option>
              <option value='Pahinga Norte'>Pahinga Norte</option>
              <option value='San Andres'>San Andres</option>
              <option value='Sta. Catalina Norte'>Sta. Catalina Norte</option>
            </select>
          </div>
        </div>

        {/* Forecasting */}

        {forecasting.error ? (
          <div className='flex flex-col justify-center items-center'>
            <div>
              <div className='text-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-34 h-34'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z'
                  />
                </svg>
              </div>
              <div>
                <h1 className='text-center text-xl font-bold'>
                  No Data to Display
                </h1>
                <small className='text-center'>
                  Please make a different filter selection
                </small>
              </div>
            </div>
          </div>
        ) : forecasting.loading || !forecasting.predictions ? (
          <div className='flex flex-col justify-center items-center'>
            <div>
              <img src={LoaderDefault} alt='' />
            </div>
            <div>
              <h1 className='text-xl font-bold'>
                Loading prediction... Please wait
              </h1>
            </div>
          </div>
        ) : (
          <Forecasted predictions={forecasting.predictions} />
        )}

        {/* End Forecasting */}

        <div className='flex items-center mb-6 space-x-3 my-3'>
          <h1 className='text-3xl'>Corn Fertilzer Reommendation Table</h1>
          <small>(kg per heactare)</small>
          <img src={ic_fertilizer} width={50} height={50} alt='' />
        </div>

        <Table data={DATA} columns={COLUMNS} />
      </ProtectedRoute>
    </>
  )
}

export default Forecasting
