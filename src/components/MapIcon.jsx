import L from 'leaflet'
import cornIcon from '../assets/images/ic_corn.png'
// Define the custom marker icon

const width = 20
const height = 30

const customIcon = L.icon({
  iconUrl: cornIcon,
  iconSize: new L.Point(width, height), // size of the icon
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  className: 'bg-transparent border-none',
})

export { customIcon }
