import React, { useMemo, useState } from 'react'
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from 'react-table'

function Table({ columns, data }) {
  const memoizedColumns = useMemo(() => columns, [columns])
  const [pageSize, setPageSize] = useState(5)

  const tableInstance = useTable(
    {
      columns: memoizedColumns,
      data,
      initialState: { pageIndex: 0, pageSize },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { pageIndex, globalFilter },
    prepareRow,
    setGlobalFilter,
  } = tableInstance

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex justify-between items-center mb-4 px-4 py-3 bg-white sm:px-6'>
        <div className='flex justify-start items-center'>
          <span className='mr-3'>Search:</span>
          <input
            type='text'
            className='px-2 py-1 border border-gray-300 rounded-lg focus:outline-none'
            value={globalFilter || ''}
            onChange={(e) => {
              setGlobalFilter(e.target.value)
            }}
          />
        </div>
        <div className='flex justify-end'>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 focus:outline-none'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              tableInstance.setPageSize(Number(e.target.value))
            }}>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize} items
              </option>
            ))}
          </select>
        </div>
      </div>
      <table
        {...getTableProps()}
        className='w-full text-sm text-left text-gray-500 text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 text-gray-400'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  scope='col'
                  className='px-6 py-3'
                  {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' ▼' : ' ▲') : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row)
            return (
              <tr
                {...row.getRowProps()}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } border-b`}>
                {row.cells.map((cell) => (
                  <td
                    className='px-6 py-4 whitespace-nowrap font-medium text-gray-900'
                    key={index}
                    {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className='flex justify-between items-center px-4 py-3 bg-white0 sm:px-6'>
        <div className='flex justify-between items-center'>
          <span className='mr-3'>
            Page <strong>{pageIndex + 1}</strong> of{' '}
            <strong>{pageOptions.length}</strong>
          </span>
          <span className='mx-3'>|</span>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 focus:outline-none'
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              tableInstance.setPageSize(Number(e.target.value))
            }}>
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize} items
              </option>
            ))}
          </select>
        </div>
        <div className='flex justify-between items-center'>
          <button
            className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50'
            onClick={() => previousPage()}
            disabled={!canPreviousPage}>
            Previous
          </button>
          <button
            className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50'
            onClick={() => nextPage()}
            disabled={!canNextPage}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table
