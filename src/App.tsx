import { useEffect, useMemo, useState } from 'react'
import type { LatLngTuple } from 'leaflet'
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import { HeatmapLayer } from "react-leaflet-heatmap-layer-v3";
import axios from "axios";
const position: LatLngTuple = [41.015137, 28.979530]
// const coordinates = [
//   { lat: 41.015137, lng: 28.979530 },
//   { lat: 41.015137, lng: 28.979530 },
//   { lat: 41.015500, lng: 28.980000 },
//   { lat: 41.015500, lng: 28.980000 },
//   { lat: 41.016000, lng: 28.981000 },
//   { lat: 40.974802, lng: 29.2396 },
//   { lat: 40.974802, lng: 29.2396 },
//   {
//     "lat": 38.29638986015043,
//     "lng": 44.23212542732158
//   },
//   {
//     "lat": 38.6373925252846,
//     "lng": 31.026634941149744
//   },
//   {
//     "lat": 37.516427521377594,
//     "lng": 27.179888142166224
//   },
//   {
//     "lat": 39.10442237440131,
//     "lng": 37.922477297094204
//   },
//   {
//     "lat": 37.52340532083302,
//     "lng": 33.19346902700052
//   },
//   {
//     "lat": 36.26316881142384,
//     "lng": 44.28424214456554
//   },
//   {
//     "lat": 39.81231104095889,
//     "lng": 38.83095077363687
//   },
//   {
//     "lat": 36.493444120214036,
//     "lng": 33.373303749076285
//   }, {
//     "lat": 36.71985532083887,
//     "lng": 34.575053051840975
//   },
//   {
//     "lat": 41.02374864837448,
//     "lng": 37.93002395024166
//   },
//   {
//     "lat": 36.261465818141836,
//     "lng": 33.70404385088974
//   },
//   {
//     "lat": 41.452355298094425,
//     "lng": 40.33277985627352
//   },
//   {
//     "lat": 40.73631463629333,
//     "lng": 36.36058144599693
//   },
//   {
//     "lat": 36.35181278123345,
//     "lng": 40.99702675294334
//   }
// ];
const redOptions = { color: 'red' }
const cellSize = 0.001; // 100 metre
export default function App() {
  const [coordinates, setCoordinates] = useState([])

  useEffect(() => {
    setInterval(() => {
      axios.get("http://localhost:8080/locations").then((res) => {
        // const resCoordinates = res.data
        // const grid = new Map();
        // resCoordinates.forEach(({ lat, lng }) => {

        //   const key = `${Math.floor(lat / cellSize)}_${Math.floor(lng / cellSize)}`;
        //   if (!grid.has(key)) grid.set(key, []);
        //   grid.get(key).push({ lat, lng });
        // });

        // const areas = [];
        // for (const [key, points] of grid.entries()) {
        //   if (points.length >= 2) {
        //     const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
        //     const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
        //     areas.push({ lat: avgLat, lng: avgLng, count: points.length });
        //   }
        // }

        setCoordinates(res.data);
      })
    }, 5000)

  }, [])
  return (
    <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
      <TileLayer
        attribution='YAC'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={coordinates}
        longitudeExtractor={m => parseFloat(m.lng)}
        latitudeExtractor={m => parseFloat(m.lat)}
        intensityExtractor={m => 0.05} />
      {/* {highTrafficAreas.map((area, index) => (
        <Circle
          key={index}
          center={[area.lat, area.lng]}
          pathOptions={redOptions}
          radius={250}
        >
          <Popup>Traffic count: {area.count}</Popup>
        </Circle>
      ))} */}
    </MapContainer>
  )
}
