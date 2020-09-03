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
      slider5,
      pressRelease1
    } = node.frontmatter

    const events = this.props.data.events && this.props.data.events.edges.filter(event => event.node.frontmatter.gallery.indexOf(name) !== -1)
    const day1 = events.filter(event => event.node.frontmatter.date.indexOf("2020-10-01") !== -1)
    const day2 = events.filter(event => event.node.frontmatter.date.indexOf("2020-10-02") !== -1)
    const day3 = events.filter(event => event.node.frontmatter.date.indexOf("2020-10-03") !== -1)
    const day4 = events.filter(event => event.node.frontmatter.date.indexOf("2020-10-04") !== -1)

    const slides = [
      slider,
      slider2,
      slider3,
      slider4,
      slider5
    ]

    const documents = [
      pressRelease1
    ]
  
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

            {program && <section className={styles.section}>
              <ReactMarkdown className={styles.programma} source={program} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}

            {
              slider && <div id="gallery-slider">
              <Carousel dynamicHeight={true} showThumbs={false}>
                  {slides.filter(slide => slide !== null).map(slide => slide && <img src={slide} alt="" className={styles.slide} key={slide} />)}
                </Carousel>
              </div>
            }

            {events.length > 0 && <div className={styles.events}>
              <h3 className={styles.subtitle}>Eventi al DAAM</h3> 
              {day1.length > 0 && <div>
                <div className={styles.date}>1 ottobre</div>
                {day1.map(event => <div className={styles.eventName} key={event.node.id}>{event.node.frontmatter.title}</div>)}
                {day1.map(event => <div className={styles.eventName} key={event.node.id}>{event.node.frontmatter.title}</div>)}
              </div>}
              {day2.length > 0 && <div>
                <div className={styles.date}>2 ottobre</div>
                {day2.map(event => <div className={styles.eventName} key={event.node.id}>{event.node.frontmatter.title}</div>)}
              </div>}
              {day3.length > 0 && <div>
                <div className={styles.date}>3 ottobre</div>
                {day3.map(event => <div className={styles.eventName} key={event.node.id}>{event.node.frontmatter.title}</div>)}
              </div>}
              {day4.length > 0 && <div>
                <div className={styles.date}>4 ottobre</div>
                {day4.map(event => <div className={styles.eventName} key={event.node.id}>{event.node.frontmatter.title}</div>)}
              </div>}
            </div>}

            {pressRelease1 && <div className={styles.allegati}>
              <h3 className={styles.subtitle}>Allegati</h3>
                {documents.filter(doc => doc !== null).map(doc => <p key={doc} className={styles.doc}><a target="_blank" rel="noreferrer" href={doc}>{doc.replace('/assets/', '')}</a></p>)}
            </div>}

            {address && <section className={styles.section}>
              <h3 className={styles.subtitle}>Indirizzo</h3>
              <ReactMarkdown source={address} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}
  
            {contacts && <section className={styles.section}>
              <h3 className={styles.subtitle}>Contatti</h3>
              <ReactMarkdown source={contacts} escapeHtml={false} parserOptions={{ commonmark: true }} />
            </section>}

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
        pressRelease1
      }
    }
    events: allMarkdownRemark(
      filter: { 
        fileAbsolutePath: { regex: "/(events)/" }
        frontmatter: { Draft: { eq: false } } 
      }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            description
            gallery
            date
          }
        }
      }
    }
  }
`
