import React from "react"
import { graphql, StaticQuery } from 'gatsby'
import { Carousel } from "react-responsive-carousel"

import Seo from "../components/seo"
import Galleries from "../components/galleries"
import Footer from "../components/footer"

import logo from "./logo.svg"
import styles from "./index.module.css"


import loadable from '@loadable/component'
const GalleriesMap = loadable(() => import('../components/galleries-map'))

const Home = () => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "duomo-removebg.png" }) {
          childImageSharp {
            fluid(quality: 80, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        galleries: allMarkdownRemark(
          filter: { 
            fileAbsolutePath: { regex: "/(galleries)/" }
            frontmatter: { Draft: { eq: false } }
          }
        ) {
          edges {
            node {
              id
              frontmatter {
                name
                path
                address
                latitude
                longitude
              }
            }
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
    `}
    render={data => {
      const imageData = data.desktop.childImageSharp.fluid
      
      return (<div>
        <Seo title="DAAM (dovevo andare al MIA)" />
        <section
          className={`${styles.coverbg} ${styles.section} rellax`}
          style={
            {
              backgroundImage: `url(${imageData.src}), linear-gradient(#94e4fc, #94e4fc), linear-gradient(90deg, #94e4fc, #94e4fc)`
            }
          }
        >
          <main className={styles.content}>
            <div className={styles.head}>
              <div className="">
                <img className={styles.logo} src={logo} alt="Dovevo andare al mia"/>
                <div className={styles.logoSub}>(dovevo andare al MIA)</div>
              </div>

              <div className={styles.date}>
                <div>1-4</div>
                <div className={styles.subDate}>ottobre</div>
              </div>
            </div>

            <div className={styles.mainTextBig}>Fuorievento milanese della fiera che non c'è*</div>
          </main>
        </section>
        <section className={`${styles.blueBg} ${styles.section}`}>
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>il DAAM?</h2>
              </div>
            </div>

            <div className={styles.mainTextMedium}>*Mentre aspettiamo che il MIA riparta (<a href="https://www.miafair.it/">la decima edizione si terrà dal 25 - 28 marzo 2021</a> presso Super Studio Maxi in via Moncucco 30 a Milano), arriva il DAAM! Un’iniziativa per colmare il vuoto di questo 2020 atipico, un hub per promuovere la fotografia d’autore.<br/><br/> Quattro giorni ricchi di eventi e progetti fotografici organizzati dalle più prestigiose gallerie fotografiche milanesi.</div>
          </main>
        </section>
        <section className={`${styles.section} ${styles.greenBg}`}>
          <main className={`${styles.content} ${styles.fullwidth}`}>
            <div className={`${styles.head} ${styles.max}`}>
              <div>
                <h2 className={styles.subtitle}>Eventi</h2>
              </div>
            </div>

            <div id="events-list">
             <Carousel dynamicHeight={true} showThumbs={false}>
                <div key="date1">
                  <h3 className={styles.eventsDate}>1 ottobre</h3>
                  <div className={styles.eventsList}>
                    {
                        data.events.edges.filter(event => event.node.frontmatter.date.indexOf("2020-10-01") !== -1)
                        .map(event => <div key={event.node.id}  className={styles.eventWrapper}>
                          <div className={styles.eventName}>{event.node.frontmatter.title}</div>
                          <div className={styles.eventGalleryName}>Presso<br/><a href={data.galleries.edges.find(gallery => {
                            const galleryname = event.node.frontmatter.gallery.split(' ').join('-').toLowerCase();
                            return gallery.node.frontmatter.path.indexOf(galleryname) !== -1
                          }).node.frontmatter.path}>{event.node.frontmatter.gallery}</a></div>
                        </div>)
                    }
                  </div>
                </div>
                <div key="date2">
                  <h3 className={styles.eventsDate}>2 ottobre</h3>
                  <div className={styles.eventsList}>
                    {
                        data.events.edges.filter(event => event.node.frontmatter.date.indexOf("2020-10-02") !== -1)
                        .map(event => <div key={event.node.id}  className={styles.eventWrapper}>
                          <div className={styles.eventName}>{event.node.frontmatter.title}</div>
                          <div className={styles.eventGalleryName}>Presso<br/><a href={data.galleries.edges.find(gallery => {
                            const galleryname = event.node.frontmatter.gallery.split(' ').join('-').toLowerCase();
                            return gallery.node.frontmatter.path.indexOf(galleryname) !== -1
                          }).node.frontmatter.path}>{event.node.frontmatter.gallery}</a></div>
                        </div>)
                    }
                  </div>
                </div>
                <div key="date3">
                  <h3 className={styles.eventsDate}>3 ottobre</h3>
                  <div className={styles.eventsList}>
                    {
                        data.events.edges.filter(event => event.node.frontmatter.date.indexOf("2020-10-03") !== -1)
                        .map(event => <div key={event.node.id}  className={styles.eventWrapper}>
                          <div className={styles.eventName}>{event.node.frontmatter.title}</div>
                          <div className={styles.eventGalleryName}>Presso<br/><a href={data.galleries.edges.find(gallery => {
                            const galleryname = event.node.frontmatter.gallery.split(' ').join('-').toLowerCase();
                            return gallery.node.frontmatter.path.indexOf(galleryname) !== -1
                          }).node.frontmatter.path}>{event.node.frontmatter.gallery}</a></div>
                        </div>)
                    }
                  </div>
                </div>
                <div key="date4">
                  <h3 className={styles.eventsDate}>4 ottobre</h3>
                  <div className={styles.eventsList}>
                    {
                        data.events.edges.filter(event => event.node.frontmatter.date.indexOf("2020-10-04") !== -1)
                        .map(event => <div key={event.node.id}  className={styles.eventWrapper}>
                          <div className={styles.eventName}>{event.node.frontmatter.title}</div>
                          <div className={styles.eventGalleryName}>Presso<br/><a href={data.galleries.edges.find(gallery => {
                            const galleryname = event.node.frontmatter.gallery.split(' ').join('-').toLowerCase();
                            return gallery.node.frontmatter.path.indexOf(galleryname) !== -1
                          }).node.frontmatter.path}>{event.node.frontmatter.gallery}</a></div>
                        </div>)
                    }
                  </div>
                </div>
             </Carousel>
            </div>
          </main>
        </section>
        <section className={`${styles.section} ${styles.pinkBg}`}>
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>Gallerie</h2>
              </div>
            </div>
            <Galleries />
          </main>
        </section>
        <section className={`${styles.pinkBg}`}>
          <main className={`${styles.content} ${styles.fullwidth}`}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>Locations</h2>
              </div>
            </div>
            <GalleriesMap data={data.galleries} />
          </main>
        </section>
        <Footer />
      </div>)
    }}
  />
)

export default Home
