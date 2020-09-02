import React from "react"
import loadable from '@loadable/component'
import { Link, graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import { Carousel } from "react-responsive-carousel"

import Footer from "../components/footer"
import Seo from "../components/seo"

import styles from "./gallery.module.css"

import arrowIcon from "../images/left-arrow.svg"


const GalleryMap = loadable(() => import('../components/gallery-map'))

class Gallery extends React.Component {
  state = {
    expandBio: false
  }

  expandBio = () => {
    this.setState({
      expandBio: !this.state.expandBio
    })
  }

  render() {
    const node = this.props.data.markdownRemark
  
    const {
      address,
      program,
      contacts,
      bio,
      name,
      website,
      latitude,
      longitude,
      logo,
      slider,
      slider2,
      slider3,
      slider4,
      slider5
    } = node.frontmatter
  
    return (
      <div>
        <Seo title={name + " | DAAM (dovevo andare al MIA)"} />
        <div className={styles.layout}>
          <main className={styles.main}>
            <Link className={styles.backHomeLink} to="/">
              <img className={styles.arrowIcon} src={arrowIcon} alt="" />
            </Link>
            <h1 className={styles.name}>{name}</h1>

            {logo && <img src={logo} alt="Logo galleria" className={styles.logo} />}
            
            {website && <section className={styles.section}>
              <a href={website} className={styles.websiteLink} target="_blank" rel="noreferrer">{website}</a>
            </section>}
  
            {address && <section className={styles.section}>
              <h3 className={styles.subtitle}>Indirizzo</h3>
              <ReactMarkdown source={address} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}
  
            {contacts && <section className={styles.section}>
              <h3 className={styles.subtitle}>Contatti</h3>
              <ReactMarkdown source={contacts} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}

            {program && <section className={styles.section}>
              <ReactMarkdown className={styles.programma} source={program} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}

            <div id="gallery-slider">
              <Carousel dynamicHeight={true} showThumbs={false}>
                {slider && <img src={slider} alt="" className={styles.slide} />}
                {slider2 && <img src={slider2} alt="" className={styles.slide} />}
                {slider3 && <img src={slider3} alt="" className={styles.slide} />}
                {slider4 && <img src={slider4} alt="" className={styles.slide} />}
                {slider5 && <img src={slider5} alt="" className={styles.slide} />}
              </Carousel>
            </div>
  
            {bio && <section className={`${styles.section} ${styles.bio} ${this.state.expandBio ? styles.expand : styles.collapse}`}>
              <button onClick={this.expandBio} className={styles.bioBtn}>
                Bio 
                {this.state.expandBio ? <div className={styles.minus} >–</div> : <div className={styles.plus}>+</div>}
              </button>
              <div className={styles.bioText}>
                <ReactMarkdown source={bio} escapeHtml={true} parserOptions={{ commonmark: true }} />
              </div>
            </section>}
          </main>
          
          <section className={styles.section}>
            <h3 className={`${styles.subtitle} ${styles.withPaddings}`}>Location</h3>
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
        logo
        program
        slider
        slider2
        slider3
        slider4
        slider5
      }
    }
  }
`
