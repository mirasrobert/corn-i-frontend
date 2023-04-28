import { useState } from 'react'

const CoordinatesInput = ({ onSubmit }) => {
  const [coordinate, setCoordinate] = useState('')

  const handleInputChange = (event) => {
    setCoordinate(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(coordinate)
    setCoordinate('')
  }

  return (
    <div>
      <h2 className='font-bold text-lg mb-2'>Coordinates</h2>
      <div className='flex space-x-2'>
        <input
          type='text'
          placeholder='Enter coordinates'
          className='flex-1 border rounded-md py-1 px-2'
          value={coordinate}
          onChange={handleInputChange}
        />
        <button
          type='button'
          className='bg-green-700 text-white rounded-md py-1 px-2'
          onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}

export default CoordinatesInput
