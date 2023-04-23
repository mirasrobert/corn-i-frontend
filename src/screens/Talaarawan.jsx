import React, { useState, useEffect, useMemo } from 'react'
import Table from '../components/Table'
import ProtectedRoute from '../components/ProtectedRoute'

import { useDispatch, useSelector } from 'react-redux'
import {
  fetchSoilTests,
  createSoilTest,
  deleteSoilTest,
} from '../features/soiltestSlice'

import Modal from 'react-modal'
import { toast } from 'react-toastify'
import DefaultLoader from '../components/DefaultLoader'

function Talaarawan() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = () => dispatch(fetchSoilTests())

    fetch()
  }, [])

  const { soiltests, loading } = useSelector((state) => state.soiltest)

  const DATA = useMemo(() => {
    return soiltests
  }, [soiltests])

  const [COLUMNS, setCOLUMNS] = useState([
    {
      Header: '# ID',
      accessor: 'id',
    },
    {
      Header: 'Site of Farm',
      accessor: 'farm_site',
    },
    {
      Header: 'Client Name',
      accessor: 'client_name',
    },
    {
      Header: 'Lab No.',
      accessor: 'lab_no',
    },
    {
      Header: 'Nitrogen',
      accessor: 'N',
    },
    {
      Header: 'Phosphorus',
      accessor: 'P',
    },
    {
      Header: 'Potassium',
      accessor: 'K',
    },
    {
      Header: 'pH',
      accessor: 'pH',
    },
    {
      Header: 'Date',
      accessor: 'date_reported',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <>
          <button onClick={() => confirmDelete(row.original.id)}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 text-red-500'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </button>
        </>
      ),
    },
  ])

  const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      dispatch(deleteSoilTest(id))
    }
  }

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  const [formData, setFormData] = useState({
    farm_site: '',
    client_name: '',
    lab_no: '',
    N: '',
    P: '',
    MC: '',
    pH: '',
    K: '',
    date_reported: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    // parse the "N", "P", "K" input values as integers
    const intValue =
      (name === 'N' || name === 'P' || name === 'K') && value !== ''
        ? parseInt(value)
        : value

    //parse the "pH" abd "MC" input value as a float
    const floatValue =
      name === 'pH' || name === 'MC' ? parseFloat(intValue) : intValue

    setFormData({
      ...formData,
      [name]: floatValue,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Validate required fields
    const requiredFields = [
      'farm_site',
      'client_name',
      'lab_no',
      'N',
      'P',
      'MC',
      'pH',
      'K',
      'date_reported',
    ]
    const missingFields = requiredFields.filter((field) => !formData[field])
    if (missingFields.length > 0) {
      //toast.error(`Missing required fields: ${missingFields.join(', ')}`)
      toast.error('All fields are required.')
      return
    }

    // Validate N, P, K are integers and pH, MC are floats
    const isInt = (value) => /^\d+$/.test(value.toString())
    const isFloat = (value) => /^\d+\.\d+$/.test(value.toString())
    if (!isInt(formData.N) || !isInt(formData.P) || !isInt(formData.K)) {
      toast.error('N, P, and K must be integer values.')
      return
    }

    const regex = /^\d+\.\d{2}$/

    const isFloatWithTwoDecimalPlaces = (value) => regex.test(value.toString())
    if (
      !isFloatWithTwoDecimalPlaces(formData.pH) ||
      !isFloatWithTwoDecimalPlaces(formData.MC)
    ) {
      toast.error('pH and MC must be float values with 2 decimal places.')
      return
    }

    dispatch(createSoilTest(formData))

    closeModal()

    setFormData({
      farm_site: '',
      client_name: '',
      lab_no: '',
      N: '',
      P: '',
      MC: '',
      pH: '',
      K: '',
      date_reported: '',
    })
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full pt-16'>
        <DefaultLoader />
      </div>
    )
  }

  return (
    <>
      <ProtectedRoute>
        <div className='flex justify-between mb-3'>
          <h1 className='text-3xl mb-3'>Talaarawan </h1>
          <button
            className='mb-1.5 block text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'
            onClick={openModal}>
            Add Record
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='modal'
          contentLabel='Modal Form'>
          <form onSubmit={handleSubmit}>
            <h1 className='font-bold text-lg'>Add Soil Test Record</h1>
            <hr />
            <div className='my-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Site Of Farm
              </label>
              <select
                onChange={handleInputChange}
                name='farm_site'
                value={formData.farm_site}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 focus:outline-none'>
                <option value='' disabled>
                  Choose a site / barangay
                </option>
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

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Client Name
              </label>
              <input
                type='text'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='client_name'
                value={formData.client_name}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Lab No.
              </label>
              <input
                type='text'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='lab_no'
                value={formData.lab_no}
                onChange={handleInputChange}
              />
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='mb-3'>
                <label className='mb-2 block text-xs font-semibold'>
                  Nitrogen (N)
                </label>
                <input
                  type='number'
                  placeholder=''
                  className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                  name='N'
                  value={formData.N}
                  onChange={handleInputChange}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 block text-xs font-semibold'>
                  Phosphorus (P)
                </label>
                <input
                  type='number'
                  placeholder=''
                  className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                  name='P'
                  value={formData.P}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='mb-3'>
                <label className='mb-2 block text-xs font-semibold'>
                  Potassium (K)
                </label>
                <input
                  type='number'
                  placeholder=''
                  className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                  name='K'
                  value={formData.K}
                  onChange={handleInputChange}
                />
              </div>

              <div className='mb-3'>
                <label className='mb-2 block text-xs font-semibold'>pH</label>
                <input
                  type='number'
                  placeholder=''
                  step='0.01'
                  className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                  name='pH'
                  value={formData.pH}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                MC (weight of water)
              </label>
              <input
                type='number'
                placeholder=''
                step='0.01'
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='MC'
                value={formData.MC}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Date Reported
              </label>
              <input
                type='date'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='date_reported'
                value={formData.date_reported}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <button
                type='submit'
                className='mb-1.5 block w-full text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'>
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {DATA.length > 0 ? (
          <>
            <Table columns={COLUMNS} data={DATA} />
          </>
        ) : (
          <Table columns={COLUMNS} data={[]} />
        )}
      </ProtectedRoute>
    </>
  )
}

export default Talaarawan
