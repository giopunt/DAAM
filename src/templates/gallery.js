import React from "react"
import loadable from '@loadable/component'
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"

import Footer from "../components/footer"
import Seo from "../components/seo"

import styles from "./gallery.module.css"

import arrowIcon from "../images/left-arrow.svg"


const GalleryMap = loadable(() => import('../components/gallery-map'))

class Gallery extends React.Component {

  render() {
    const node = this.props.data.markdownRemark
  
    const {
      address,
      contacts,
      bio,
      name,
      website,
      latitude,
      longitude
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
            <GalleryMap name={name} address={address} latitude={latitude} longitude={longitude} />
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
