import React from "react"
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import leaflet from 'leaflet'

import Footer from "../components/footer"
import Seo from "../components/seo"

import styles from "./gallery.module.css"

import arrowIcon from "../images/left-arrow.svg"

const defaultCenter = [
  45.4642,
  9.1900
]

class Gallery extends React.Component {

  state = {
    position: undefined
  }

  componentDidMount(){
    const node = this.props.data.markdownRemark
  
    const {
      name,
      address,
      latitude,
      longitude
    } = node.frontmatter
  
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
    const node = this.props.data.markdownRemark
  
    const {
      address,
      contacts,
      bio,
      name,
      website
    } = node.frontmatter
  
    return (
      <div>
        <Seo />
        <div className={styles.layout}>
          <main className={styles.main}>
            <Link className={styles.backHomeLink} to="/">
              <img className={styles.arrowIcon} src={arrowIcon} alt="" />
            </Link>
            <h1 className={styles.name}>{name}</h1>
  
            {website && <section className={styles.section}>
              <a href={website} className={styles.websiteLink} target="_blank" rel="noreferrer">WEBSITE</a>
            </section>}
  
            {address && <section className={styles.section}>
              <h3 className={styles.subtitle}>Indirizzo</h3>
              <ReactMarkdown source={address} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}
  
            {contacts && <section className={styles.section}>
              <h3 className={styles.subtitle}>Contatti</h3>
              <ReactMarkdown source={contacts} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}
  
            {bio && <section className={styles.section}>
              <h3 className={styles.subtitle}>Bio</h3>
              <ReactMarkdown source={bio} escapeHtml={true} parserOptions={{ commonmark: true }} />
            </section>}
          </main>
          
          <section className={styles.section}>
            <h3 className={[styles.subtitle, styles.withPaddings].join(" ")}>Location</h3>
            <div id="gallery-map" className={styles.map}></div>
          </section>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Gallery

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { path: { eq: $slug } }) {
      frontmatter {
        address
        contacts
        bio
        name
        website
        latitude
        longitude
      }
    }
  }
`
