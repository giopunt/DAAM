import React from "react"
import { graphql, StaticQuery } from 'gatsby'

import Seo from "../components/seo"
import Newsletter from "../components/newsletter"
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
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        allMarkdownRemark(
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
              backgroundImage: `url(${imageData.src}), linear-gradient(#3adaee, #3adaee), linear-gradient(90deg, #3adaee, #3adaee)`
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
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>Eventi</h2>
              </div>
            </div>

            <div className={styles.mainTextMedium}>
              Dal 1 settembre sarà disponibile online la lista completa degli eventi, torna a trovarci!
              <br/><br/>
              Nel frattempo esplora le gallerie partecipanti e visto che ci sei iscriviti alla newsletter per rimanere sempre aggiornato
            </div>
            <Newsletter/>
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
            <GalleriesMap data={data.allMarkdownRemark} />
          </main>
        </section>
        <Footer />
      </div>)
    }}
  />
)

export default Home
