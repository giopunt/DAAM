import React from "react"

import Seo from "../components/seo"
import Galleries from "../components/galleries"
import Footer from "../components/footer"

import styles from "./index.module.css"

const Gallerie = () => (
  <div>
    <Seo title="Gallerie Aderenti | DAAM (dovevo andare al MIA)"/>
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
    <Footer />
  </div>
)

export default Gallerie
