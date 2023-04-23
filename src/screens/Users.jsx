import React, { useState, useEffect, useMemo } from 'react'
import Table from '../components/Table'
import ProtectedRoute from '../components/ProtectedRoute'

import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, addUser, deleteUser } from '../features/accountSlice'

import Modal from 'react-modal'
import { toast } from 'react-toastify'
import DefaultLoader from '../components/DefaultLoader'

function Talaarawan() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetch = () => dispatch(getAllUsers())

    fetch()
  }, [])

  const { users, isUsersLoading, error } = useSelector(
    (state) => state.accounts
  )

  const DATA = useMemo(() => {
    return users
  }, [users])

  const [COLUMNS, setCOLUMNS] = useState([
    {
      Header: '# ID',
      accessor: 'id',
    },
    {
      Header: 'Full Name',
      accessor: 'full_name',
    },
    {
      Header: 'Email address',
      accessor: 'email',
    },
    {
      Header: 'Created At',
      accessor: 'created_at',
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
      dispatch(deleteUser(id))
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
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    // Validate required fields
    const requiredFields = [
      'full_name',
      'email',
      'password',
      'confirm_password',
    ]

    const missingFields = requiredFields.filter((field) => !formData[field])
    if (missingFields.length > 0) {
      toast.error('All fields are required.')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long')
      return
    }

    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords does not match')
      return
    }

    // Success validation
    dispatch(addUser(formData))

    closeModal()

    setFormData({
      full_name: '',
      email: '',
      password: '',
      confirm_password: '',
    })
  }

  if (isUsersLoading) {
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
          <h1 className='text-3xl mb-3'>Accounts </h1>
          <button
            className='mb-1.5 block text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'
            onClick={openModal}>
            Add User
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='modal'
          contentLabel='Modal Form'>
          <form onSubmit={handleSubmit}>
            <h1 className='font-bold text-lg'>Add a new account</h1>
            <hr />

            <div className='my-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Full Name
              </label>
              <input
                type='text'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='full_name'
                value={formData.full_name}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Email Address
              </label>
              <input
                type='email'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Password
              </label>
              <input
                type='password'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='password'
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Confirm Password
              </label>
              <input
                type='password'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                name='confirm_password'
                value={formData.confirm_password}
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
