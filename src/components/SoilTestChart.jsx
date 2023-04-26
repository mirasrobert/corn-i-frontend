import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSomeSoilTests } from '../features/soiltestSlice'

import ChartContainer from './ChartContainer'

const SoilTestChart = ({ farmSite }) => {
  const dispatch = useDispatch()
  const soil = useSelector((state) => state.soiltest)

  useEffect(() => {
    dispatch(fetchSomeSoilTests(farmSite))
  }, [])

  const labels = soil.soiltests.map((obj) => obj.date_reported)

  const nitrogenData = {
    labels,
    datasets: [
      {
        label: 'NITROGEN',
        data: soil.soiltests.map((obj) => obj.N),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  }

  const phosphorusData = {
    labels,
    datasets: [
      {
        label: 'PHOSPHORUS',
        data: soil.soiltests.map((obj) => obj.P),
        borderColor: 'rgb(255, 159, 64)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  }

  const potassiumData = {
    labels,
    datasets: [
      {
        label: 'POTASSIUM',
        data: soil.soiltests.map((obj) => obj.K),
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.2)',
      },
    ],
  }

  const ph_Data = {
    labels,
    datasets: [
      {
        label: 'pH LEVEL',
        data: soil.soiltests.map((obj) => obj.pH),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  }

  return (
    <>
      <div className='grid grid-cols-2 gap-4 p-5 mb-6'>
        <ChartContainer
          chartData={nitrogenData}
          loading={soil.loading}
          chartTitle={'Nitrogen Level Analysis Chart'}
        />
        <ChartContainer
          chartData={potassiumData}
          loading={soil.loading}
          chartTitle={'Potassium Level Analysis Chart'}
        />
        <ChartContainer
          chartData={phosphorusData}
          loading={soil.loading}
          chartTitle={'Phosphorus Level Analysis Chart'}
        />
        <ChartContainer
          chartData={ph_Data}
          loading={soil.loading}
          chartTitle={'pH Level Analysis Chart'}
        />
      </div>
    </>
  )
}

export default SoilTestChart
