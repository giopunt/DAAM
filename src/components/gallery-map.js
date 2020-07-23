import React from "react"
import leaflet from 'leaflet'

import styles from "../templates/gallery.module.css"

const defaultCenter = [
  45.4642,
  9.1900
]

class GalleryMap extends React.Component {

  componentDidMount(){
    const {
      name,
      address,
      latitude,
      longitude
    } = this.props
  
    const hasCoords = latitude && longitude
    const position = hasCoords ? [Number(latitude), Number(longitude)] : defaultCenter
    const zoomLevel = hasCoords ? 17 : 13

    const map = leaflet.map('gallery-map').setView(position, zoomLevel)

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerIcon = leaflet.icon({
        iconUrl: 'marker-icon.png',
        iconSize: [25, 25],
        popupAnchor: [-0, -10]
    })

    setTimeout(()=>{
      leaflet.marker(position, {icon: markerIcon})
        .addTo(map)
        .bindPopup(`${name}\n\n${address}`, { 'maxWidth': '250', 'className' : 'custom-popup' })
        .openPopup()
    }, 700)
  }

  render() {
    return (<div id="gallery-map" className={styles.map}></div>)
  }
}

export default GalleryMap
