import React, { useState, useEffect, useMemo } from 'react'
import Table from '../components/Table'
import ProtectedRoute from '../components/ProtectedRoute'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSoilTests } from '../features/soiltestSlice'

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
        <h1 className='text-3xl mb-3'>Talaarawan </h1>
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
