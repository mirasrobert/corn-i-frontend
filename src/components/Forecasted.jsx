import ic_nitrogen from '../assets/images/ic_nitrogen.png'
import ic_potassium from '../assets/images/ic_potassium.png'
import ic_phosphorus from '../assets/images/ic_phosphorus.png'

const Forecasted = ({ predictions }) => {
  // Hardcoded forecasted values for next month
  const nitrogenLevel = Number(predictions.nitrogen).toFixed(2)
  const potassiumLevel = Number(predictions.potassium).toFixed(2)
  const phosphorusLevel = Number(predictions.phosphorus).toFixed(2)
  const phLevel = Number(predictions.pH).toFixed(2)

  return (
    <>
      <div className='grid grid-cols-2 gap-4 bg-gray-100 p-5 mb-6'>
        <div className='flex items-center bg-white rounded-lg shadow-lg p-5 border-t-4 border-green-500'>
          <img
            src={ic_nitrogen}
            width={64}
            height={64}
            alt=''
            className='mr-2'
          />
          <div>
            <p className='text-gray-600'>
              Soil Nutrient's Nitrogen Level Forecast
            </p>
            <p className='font-bold text-lg'>{nitrogenLevel}</p>
          </div>
        </div>
        <div className='flex items-center bg-white rounded-lg shadow-lg p-5 border-t-4 border-yellow-500'>
          <img
            src={ic_potassium}
            width={64}
            height={64}
            alt=''
            className='mr-2'
          />

          <div>
            <p className='text-gray-600'>
              Soil Nutrient's Potassium Level Forecast
            </p>
            <p className='font-bold text-lg'>{potassiumLevel}</p>
          </div>
        </div>
        <div className='flex items-center bg-white rounded-lg shadow-lg p-5 border-t-4 border-orange-500'>
          <img
            src={ic_phosphorus}
            width={64}
            height={64}
            alt=''
            className='mr-2'
          />

          <div>
            <p className='text-gray-600'>
              Soil Nutrient's Phosphorus Level Forecast
            </p>
            <p className='font-bold text-lg'>{phosphorusLevel}</p>
          </div>
        </div>
        <div className='flex items-center bg-white rounded-lg shadow-lg p-5 border-t-4 border-pink-500'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-16 w-16 mr-2 text-red-500'
            viewBox='0 0 20 20'
            fill='currentColor'>
            <path d='M10 2a5.5 5.5 0 0 0-5.5 5.5c0 2.914 2.205 5.305 5 5.472v3.028H7a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-1v-3.028c2.795-.167 5-2.558 5-5.472A5.5 5.5 0 0 0 10 2zm0 9a3 3 0 1 1 3-3 3 3 0 0 1-3 3z' />
          </svg>
          <div>
            <p className='text-gray-600'>Soil Nutrient's pH Level Forecast</p>
            <p className='font-bold text-lg'>{phLevel}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Forecasted
