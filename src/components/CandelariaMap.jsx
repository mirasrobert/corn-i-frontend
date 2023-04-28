import { useState, useEffect } from 'react'

import L from 'leaflet'

import {
  MapContainer,
  GeoJSON,
  TileLayer,
  LayersControl,
  Marker,
  Popup,
  LayerGroup,
} from 'react-leaflet'

//import mapData from '../geojson/corn_areas.json'
import barangayData from '../geojson/barangay.json'

import { customIcon } from './MapIcon'

const CandelariaMap = ({ mapData }) => {
  const [map, setMap] = useState(null)

  // Define the state variables using the useState hook
  const [mapConfig, setMapConfig] = useState({
    style: {
      height: '80vh',
      zIndex: '1',
    },
    center: [13.911638, 121.427189],
    zoom: 17,
  })

  const colors = {
    yellow: 'yellow',
    green: '#00ff1a',
  }

  const color_brgy = [
    'red',
    '#3465eb',
    'green',
    '#bd34eb',
    '#eb3499',
    '#3465eb',
    '#3465eb',
    '#c3eb34',
    '#ebc634',
    '#eb7d34',
  ]

  const [fillColor, setFillColor] = useState(colors.yellow)

  const [mapStyle, setMapStyle] = useState({
    color: colors.yellow,
    fillColor: colors.green,
    fillOpacity: 0.3,
    weight: 5,
  })

  const [barangaypStyle, setBarangayStyle] = useState({
    color: 'gray',
    fillColor: 'blue',
    fillOpacity: 0.3,
    weight: 2,
  })

  // Define the function that will be called for each feature in the GeoJSON layer
  const onEachDataMap = (data, layer) => {
    // console.log(data)

    let dataName = data.properties.name

    let rand = Math.random() * 50

    if (!dataName.toLowerCase().includes('farm')) {
      dataName = dataName + ' Farm'
    }

    if (dataName.toLowerCase().includes('unknown')) {
      dataName = 'Corn Farm ' + rand
    }

    layer.bindPopup(dataName)

    //When Layer On Clicked
    layer.on({
      click: changeFeatureColor, // Change to color on click
    })
  }

  const onEachBarangay = (data, layer) => {
    //console.log(data)

    layer.options.fillOpacity = 0.1 //0-1 (0.1, 0.2, 0.3)
    const colorIndex = Math.floor(Math.random() * color_brgy.length)
    layer.options.fillColor = color_brgy[colorIndex] //0
    layer.options.color = color_brgy[colorIndex]
  }

  const changeFeatureColor = (event) => {
    event.target.setStyle({
      color: colors.green,
      fillColor: colors.yellow,
      fillOpacity: 1,
    })
  }

  // Corn Icon
  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, {
      icon: customIcon,
    })
  }

  const onLocationChange = (e) => {
    const location = mapData.features.find(
      (field) => field.properties.name == e.target.value
    )

    const coordinates = location.geometry.coordinates

    console.log(map)

    setMapConfig({
      ...mapConfig,
      center: location,
    })

    if (map) map.flyTo(mapConfig.center)
  }

  return (
    <div className=''>
      <MapContainer
        style={mapConfig.style}
        zoom={mapConfig.zoom}
        scrollWheelZoom={false}
        center={mapConfig.center}
        whenCreated={(map) => setMap(map)}>
        <LayersControl position='topright'>
          <LayersControl.BaseLayer name='OpenStreetMap' checked={true}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay name='Satelite View'>
            <TileLayer
              url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
              maxZoom={21}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Terrain View'>
            <TileLayer
              url='http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
              maxZoom={21}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Street View'>
            <TileLayer
              url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
              maxZoom={21}
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name='Show Barangay' checked={true}>
            <LayerGroup>
              <GeoJSON
                style={barangaypStyle}
                data={barangayData.features}
                pointToLayer={pointToLayer}
                onEachFeature={onEachBarangay}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        <GeoJSON
          style={mapStyle}
          data={mapData.features}
          onEachFeature={onEachDataMap}
          pointToLayer={pointToLayer}
        />
      </MapContainer>
    </div>
  )
}

export default CandelariaMap
