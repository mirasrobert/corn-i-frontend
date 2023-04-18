import React, { useState, useEffect, useMemo } from 'react'
import Table from '../components/Table'
import ProtectedRoute from '../components/ProtectedRoute'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSoilTests } from '../features/soiltestSlice'

import Modal from 'react-modal'

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
      Header: 'Date',
      accessor: 'date_reported',
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button onClick={() => alert(row.original.id)}>Edit</button>
      ),
    },
  ])

  const [modalIsOpen, setIsOpen] = React.useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

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

  return (
    <>
      <ProtectedRoute>
        <div className='flex justify-between mb-3'>
          <h1 className='text-3xl mb-3'>Talaarawan </h1>
          <button
            className='mb-1.5 block text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'
            onClick={openModal}>
            Open Modal
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className='modal'
          contentLabel='Modal Form'>
          <form>
            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Site Of Farm
              </label>
              <input
                type='text'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                required
              />
            </div>

            <div className='mb-3'>
              <label className='mb-2 block text-xs font-semibold'>
                Client Name
              </label>
              <input
                type='text'
                placeholder=''
                className='block w-full rounded-md border border-gray-300 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 py-1 px-1.5 text-gray-500'
                required
              />
            </div>

            <div className='mb-3'>
              <button
                type='submit'
                className='mb-1.5 block w-full text-center text-white bg-green-700 hover:bg-green-900 px-2 py-1.5 rounded-md'>
                Sign in
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
