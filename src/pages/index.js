import React from "react"
import { graphql, StaticQuery } from 'gatsby'

import Seo from "../components/seo"
import Newsletter from "../components/newsletter"
import Galleries from "../components/galleries"

import logo from "./logo.svg"
import styles from "./index.module.css"

const Home = () => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "slide-1.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      const imageData = data.desktop.childImageSharp.fluid
      
      return (<div>
        <Seo/>
        <section
          className={[styles.coverbg, styles.section].join(" ")}
          style={
            {
              backgroundImage: `url(${imageData.src}), linear-gradient(#7fddf9, #a9e9fd), linear-gradient(90deg, #8de1fb, #8de2fc, #7fddf9)`
            }
          }
        >
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <img className={styles.logo} src={logo} alt="Dovevo andare al mia"/>
                <div className={styles.logoSub}>(dovevo andare al mia)</div>
              </div>

              <div className={styles.date}>
                <div>1-4</div>
                <div className={styles.subDate}>ottobre</div>
              </div>
            </div>

            <div className={styles.mainTextBig}>Fuorieventi milanesi della fiera che non c'è*</div>
          </main>
        </section>
        <section className={[styles.blueBg, styles.section].join(" ")}>
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>il DAAM?</h2>
              </div>
            </div>

            <div className={styles.mainTextMedium}>* Mentre aspettiamo che il MIA riparta <u>(la decima edizione si terrà dal 25 - 28 marzo)</u>, arriva il DAAM! Un’ iniziativa per colmare il vuoto di questo 2020 atipico, un hub per promuovere la fotografia d’autore.<br/><br/> Quattro giorni ricchi di eventi e progetti fotografici di grandi maestri organizzati dalle più prestigiose gallerie fotografiche milanesi.</div>
            </main>
        </section>
        <section className={[styles.section, styles.greenBg].join(' ')}>
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>Eventi</h2>
              </div>
            </div>

            <div className={styles.mainTextMedium}>
              dal 1 settembre sarà disponibile online la lista completa degli eventi, torna a trovarci!
              <br/><br/>
              nel frattempo esplora le gallerie partecipanti e visto che ci sei iscriviti alla newsletter per rimanere sempre aggiornato
            </div>
            <Newsletter/>
          </main>
        </section>
        <section className={[styles.section, styles.pinkBg].join(' ')}>
          <main className={styles.content}>
            <div className={styles.head}>
              <div>
                <h2 className={styles.subtitle}>Gallerie</h2>
              </div>
            </div>

            <Galleries />
          </main>
        </section>
      </div>)
    }}
  />
)

export default Home
