import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ChartContainer = ({ chartData, loading, chartTitle }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartTitle || '',
      },
    },
  }

  return (
    <div className='flex w-full h-full items-center bg-white rounded-lg p-5 border-t-4 shadow-lg border-green-500'>
      {loading === false && <Line options={options} data={chartData} />}
    </div>
  )
}

export default ChartContainer
